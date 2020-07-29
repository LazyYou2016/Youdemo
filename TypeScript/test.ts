interface Person {
  name: String,
  age: Number
}
 
function getter(params:Person) {
  return params.name + '的年龄: ' + params.age + '岁'
}
 
let user = getter({
  name: '李四2',
  age: 18
});