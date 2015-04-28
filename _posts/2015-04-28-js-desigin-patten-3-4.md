---
layout: post
title: JavaScript设计模式 3-4章
---
#JS设计模式读书笔记

##一. 面向对象的js

###3. 封装和信息隐藏

封装是面向对象合计的基石，为对象创建私有成员是任何面向对象语言最基本和有用的特性之一。将一个方法或属性声明为私有的，可以让对象的实现细节对其他对象保密以降低对象之间的耦合程度，可以保持数据的完整性并对其修改方式加以约束。

js不具备用以将成员声明为公用或私用的任何内置机制。但利用语言的灵活性实现这种特性。

####3.1 信息隐藏原则

#####3.1.1 封装与信息隐藏

一种概念的两种表述。信息隐藏式目的，而封装则是借以达到这个目的的技术。

封装可以被定义为对对象的内部数据表现形式和实现细节进行隐藏。要想访问封装过的对象中的数据，只有使用已定义的操作这一种方法。通过封装可以强制实施信息隐藏。

#####3.1.2 接口扮演的角色

在向其他对象隐藏信息的过程中接口发挥的作用：

接口提供了一份记载着可供公众访问的方法的契约。**定义了两个对象间可以具有的关系，只要接口不变，这个关系的双方都是可替换的。应该避免公开未定义于接口中的方法。否则其他对象可能会对那些并不属于接口的方法产生依赖。**

> 一个理想的软件系统应该为所有类定义接口。这些类只向外界提供它们实现的接口中规定的方法，任何别的方法都留作自用。其所有属性都是私用的，外界只能通过接口中定义的存取操作与之打交道。但实际的系统很少能真正达到这样的境界。**优质的代码应尽量想这个目标靠拢，但又不能过于刻板，把那些并不需要这些特性的简单项目复杂化。**

####3.2 创建对象的基本模式

js创建对象的基本模式有3种：门户大开型（fully exposed），只能提供公用成员；使用下划线来表示方法或属性的私有性；使用闭包来创建真正私用的成员。

三种方法各有利弊。

以Book类为例。创建一个用来存储关于一本书的数据的类，并为其实现一个以HTML形式显示这些数据的方法。

它会被这么使用

{% highlight js %}

//Book(isbn, title, author)

var theHobbit = new Book("0-395-07122-4", "The Hobbit", "J. R. R. Tolkien");

theHobbit.display();

{% endhighlight %}

#####3.2.1 门户大开型对象

用函数来做其构造器，公用属性需要使用this关键字来创建

{% highlight js %}

var Book = function(isbn, title, author) {
	if (isbn == undefined) {
		throw new Error("Book constructor requires an isbn.");
	}
	this.isbn = isbn;
	this.title = title || "No title specified";
	this.author = author || "No author specified";
};

Book.prototype.display = function() {
	//...
};

{% endhighlight %}

#参考书籍

[JavaScript设计模式](http://book.douban.com/subject/3329540/)

[JavaScript权威指南](http://book.douban.com/subject/2228378/)