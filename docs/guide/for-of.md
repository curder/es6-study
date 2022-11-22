# for...of 循环

ES6给提供了对数组、对象等数据解构的新的遍历方式。

`for...of` 循环可以使用的范围包括 `Array`、`Set` 和 `Map` 结构、某些类似数组的对象（比如arguments对象、DOM NodeList
对象）、`Generator` 对象，以及字符串 `String`。

## 数组

```javascript
const colors = ['red', 'green', 'blue'];

// 使用 for 循环遍历数组，写法较繁琐
for (let i = 0, len = colors.length; i <= len; i++) {
  console.log(colors[i])
}

// 使用 forEach 循环遍历数组，无法通过判断条件终止循环
colors.forEach(color => console.log(color))

// 使用 for...in 循环，遍历的是遍历的可枚举属性
colors.description = 'Color'
for (let index in colors) {
  console.log(colors[index])
}

// 使用 for...of 循环，不会返回数组的 description 属性
for (let color of colors) {
  console.log(color)
}

// 使用 for...of 同时获取获取索引和值的循环
for (let [index, color] of colors.entries()) {
  console.log(index, color);
}
```

`for...in` 循环有几个缺点：

- 数组的键名是数字，但是 `for...in` 循环是以字符串作为键名`0`、`1`、`2`等等。
- `for...in` 循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in` 循环会以任意顺序遍历键名。

总之，`for...in` 循环主要是为遍历对象而设计的，不适用于遍历数组。

`for...of` 循环相比上面几种做法，有一些显著的优点：

- 有着同 `for...in` 一样的简洁语法，但是没有 `for...in` 那些缺点。
- 不同于 `forEach` 方法，它可以与 `break`、`continue` 和 `return` 配合使用。
- 提供了遍历所有数据结构的统一操作接口。

## Set、Map 结构

`Set` 和 `Map` 结构可以直接使用 `for...of` 循环。

```javascript
let colors = new Set(["Red", "Green", "Blue", "Yellow"]);
for (let color of colors.entries()) {
  console.log(color);
}

let mac_mini = new Map();
mac_mini.set("cpu", 'Apple M1');
mac_mini.set("memory", "16 GB");
mac_mini.set("macOS", "Ventura 13.0.1");
for (var [name, value] of mac_mini) {
  console.log(name + ": " + value);
}
```

使用 `for...of` 遍历 Set、Map结构时，遍历的顺序是按照各个成员被添加进数据结构的顺序。

`Set` 结构遍历时，返回的是一个值，而 `Map` 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 `Map` 成员的键名和键值。

## 类数组对象

类似数组的对象包括字符串 String、DOM NodeList 对象、arguments对象。

```javascript
// 字符串
let str = "hello";
for (let s of str) {
  console.log(s); // 'h' 'e' 'l' 'l' 'o'
}

// DOM NodeList对象
let nodes = document.querySelectorAll("p");
for (let p of nodes) {
  p.classList.add("test");
}

// arguments 对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}

printArgs('a', 'b'); // 'a' 'b'
```

## 对象 Object

对于普通的对象，`for...of` 结构不能直接使用，会报错。但 `for...in` 循环依然可以用来遍历键名。

```javascript
let mac_mini = {
  cpu: "Apple M1",
  memory: "16 GB",
  macOS: "Ventura 13.0.1",
}

// for...in 获取属性名和属性值
for (let mac in mac_mini) {
  console.log(mac); // 'cpu' 'memory' 'macOS'
  console.log(mac_mini[mac]) // 'Apple M1' '16GB' 'Ventura 13.0.1'
}


// for...of 循环对象抛出错误 TypeError: mac_mini is not iterable
for (let mac of mac_mini) {
  console.log(mac);
}

// 使用 Object.keys 方法将对象的键名生成一个数组，然后遍历这个数组。
for (let key of Object.keys(mac_mini)) {
  console.log(key + ': ' + mac_mini[key]);
}
```
