export const Utils = {
    //文本转换
    Value2Txt: {
        boolV: function (value) {
            var txt = '否';
            if (!!value) {
                txt = "是";
            }
            return txt;
        },
        dateV: function (value) {
            var txt = '';
            if (!!value) {
                var date = new Date(value);
                txt = date.toLocaleString();
            }
            return txt;
        }
    },
    ValueCheck: {
        greateZero: function (value) {
            return !!value && !isNaN(value) && value > 0;
        },
        greateEqualZero: function (value) {
            return !!value && !isNaN(value) && value >= 0;
        }
    },
    Functions: {
        ValidGo: function (func, params) {
            if (!!func && typeof func === 'function') {
                return func(params);
            }
            return null;
        }
    }
}


