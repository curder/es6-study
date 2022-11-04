# 变量的解构赋值

解构赋值是对赋值运算符的扩展，它是一种针对数组、对象、字符串、数值和布尔值进行模式匹配，然后对其中的变量进行赋值。

在代码书写上简洁且易读，语义更加清晰明了，也方便了复杂对象中数据字段获取。

## 数组的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

### 基本用法

在此之前变量的赋值只能直接指定值，比如：

```javascript
var a = 1;
let b = 2;
```

ES6 允许写成下面这样：

```javascript
let [a, b] = [1, 2];
```

代码表示可以从数组中提取值，按照对应位置对变量赋值。

另外一些使用嵌套数组进行解构的例子：

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [, , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

let [foo] = [];
let [bar, foo] = [1];

// foo undefined
// bar undefined
```

如果解构不成功，变量的值就等于 `undefined`。

另一种情况是不完全解构，即等号左边的模式只匹配一部分的等号右边的数组。

```javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

如果等号的右边不是数组将会报错：

```javascript
let [a] = 1;
let [a] = false;
let [a] = NaN;
let [a] = undefined;
let [a] = null;
let [a] = {};
```

### 默认值

解构赋值时允许指定默认值。比如：

```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

> **注意：** ES6 内部使用严格相等运算符（`===`）判断一个位置是否有值。所以只有当一个数组成员严格等于`undefined`，默认值才会生效。


默认值可以引用解构赋值的其他变量，**但该变量必须已经声明**。

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

上面最后一个表达式之所以会报错，是因为`x`用`y`做默认值时，`y`还没有声明。

## 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```javascript
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同，数组的元素是按次序排列的，变量的取值由它的位置决定；

而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
let {bar, foo} = {foo: 'aaa', bar: 'bbb'};
foo // "aaa"
bar // "bbb"

let {baz} = {foo: 'aaa', bar: 'bbb'};
baz // undefined
```

例子一：等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。

例子二：变量没有对应的同名属性，导致取不到值，最后等于 `undefined`。

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
// 例一
let {log, sin, cos} = Math;

// 例二
const {log} = console;
log('hello') // hello
```

例一：`Math` 对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。

例二：将 `console.log` 赋值到 `log` 变量。

如果变量名与属性名不一致，必须写成下面这样。

```javascript
let {foo: baz} = {foo: 'aaa', bar: 'bbb'};
baz // "aaa"

let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;
f // 'hello'
l // 'world'
```

也就是说对象的解构赋值的内部机制是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者而不是前者。

上面代码中，`foo` 是匹配的模式，`baz` 才是变量名。

### 默认值

对象的解构也可以指定默认值。

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var {message: msg = 'Something went wrong'} = {};
msg // "Something went wrong"
```

## 集合的解构赋值

集合也可以使用解构赋值。

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
y // "b"
c // "c"
```

## 字符串的解构赋值

字符串也可以解构赋值，因为此时字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个 `length` 属性，因此还可以对这个属性解构赋值。

```javascript
let {length: len} = 'hello';
len // 5
```

## 数值和布尔值

解构赋值时，如果等号右边是数值和布尔值会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有 `toString` 属性，因此变量 `s` 都能取到值。

解构赋值的规则是只要等号右边的值不是对象或数组，就先将其转为对象。

由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值都会报错。

```javascript
let {prop: x} = undefined; // TypeError
let {prop: y} = null; // TypeError
```

## 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```javascript
function add([x, y]) {
    return x + y;
}

add([1, 2]); // 3
```

函数 `add` 的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量 `x` 和 `y`。

对于函数内部的代码来说，它们能感受到的参数就是 `x` 和 `y`。

函数参数的解构也可以使用默认值：

```javascript
function move({x = 0, y = 0} = {}) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

函数 `move` 的参数是一个对象，通过对这个对象进行解构得到变量 `x` 和 `y` 的值，如果解构失败，`x` 和 `y` 等于默认值。

## 解构的常见用途

### 交换变量的值

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

> 上面代码交换变量 `x` 和 `y` 的值，这样的写法不仅简洁，而且易读语义非常清晰。

### 从函数返回多个值

函数只能返回一个值，如果要返回多个值只能将它们放在数组或对象里返回。使用解构赋值，取出这些值就非常方便。

```javascript
// 返回数组
function example() {
    return [1, 2, 3];
}

let [a, b, c] = example();

// 返回对象
function example() {
    return {
        foo: 1,
        bar: 2
    };
}

let {foo, bar} = example();
```

### 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
  // 参数是一组有次序的值
function f([x, y, z]) {
    // ... 
}

f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) {
    // ... 
}

f({z: 3, y: 2, x: 1});
```

### 提取 JSON 数据

解构赋值对提取 JSON 对象中的数据，尤其有用。

```javascript
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let {id, status, data: number} = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

上面代码可以快速提取 JSON 数据的值。

### 函数参数的默认值

```javascript
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {
    },
    cache = true,
    complete = function () {
    },
    crossDomain = false,
    global = true,
// ... more config
} = {}) {
// ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo';` 这样的语句。

### 遍历 Map 结构

Map 解构配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
  // 获取键名
for (let [key] of map) {
    // ...
}

// 获取键值
for (let [, value] of map) {
    // ...
}
```

### 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法，解构赋值使得输入语句非常清晰。

```javascript
const {SourceMapConsumer, SourceNode} = require("source-map");
```
