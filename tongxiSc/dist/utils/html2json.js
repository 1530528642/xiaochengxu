'use strict';

/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*\>\n/, '').replace(/<!DOCTYPE.*\>\n/, '');
}

function html2json(html, bindName) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images: [],
        imageUrls: []
    };
    HTMLParser(html, {
        start: function start(tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag
            };

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        // console.dir(value);
                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        // console.dir(value);
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }

            if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function end(tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function chars(text) {
            //debug(text);
            var node = {
                node: 'text',
                text: text,
                textArray: transEmojiStr(text)
            };

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        comment: function comment(text) {
            //debug(text);
            var node = {
                node: 'comment',
                text: text
            };
            var parent = bufArray[0];
            if (parent.nodes === undefined) {
                parent.nodes = [];
            }
            parent.nodes.push(node);
        }
    });
    return results;
};

function transEmojiStr(str) {
    // var eReg = new RegExp("["+__reg+' '+"]");
    //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

    var emojiObjs = [];
    //如果正则表达式为空
    if (__emojisReg.length == 0 || !__emojis) {
        var emojiObj = {};
        emojiObj.node = "text";
        emojiObj.text = str;
        array = [emojiObj];
        return array;
    }
    //这个地方需要调整
    str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
    var eReg = new RegExp("[:]");
    var array = str.split(eReg);
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var emojiObj = {};
        if (__emojis[ele]) {
            emojiObj.node = "element";
            emojiObj.tag = "emoji";
            emojiObj.text = __emojis[ele];
            emojiObj.baseSrc = __emojisBaseSrc;
        } else {
            emojiObj.node = "text";
            emojiObj.text = ele;
        }
        emojiObjs.push(emojiObj);
    }

    return emojiObjs;
}

function emojisInit() {
    var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
    var emojis = arguments[2];

    __emojisReg = reg;
    __emojisBaseSrc = baseSrc;
    __emojis = emojis;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwyanNvbi5qcyJdLCJuYW1lcyI6WyJfX3BsYWNlSW1nZVVybEh0dHBzIiwiX19lbW9qaXNSZWciLCJfX2Vtb2ppc0Jhc2VTcmMiLCJfX2Vtb2ppcyIsInd4RGlzY29kZSIsInJlcXVpcmUiLCJIVE1MUGFyc2VyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwic3RyIiwib2JqIiwiaXRlbXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJxIiwidiIsInJlbW92ZURPQ1RZUEUiLCJodG1sIiwicmVwbGFjZSIsImh0bWwyanNvbiIsImJpbmROYW1lIiwic3RyRGlzY29kZSIsImJ1ZkFycmF5IiwicmVzdWx0cyIsIm5vZGUiLCJub2RlcyIsImltYWdlcyIsImltYWdlVXJscyIsInN0YXJ0IiwidGFnIiwiYXR0cnMiLCJ1bmFyeSIsInRhZ1R5cGUiLCJhdHRyIiwicmVkdWNlIiwicHJlIiwibmFtZSIsInZhbHVlIiwiY2xhc3NTdHIiLCJzdHlsZVN0ciIsIm1hdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImltZ0luZGV4IiwiaW1nVXJsIiwic3JjIiwidXJsVG9IdHRwVXJsIiwiZnJvbSIsInBhcmVudCIsInVuZGVmaW5lZCIsInVuc2hpZnQiLCJlbmQiLCJzaGlmdCIsImNvbnNvbGUiLCJlcnJvciIsImNoYXJzIiwidGV4dCIsInRleHRBcnJheSIsInRyYW5zRW1vamlTdHIiLCJjb21tZW50IiwiZW1vamlPYmpzIiwiZW1vamlPYmoiLCJhcnJheSIsImVSZWciLCJSZWdFeHAiLCJlbGUiLCJiYXNlU3JjIiwiZW1vamlzSW5pdCIsInJlZyIsImVtb2ppcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBSUEsc0JBQXNCLE9BQTFCO0FBQ0EsSUFBSUMsY0FBYyxFQUFsQjtBQUNBLElBQUlDLGtCQUFrQixFQUF0QjtB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aUI7QUFDZkoscUJBQVN0QyxJQUFULEdBQWdCLFNBQWhCO0FBQ0FzQyxxQkFBU2pDLEdBQVQsR0FBZSxPQUFmO0FBQ0FpQyxxQkFBU0wsSUFBVCxHQUFnQjVELFNBQVNxRSxHQUFULENBQWhCO0FBQ0FKLHFCQUFTSyxPQUFULEdBQWtCdkUsZUFBbEI7QUFDRCxTQUxELE1BS0s7QUFDSGtFLHFCQUFTdEMsSUFBVCxHQUFnQixNQUFoQjtBQUNBc0MscUJBQVNMLElBQVQsR0FBZ0JTLEdBQWhCO0FBQ0Q7QUFDREwsa0JBQVVsQixJQUFWLENBQWVtQixRQUFmO0FBQ0Q7O0FBRUQsV0FBT0QsU0FBUDtBQUNEOztBQUVELFNBQVNPLFVBQVQsR0FBNkQ7QUFBQSxRQUF6Q0MsR0FBeUMsdUVBQXJDLEVBQXFDO0FBQUEsUUFBbENGLE9BQWtDLHVFQUExQixrQkFBMEI7QUFBQSxRQUFQRyxNQUFPOztBQUN6RDNFLGtCQUFjMEUsR0FBZDtBQUNBekUsc0JBQWdCdUUsT0FBaEI7QUFDQXRFLGVBQVN5RSxNQUFUO0FBQ0g7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnJELGVBQVdBLFNBREU7QUFFYmlELGdCQUFXQTtBQUZFLENBQWpCIiwiZmlsZSI6Imh0bWwyanNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogYXV0aG9yOiBEaSAo5b6u5L+h5bCP56iL5bqP5byA5Y+R5bel56iL5biIKVxuICogb3JnYW5pemF0aW9uOiBXZUFwcERldijlvq7kv6HlsI/nqIvluo/lvIDlj5HorrrlnZspKGh0dHA6Ly93ZWFwcGRldi5jb20pXG4gKiAgICAgICAgICAgICAgIOWeguebtOW+ruS/oeWwj+eoi+W6j+W8gOWPkeS6pOa1geekvuWMulxuICogXG4gKiBnaXRodWLlnLDlnYA6IGh0dHBzOi8vZ2l0aHViLmNvbS9pY2luZHkvd3hQYXJzZVxuICogXG4gKiBmb3I6IOW+ruS/oeWwj+eoi+W6j+WvjOaWh+acrOino+aekFxuICogZGV0YWlsIDogaHR0cDovL3dlYXBwZGV2LmNvbS90L3d4cGFyc2UtYWxwaGEwLTEtaHRtbC1tYXJrZG93bi8xODRcbiAqL1xuXG52YXIgX19wbGFjZUltZ2VVcmxIdHRwcyA9IFwiaHR0cHNcIjtcbnZhciBfX2Vtb2ppc1JlZyA9ICcnO1xudmFyIF9fZW1vamlzQmFzZVNyYyA9ICcnO1xudmFyIF9fZW1vamlzID0ge307XG52YXIgd3hEaXNjb2RlID0gcmVxdWlyZSgnLi93eERpc2NvZGUuanMnKTtcbnZhciBIVE1MUGFyc2VyID0gcmVxdWlyZSgnLi9odG1scGFyc2VyLmpzJyk7XG4vLyBFbXB0eSBFbGVtZW50cyAtIEhUTUwgNVxudmFyIGVtcHR5ID0gbWFrZU1hcChcImFyZWEsYmFzZSxiYXNlZm9udCxicixjb2wsZnJhbWUsaHIsaW1nLGlucHV0LGxpbmssbWV0YSxwYXJhbSxlbWJlZCxjb21tYW5kLGtleWdlbixzb3VyY2UsdHJhY2ssd2JyXCIpO1xuLy8gQmxvY2sgRWxlbWVudHMgLSBIVE1MIDVcbnZhciBibG9jayA9IG1ha2VNYXAoXCJicixhLGNvZGUsYWRkcmVzcyxhcnRpY2xlLGFwcGxldCxhc2lkZSxhdWRpbyxibG9ja3F1b3RlLGJ1dHRvbixjYW52YXMsY2VudGVyLGRkLGRlbCxkaXIsZGl2LGRsLGR0LGZpZWxkc2V0LGZpZ2NhcHRpb24sZmlndXJlLGZvb3Rlcixmb3JtLGZyYW1lc2V0LGgxLGgyLGgzLGg0LGg1LGg2LGhlYWRlcixoZ3JvdXAsaHIsaWZyYW1lLGlucyxpc2luZGV4LGxpLG1hcCxtZW51LG5vZnJhbWVzLG5vc2NyaXB0LG9iamVjdCxvbCxvdXRwdXQscCxwcmUsc2VjdGlvbixzY3JpcHQsdGFibGUsdGJvZHksdGQsdGZvb3QsdGgsdGhlYWQsdHIsdWwsdmlkZW9cIik7XG5cbi8vIElubGluZSBFbGVtZW50cyAtIEhUTUwgNVxudmFyIGlubGluZSA9IG1ha2VNYXAoXCJhYmJyLGFjcm9ueW0sYXBwbGV0LGIsYmFzZWZvbnQsYmRvLGJpZyxidXR0b24sY2l0ZSxkZWwsZGZuLGVtLGZvbnQsaSxpZnJhbWUsaW1nLGlucHV0LGlucyxrYmQsbGFiZWwsbWFwLG9iamVjdCxxLHMsc2FtcCxzY3JpcHQsc2VsZWN0LHNtYWxsLHNwYW4sc3RyaWtlLHN0cm9uZyxzdWIsc3VwLHRleHRhcmVhLHR0LHUsdmFyXCIpO1xuXG4vLyBFbGVtZW50cyB0aGF0IHlvdSBjYW4sIGludGVudGlvbmFsbHksIGxlYXZlIG9wZW5cbi8vIChhbmQgd2hpY2ggY2xvc2UgdGhlbXNlbHZlcylcbnZhciBjbG9zZVNlbGYgPSBtYWtlTWFwKFwiY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyXCIpO1xuXG4vLyBBdHRyaWJ1dGVzIHRoYXQgaGF2ZSB0aGVpciB2YWx1ZXMgZmlsbGVkIGluIGRpc2FibGVkPVwiZGlzYWJsZWRcIlxudmFyIGZpbGxBdHRycyA9IG1ha2VNYXAoXCJjaGVja2VkLGNvbXBhY3QsZGVjbGFyZSxkZWZlcixkaXNhYmxlZCxpc21hcCxtdWx0aXBsZSxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3dyYXAscmVhZG9ubHksc2VsZWN0ZWRcIik7XG5cbi8vIFNwZWNpYWwgRWxlbWVudHMgKGNhbiBjb250YWluIGFueXRoaW5nKVxudmFyIHNwZWNpYWwgPSBtYWtlTWFwKFwid3h4eGNvZGUtc3R5bGUsc2NyaXB0LHN0eWxlLHZpZXcsc2Nyb2xsLXZpZXcsYmxvY2tcIik7XG5mdW5jdGlvbiBtYWtlTWFwKHN0cikge1xuICAgIHZhciBvYmogPSB7fSwgaXRlbXMgPSBzdHIuc3BsaXQoXCIsXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspXG4gICAgICAgIG9ialtpdGVtc1tpXV0gPSB0cnVlO1xuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIHEodikge1xuICAgIHJldHVybiAnXCInICsgdiArICdcIic7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZURPQ1RZUEUoaHRtbCkge1xuICAgIHJldHVybiBodG1sXG4gICAgICAgIC5yZXBsYWNlKC88XFw/eG1sLipcXD8+XFxuLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC88IWRvY3R5cGUuKlxcPlxcbi8sICcnKVxuICAgICAgICAucmVwbGFjZSgvPCFET0NUWVBFLipcXD5cXG4vLCAnJyk7XG59XG5cblxuZnVuY3Rpb24gaHRtbDJqc29uKGh0bWwsIGJpbmROYW1lKSB7XG4gICAgLy/lpITnkIblrZfnrKbkuLJcbiAgICBodG1sID0gcmVtb3ZlRE9DVFlQRShodG1sKTtcbiAgICBodG1sID0gd3hEaXNjb2RlLnN0ckRpc2NvZGUoaHRtbCk7XG4gICAgLy/nlJ/miJBub2Rl6IqC54K5XG4gICAgdmFyIGJ1ZkFycmF5ID0gW107XG4gICAgdmFyIHJlc3VsdHMgPSB7XG4gICAgICAgIG5vZGU6IGJpbmROYW1lLFxuICAgICAgICBub2RlczogW10sXG4gICAgICAgIGltYWdlczpbXSxcbiAgICAgICAgaW1hZ2VVcmxzOltdXG4gICAgfTtcbiAgICBIVE1MUGFyc2VyKGh0bWwsIHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCB1bmFyeSkge1xuICAgICAgICAgICAgLy9kZWJ1Zyh0YWcsIGF0dHJzLCB1bmFyeSk7XG4gICAgICAgICAgICAvLyBub2RlIGZvciB0aGlzIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBub2RlID0ge1xuICAgICAgICAgICAgICAgIG5vZGU6ICdlbGVtZW50JyxcbiAgICAgICAgICAgICAgICB0YWc6IHRhZyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChibG9ja1t0YWddKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50YWdUeXBlID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmxpbmVbdGFnXSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsb3NlU2VsZlt0YWddKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50YWdUeXBlID0gXCJjbG9zZVNlbGZcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dHJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0ciA9IGF0dHJzLnJlZHVjZShmdW5jdGlvbiAocHJlLCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgdmFsdWUgPSB2YWx1ZS5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzU3RyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaGFzIG11bHRpIGF0dGlidXRlc1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGl0IGFycmF5IG9mIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgdmFsdWUgPSB2YWx1ZS5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlU3RyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm1hdGNoKC8gLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhdHRyIGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lcmdlIGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZVtuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5IGFycmF5LCBwdXNoIHRvIGxhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVbbmFtZV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSB2YWx1ZSwgbWFrZSBpdCBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXSA9IFtwcmVbbmFtZV0sIHZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdCBleGlzdCwgcHV0IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmU7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+WvuWltZ+a3u+WKoOmineWkluaVsOaNrlxuICAgICAgICAgICAgaWYgKG5vZGUudGFnID09PSAnaW1nJykge1xuICAgICAgICAgICAgICAgIG5vZGUuaW1nSW5kZXggPSByZXN1bHRzLmltYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGltZ1VybCA9IG5vZGUuYXR0ci5zcmM7XG4gICAgICAgICAgICAgICAgaW1nVXJsID0gd3hEaXNjb2RlLnVybFRvSHR0cFVybChpbWdVcmwsIF9fcGxhY2VJbWdlVXJsSHR0cHMpO1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zcmMgPSBpbWdVcmw7XG4gICAgICAgICAgICAgICAgbm9kZS5mcm9tID0gYmluZE5hbWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5pbWFnZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLmltYWdlVXJscy5wdXNoKGltZ1VybCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1bmFyeSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgdGFnIGRvc2VuJ3QgaGF2ZSBlbmQgdGFnXG4gICAgICAgICAgICAgICAgLy8gbGlrZSA8aW1nIHNyYz1cImhvZ2UucG5nXCIvPlxuICAgICAgICAgICAgICAgIC8vIGFkZCB0byBwYXJlbnRzXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdIHx8IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmQXJyYXkudW5zaGlmdChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kOiBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAvL2RlYnVnKHRhZyk7XG4gICAgICAgICAgICAvLyBtZXJnZSBpbnRvIHBhcmVudCB0YWdcbiAgICAgICAgICAgIHZhciBub2RlID0gYnVmQXJyYXkuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyAhPT0gdGFnKSBjb25zb2xlLmVycm9yKCdpbnZhbGlkIHN0YXRlOiBtaXNtYXRjaCBlbmQgdGFnJyk7XG5cbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFyczogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIC8vZGVidWcodGV4dCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBub2RlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICB0ZXh0QXJyYXk6dHJhbnNFbW9qaVN0cih0ZXh0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJ1ZkFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1lbnQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAvL2RlYnVnKHRleHQpO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgbm9kZTogJ2NvbW1lbnQnLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmZ1bmN0aW9uIHRyYW5zRW1vamlTdHIoc3RyKXtcbiAgLy8gdmFyIGVSZWcgPSBuZXcgUmVnRXhwKFwiW1wiK19fcmVnKycgJytcIl1cIik7XG4vLyAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFsoW15cXFtcXF1dKylcXF0vZywnOiQxOicpXG4gIFxuICB2YXIgZW1vamlPYmpzID0gW107XG4gIC8v5aaC5p6c5q2j5YiZ6KGo6L6+5byP5Li656m6XG4gIGlmKF9fZW1vamlzUmVnLmxlbmd0aCA9PSAwIHx8ICFfX2Vtb2ppcyl7XG4gICAgICB2YXIgZW1vamlPYmogPSB7fVxuICAgICAgZW1vamlPYmoubm9kZSA9IFwidGV4dFwiO1xuICAgICAgZW1vamlPYmoudGV4dCA9IHN0cjtcbiAgICAgIGFycmF5ID0gW2Vtb2ppT2JqXTtcbiAgICAgIHJldHVybiBhcnJheTtcbiAgfVxuICAvL+i/meS4quWcsOaWuemcgOimgeiwg+aVtFxuICBzdHIgPSBzdHIucmVwbGFjZSgvXFxbKFteXFxbXFxdXSspXFxdL2csJzokMTonKVxuICB2YXIgZVJlZyA9IG5ldyBSZWdFeHAoXCJbOl1cIik7XG4gIHZhciBhcnJheSA9IHN0ci5zcGxpdChlUmVnKTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgZWxlID0gYXJyYXlbaV07XG4gICAgdmFyIGVtb2ppT2JqID0ge307XG4gICAgaWYoX19lbW9qaXNbZWxlXSl7XG4gICAgICBlbW9qaU9iai5ub2RlID0gXCJlbGVtZW50XCI7XG4gICAgICBlbW9qaU9iai50YWcgPSBcImVtb2ppXCI7XG4gICAgICBlbW9qaU9iai50ZXh0ID0gX19lbW9qaXNbZWxlXTtcbiAgICAgIGVtb2ppT2JqLmJhc2VTcmM9IF9fZW1vamlzQmFzZVNyYztcbiAgICB9ZWxzZXtcbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcInRleHRcIjtcbiAgICAgIGVtb2ppT2JqLnRleHQgPSBlbGU7XG4gICAgfVxuICAgIGVtb2ppT2Jqcy5wdXNoKGVtb2ppT2JqKTtcbiAgfVxuICBcbiAgcmV0dXJuIGVtb2ppT2Jqcztcbn1cblxuZnVuY3Rpb24gZW1vamlzSW5pdChyZWc9JycsYmFzZVNyYz1cIi93eFBhcnNlL2Vtb2ppcy9cIixlbW9qaXMpe1xuICAgIF9fZW1vamlzUmVnID0gcmVnO1xuICAgIF9fZW1vamlzQmFzZVNyYz1iYXNlU3JjO1xuICAgIF9fZW1vamlzPWVtb2ppcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaHRtbDJqc29uOiBodG1sMmpzb24sXG4gICAgZW1vamlzSW5pdDplbW9qaXNJbml0XG59OyJdfQ==