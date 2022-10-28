# let 和 const 指令

## let 关键字

ES6 中新增了 `let` 命令，用来声明变量。

它的用法类似于 `var`，但是所声明的变量，只在 `let` 关键字所在的代码块内有效。

### 代码块内有效

```javascript
{
  let a = 1;
  var b = 2;
}

console.log(a) // ReferenceError: a is not defined.
console.log(b) // 2
```

上面代码在代码块分别用 `let` 和 `var` 声明了两个变量，然后在代码块之外访问它们。

结果 `let` 声明的变量报错，`var` 声明的变量返回了正确的值。

这表明 `let` 声明的变量只在它所在的代码块有效。

### 不允许重复声明

- `let` 只能在同一个代码块中只允许声明一次，不允许在相同作用域内，重复声明同一个变量。

- `var` 则可以声明多次。

```javascript
{
  let a = 1;
  let a = 2;
}
console.log(a) // SyntaxError: Identifier 'a' has already been declared

{
  var b = 1;
  var b = 2;
}
console.log(b) // 2
```

`for` 循环计数器很适合用 `let` 关键字

```javascript
for (var i = 0; i < 10; i++) { // 输出十个 10
  setTimeout(function() {
    console.log(i);
  })
}

for (let j = 0; j < 10; j++) { // 输出 0123456789
  setTimeout(function() {
    console.log(j);
  })
}
```

- 变量 `i` 是用 `var` 声明的，在全局范围内有效。所以全局中只有一个变量 `i`, 每次循环时，`setTimeout` 定时器里面的 `i`
  指的是全局变量 `i` ，而循环里的十个 `setTimeout` 是在循环结束后才执行，所以此时的 `i` 都是 `10`。

- 变量 `j` 是用 `let` 声明的，当前的 `j` 只在本轮循环中有效，每次循环的 `j` 其实都是一个新的变量，所以 `setTimeout`
  定时器里面的 `j` 其实是不同的变量，即最后输出 `0123456789`。（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为
  JavaScript 引擎内部会记住前一个循环的值）。

### 不存在变量提升

`var` 会发生“变量提升”现象，即变量可以在声明之前使用，值为 `undefined`。

为了纠正这种现象，`let` 命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript

console.log(a);  // ReferenceError: a is not defined
let a = 1;

console.log(b);  //undefined
var b = 2;
```

- 变量 `b` 用 `var` 声明存在变量提升，所以当脚本开始运行的时候，变量 `b` 已经存在了，但是还没有赋值，所以会输出 `undefined`。

- 变量 `a` 用 `let` 声明不存在变量提升，在声明变量 `a` 之前，变量 `a` 不存在，所以会报错。

### 暂时性死区

只要块级作用域内存在 `let` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 1;

if (true) {
  tmp = 2; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量 `tmp`，但是块级作用域内 `let` 又声明了一个局部变量 `tmp`，导致后者绑定这个块级作用域，所以在 `let`
声明变量前，对 `tmp` 赋值会报错。

ES6 明确规定，如果区块中存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

ES6 规定暂时性死区和 `let`、`const` 语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在
ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

## const 关键字

`const` 声明一个只读变量，声明之后不允许改变。意味着，一旦声明必须初始化，否则会报错。

```javascript
const PI = 3.1415926;
console.log(PI) // 3.1415926

PI = 3.14; // TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

`const` 声明的变量不得改变值，这意味着 `const` 一旦声明变量，就必须立即初始化，不能等之后再赋值。

比如下面的 const 定义常量未赋值则抛出语法错误：

```javascript
const foo // Uncaught SyntaxError: Missing initializer in const declaration
```

### 不允许重复声明

`const` 声明的常量，也与 `let` 一样不可对常量进行重复声明。

```javascript
var a = 1;
let b = true;

// 以下两行都会报错
const a = 2; // Uncaught SyntaxError: Identifier 'a' has already been declared
const b = false;
```

### 代码块内有效

`const` 的作用域与 `let` 命令相同：只在声明所在的块级作用域内有效。

比如下面的代码逻辑也会抛出错误：

```javascript
{
  const PI = 3.1415926;
}

PI // Uncaught ReferenceError: PI is not defined
```

### 暂时性死区

const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

比如下面的代码逻辑也会抛出错误：

```javascript
{
  console.log(PI) // Uncaught ReferenceError: Cannot access 'PI' before initialization   
  const PI = 3.1415926;
}
```
