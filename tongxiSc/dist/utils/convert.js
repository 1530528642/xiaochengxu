"use strict";

module.exports = {
    huansuan: function huansuan(number) {
        number = number / 100;
        var numbers = Math.round(number * 100) / 100;
        return numbers;
    },
    zhaungtai: function zhaungtai(num) {
        var fozi = "";
        switch (num) {
            case 1:
                fozi = "审核中";
                break;
            case 2:
                fozi = "转账中";
                break;
            case 3:
                fozi = "已完成";
                break;
            case 4:
                fozi = "未通过";
                break;
        }
        return fozi;
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImh1YW5zdWFuIiwibnVtYmVyIiwibnVtYmVycyIsIk1hdGgiLCJyb3VuZCIsInpoYXVuZ3RhaSIsIm51bSIsImZvemkiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsY0FBUyxrQkFBU0MsTUFBVCxFQUFnQjtBQUNyQkEsaUJBQVNBLFNBQU8sR0FBaEI7QUFDQSxZQUFJQyxVQUFXQyxLQUFLQyxLQUFMLENBQVdILFNBQVMsR0FBcEIsSUFBMkIsR0FBMUM7QUFDQSxlQUFPQyxPQUFQO0FBQ0gsS0FMWTtBQU1iRyxlQUFVLG1CQUFTQyxHQUFULEVBQWE7QUFDbkIsWUFBSUMsT0FBSyxFQUFUO0FBQ0gsZ0JBQU9ELEdBQVA7QUFDRyxpQkFBSyxDQUFMO0FBQ0NDLHVCQUFLLEtBQUw7QUFDRDtBQUNBLGlCQUFLLENBQUw7QUFDQUEsdUJBQUssS0FBTDtBQUNBO0FBQ0EsaUJBQUssQ0FBTDtBQUNBQSx1QkFBSyxLQUFMO0FBQ0M7QUFDQSxpQkFBSyxDQUFMO0FBQ0FBLHVCQUFLLEtBQUw7QUFDQTtBQVpKO0FBY0EsZUFBT0EsSUFBUDtBQUNBO0FBdkJZLENBQWpCIiwiZmlsZSI6ImNvbnZlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGh1YW5zdWFuOmZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyLzEwMDtcclxuICAgICAgICB2YXIgbnVtYmVycyA9ICBNYXRoLnJvdW5kKG51bWJlciAqIDEwMCkgLyAxMDA7XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcnM7XHJcbiAgICB9LFxyXG4gICAgemhhdW5ndGFpOmZ1bmN0aW9uKG51bSl7XHJcbiAgICAgICAgdmFyIGZvemk9XCJcIlxyXG4gICAgIHN3aXRjaChudW0pe1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgZm96aT1cIuWuoeaguOS4rVwiXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgIGZvemk9XCLovazotKbkuK1cIlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICBmb3ppPVwi5bey5a6M5oiQXCJcclxuICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgZm96aT1cIuacqumAmui/h1wiXHJcbiAgICAgICAgIGJyZWFrO1xyXG4gICAgIH1cclxuICAgICByZXR1cm4gZm96aTtcclxuICAgIH1cclxufSJdfQ==