---
layout: post
title: JavaScript严格模式
---

# JavaScript严格模式

[参考链接](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

## 1、概述

ES5有两种运行模式：正常模式和严格模式

进入严格模式的目的：

+ 消除js语法的一些不合理不严谨之处，减少一些怪异行为
+ 消除代码运行的不安全之处，保证代码运行的安全
+ 提高编译器效率，增加运行速度
+ 为未来新版本js过渡

## 2、使用"use strict"作为进入标志

## 3、调用方式

### 3.1、针对整个脚本文件

"use strict"放在脚本文件第一行（严格地说只要前面不是产生实际运行结果的语句，"use strict"可以不放在第一行）

<pre>
&ltscript&gt
	"use strict";
	console.log("in strict mode");
&lt/script&gt
</pre>

### 3.2、针对单个函数

<pre>
function strict() {
	"use strict";
	return "这是严格模式";
}
</pre>

### 3.3、变通写法

第一种方法不利于文件的合并，所以借用第二种方法

<pre>
(function () {
	"use strict";
	
	// code
	
})();
</pre>

## 4、语法和行为上的改变

+ 全局变量显示声明，变量必须先用var声明，然后再使用
+ 静态绑定（禁止使用with语句，创设eval作用域）
+ 安全措施（禁止this关键字指向全局对象、禁止在函数内部遍历调用栈）

<pre>
// 禁止this关键字指向全局对象

function f() {
	return !this;		// 返回false，因为'this'指向全局对象，故'!this'就是false
}

function f() {
	"use strict";
	return this;		// 返回true，严格模式下，this的值为undefined
}

// 禁止在函数内部遍历调用栈

funciton f() {
	"use strict";
	f.caller;		// 调用的时候会报错
	f.arguments;	// 调用的时候会报错
}
</pre>

+ ...
+ 保留字（为js新版本过渡，增加保留字，implements, interface, let, package, private, protected, public, static, yield）
