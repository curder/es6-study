# 字符串方法

介绍字符串对象的新增方法。

## String.raw()

ES6 还为原生的 String 对象，提供了一个 `raw()` 方法。

该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```javascript
String.raw`Hi\n${2 + 3}!` // 返回：'Hi\\n5!'，显示转义后的结果：'Hi\n5!'(比如通过 console.log 打印的结果) 
```

如果原字符串的斜杠已经转义，那么 `String.raw()` 会进行再次转义。

```javascript
String.raw`Hi\\n` // 返回 "Hi\\\\n"
```

`String.raw()` 方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw()` 本质上是一个正常的函数，只是专用于模板字符串的标签函数。

如果写成正常函数的形式，它的第一个参数，应该是一个具有 `raw` 属性的对象，且 `raw` 属性的值应该是一个数组，对应模板字符串解析后的值。

```javascript
// `foo${1 + 2}bar`
// 等同于
String.raw({raw: ['foo', 'bar']}, 1 + 2) // "foo3bar"
```

> `String.raw()` 方法的第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。

## includes(), startsWith(), endsWith()

ES6之前的 JavaScript 只有 `indexOf` 方法用来确定一个字符串是否包含在另一个字符串中。

ES6 中又提供了三种新方法：

- `includes()`：返回布尔值，表示是否找到了参数字符串。
- `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
- `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let string = 'Hello world!';

string.startsWith('Hello') // true
string.endsWith('!') // true
string.includes('o') // true
```

以上方法都支持第二个参数，指定开始搜索的位置。

```javascript
let string = 'Hello world!';

string.startsWith('Hello', 6) // false
string.endsWith('!', 6) // false
string.includes('o', 6) // true
```

::: warning 注意
上面代码表示，使用第二个参数时，`endsWith` 参数的行为与其他两个方法有所不同，它针对参数前的字符，而 `startsWith`
和 `includes` 方法则是针对从参数位置直到字符串结束。
:::

## repeat()

`repeat(n)` 方法返回一个新字符串，表示将原字符串重复 `n` 次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'x'.repeat(0) // ""
```

参数如果是小数，会被取整。

```javascript
'x'.repeat(2.9) // "xx"
```

如果 `repeat` 的参数是负数或者 `Infinity`，会报错。

```javascript
'x'.repeat(Infinity) // RangeError

'x'.repeat(-1) // RangeError
```

但是，如果参数是 0 到 -1 之间的小数，则等同于 0，这是因为会先进行取整运算。

0 到-1 之间的小数，取整以后等于-0，`repeat` 视同为 0。

```javascript
'x'.repeat(-0.9) // ""
```

参数NaN等同于 0。

```javascript
'x'.repeat(NaN) // ""
```

如果 `repeat` 的参数是字符串，则会先转换成数字。

```javascript
'x'.repeat('na') // ""
'x'.repeat('3') // "xxx"
```

## padStart()、padEnd()

ES2017 引入了字符串补全长度的功能，如果某个字符串不够指定长度，会在头部或尾部补全。

`padStart()` 用于头部补全，`padEnd()` 用于尾部补全。

```javascript
'x'.padStart(5, '01') // '0101x'
'x'.padStart(4, '01') // '010x'

'x'.padEnd(5, '01') // 'x0101'
'x'.padEnd(4, '01') // 'x010'
```

上面代码中，`padStart()` 和 `padEnd()` 共接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

```javascript
'xxx'.padStart(2, '01') // 'xxx'
'xxx'.padEnd(2, '01') // 'xxx'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

```javascript
'xxx'.padStart(10, '0123456789') // '0123456xxx'
```

如果不提供第二个参数，默认使用空格补全长度。

```javascript
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

`padStart()` 的常见用途是为数值补全指定位数和提示字符串格式。例如：

```javascript
'1'.padStart(10, '0') // "0000000001"
'21'.padStart(10, '0') // "0000000012"
'1234567'.padStart(10, '0') // "0001234567"

'21'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'11-21'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

## trimStart()、trimEnd()

ES2019 对字符串实例新增了 `trimStart()` 和 `trimEnd()` 方法。

它们的行为与 `trim()` 一致，`trimStart()` 消除字符串头部的空格，`trimEnd()` 消除尾部的空格。

它们返回的都是新字符串，不会修改原始字符串。

```javascript
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

上面代码中，`trimStart()` 只消除头部的空格，保留尾部的空格。`trimEnd()` 也是类似行为。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器支持额外的两个方法，`trimLeft()`是 `trimStart()` 的别名，`trimRight()` 是 `trimEnd()` 的别名。

