---
layout: post
title: JavaScript设计模式
---
#JS设计模式读书笔记

这本书在各种设计模式的实现没有实现原型式继承，而是选择类式继承。个人口味问题？

> 有些人似乎天生就容易被原型是继承的简洁性吸引，而另一些人却对更面熟的类式继承情有独钟。

##一. 面向对象的js

###1. 富有表现力的js

####1.1 js的灵活性

js对强大的特性是其灵活性。允许模仿其他语言的编程模式的惯用法，也有自己的编程模式和惯用法。

用不同方法完成同样任务：启动和停止一个动画

惯用过程式的程序设计：

{% highlight js %}

function startAnimation() {
	//...
}

function stopAnimation() {
	//...
}

{% endhighlight %}

面向对象

{% highlight js %}

var Anim = function() {
	//...
};

Anim.prototype.start = function() {
	//...
};

Anim.prototype.stop = function() {
	//...
};

//Usage

var myAnim = new Anim();
myAnim.start();
//...
myAnim.stop();

{% endhighlight %}

上述代码定义了名为Anim的类，并把方法赋给类的prototype属性

还可以改用下面代码：

{% highlight js %}

var Anim = function() {
	//...
};

Anim.prototype = {
	start: function() {
		//...
	},
	stop: function() {
		//...
	}
};

{% endhighlight %}

还可以这样:

{% highlight js %}

//为函数类添加新方法

Function.prototype.method = function(name, fn) {
	this.prototype[name] = fn;
}

var Anim = function() {
	//...
};

Anim.method("start", function() {
	//...
});

Anim.method("stop", function() {
	//...
});

{% endhighlight %}

使用级联（链式调用）

{% highlight js %}

Function.prototype.method = function(name, fn) {
	this.prototype[name] = fn;
	return this;
}

//...

Anim.method("start", function() {
	//...
})
.method("stop", function() {
	//...
});

{% endhighlight %}

####1.2 弱类型语言

（参考权威指南第六版 第三章）

原始类型： boolean number string （不区分整数和浮点数）

对象类型： object（“名/值对”的无序集合。数组、函数是特殊的对象类型）

特殊原始值： 空（null）、未定义（undefined）...

js除了数值、字符串、布尔值、null、undefined之外就是对象。

原始类型之间的类型转换:

数值、布尔值->字符串： toString()

字符串->数值： parseInt()、parseFloat()

字符串、数值->布尔值： 双重非。var bool = !!num;

####1.3 函数是一等对象

匿名函数、IIFE、闭包

####1.4 对象的易变性

js中，一切都是对象（除了那三种原始数据类型。即便是这些类型，在必要的时候也会自动包装为对象。整个过程看起来就像： js引用原始数据类型的属性时，会通过调用new String(s)、new Number(n)、new Boolean(b)的方式转换为对象，用来处理属性的引用。属性引用结束，新创建对象销毁。参考权威指南第六版 3.6 包装对象。）

js所有对象易变(mutable)，对先前定义的类和实例化的对象进行修改（大多数别的语言不允许的技术。）

js可以在运行时检查对象所具有的属性和方法，还可以使用这种信息动态实例化类和执行其方法（反射）。本书用来模仿传统的面向对象特性的技术都依赖于对象的易变性和反射。

####1.5 继承

基于对象（原型式）继承；可模仿基于类的继承。编写代码时哪种都行，根据手头任务实际情况。

####1.6 js中的设计模式

本书专门讨论四人帮的设计模式在js中的应用

####1.7小结

js语言灵活性、弱语言、设计模式

###2. 接口

“针对接口而不是实现编程”，js没有内置的创建或实现接口的方法，也没有内置的方法用于判断一个对象是否实现了与另一个对象相同的一套方法。

但，利用js的灵活性可以添加这些特性

####2.1 什么是接口

提供一种用以说明一个对象应该具有哪些方法的手段。但并不规定这些方法如何实现。

#####2.1.1 接口之利

一方面，自我描述，促进代码重用。接口告诉程序猿一个类实现了哪些方法；另一方面，助于稳定不同类之间的通信方式，定义接口，集成两个对象时减少问题。

#####2.1.2 接口之弊

js实现接口会对性能造成一些影响，归咎于额外方法开销；无法强迫其他程序猿遵循你定义的接口。js中没有Interface这个关键词

####2.2 其他面向对象语言处理接口的方式

java、php、c#在实现接口时，漏掉任何一个方法都会导致编译时显示错误。

####2.3 在js中模仿接口

三种方法： 注释法、属性检查法、鸭式辨型法。没有完美的技术，但三者结合基本令人满意

#####2.3.1 注释法

最简单，效果最差。这种方法模仿其他面向对象语言中的做法，使用interface和implements关键字，但放在注释中，以免引起语法错误。

{% highlight js %}

/*

interface Composite {
	function add(child);
	function remove(child);
	function getChild(index);
}

interface FormItem {
	function save();
}

*/

var CompositeForm = function(id, method, action) {	//implements Composite, FormItem
	//...
};

//Implement the Composite interface.

CompositeForm.prototype.add = function(child) {
	//...
};

CompositeForm.prototype.remove = function(child) {
	//...
};

CompositeForm.prototype.getChild = function(index) {
	//...
};

//Implement the FormItem interface

CompositeForm.prototype.save = function() {
	//...
};

{% endhighlight %}

