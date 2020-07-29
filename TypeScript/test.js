"use strict";
function getter(params) {
    return params.name + '的年龄: ' + params.age + '岁';
}
var user = getter({
    name: '李四2',
    age: 18
});
