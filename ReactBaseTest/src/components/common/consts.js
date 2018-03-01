
export const Consts = {
    Options: {
        YesNo: [
            { value: false, label: '否', disabled: false },
            { value: true, label: '是', disabled: false }
        ]
    },
    Pagination:{
        Default:{
            current: 1,
            pageSize: 10,
            showTotal: function (total) {
                return `Total ${total} items`;
            },
            total: 0,
            onChange: function(){}
        }
    }

}