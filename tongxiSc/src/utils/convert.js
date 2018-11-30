module.exports = {
    huansuan:function(number){
        number = number/100;
        var numbers =  Math.round(number * 100) / 100;
        return numbers;
    },
    zhaungtai:function(num){
        var fozi=""
     switch(num){
        case 1:
         fozi="审核中"
        break;
        case 2:
        fozi="转账中"
        break;
        case 3:
        fozi="已完成"
         break;
         case 4:
         fozi="未通过"
         break;
     }
     return fozi;
    }
}