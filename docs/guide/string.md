# 字符串扩展

## 字符串遍历

ES6 为字符串添加了遍历器接口，使得字符串可以被 `for ... of` 循环遍历。

```javascript
for (let char of 'Curder') {
  console.log(char) // "C" "u" "r" "d" "e" "r" 
}
```

## 模板字符串

传统的 JavaScript 语言，输出模板通常是这样写:

```javascript
var username = 'curder'
var age = 18

description = username + ' is ' + age + ' years old.'

console.log(description)
```

上面这种写法相当繁琐且易出错，在 ES6 引入了模板字符串解决这个问题。

```javascript {4}
let username = 'curder'
let age = 18

let description = `${username} is ${age} years old.`

console.log(description)
```

模板字符串（template string）是增强版的字符串，用反引号（`）标识。

它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

上面代码中的模板字符串，使用反引号表示。

如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```javascript
console.log(`Hello\` World!`)
```

如果使用模板字符串表示多行字符串时，所有的空格和缩进都会被保留在输出之中。

```javascript
console.log(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`)
```

上面代码中，所有模板字符串的空格和换行，都是被保留的，比如 `<ul>` 标签前面会有一个换行。

如果不想要这个换行，可以使用 `trim` 方法消除它。

```javascript
console.log(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim())
```

模板字符串中嵌入变量，需要将变量名写在 `${}` 中。

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算以及引用对象属性。

```javascript
let x = 10;
let y = 5;

`${x} + ${y} = ${x + y}`; // "10 + 5 = 15"

`${x} + ${y * 2} = ${x + y * 2}`; // "10 + 10 = 20"

let obj = {x: x, y: y};
console.log(`${obj.x + obj.y}`); // "15"
```

模板字符串之中还能调用函数。

```javascript
function sayHello() {
  return "Hello";
}

console.log(`${sayHello()} World!`); // Hello World!
```

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如大括号中是一个对象，将默认调用对象的 `toString`
方法；打括号中是一个整型或布尔值，将会转成字符串。

如果模板字符串中的变量没有声明，将报错。

```javascript
console.log(`Hello, ${usename}`); // 由于变量 username 没有声明，会抛出变量未定义的错误
```

由于模板字符串的大括号内部是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。

```javascript
console.log(`Hello ${'World'}`); // "Hello World"
```

模板字符串也支持嵌套模版字符串。

```javascript
const Person = {
  name: "curder",
  date: '2022-11-21',
  todos: [
    {name: "Go to shop", completed: true},
    {name: "Study Javascript", complated: false},
    {name: "Running", complated: false}
  ]
}

const customTemplate = `
  <table>
  ${Person.todos.map(todo => `
    <tr><td>${todo.name}</td></tr>
    <tr><td>${todo.completed}</td></tr>
  `).join('')}
  </table>
`;

console.log(customTemplate);
```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```javascript
let func = (name) => `Hello ${name}!`;
func('Curder') // "Hello Curder!"
```

在上面代码中，模板字符串写成了一个函数的返回值。

执行这个函数，就相当于执行这个模板字符串了。

## 标签模版

模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串，这被称为“标签模板”功能（tagged template）。

```javascript
alert`hello` // 等同于 alert(['hello'])
```

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```javascript
const Username = 'Curder';
const Topic = 'Learn how to use es6 sting method.';

function highlight(strings, ...arguments) {
  // 高亮变量值
  const highlighted = arguments.map(argument => `<span class="hightlight">${argument}</span>`)

  return strings.reduce((accumulator, current_value, current_index) => `${accumulator}${current_value}${highlighted[current_index] || ''}`, '')
}

console.log(
  highlight`${Username} has commented on your topic ${Topic}`
);
```

