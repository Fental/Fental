---
layout: post
title: JavaScript设计模式 1-2章
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

Anim.method('start', function() {
	//...
});

Anim.method('stop', function() {
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

Anim.method('start', function() {
	//...
})
.method('stop', function() {
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

模仿效果不好，没有检查CompositeForm是否真正实现了正确的方法集，实现全靠自觉

#####2.3.2 用属性检查模仿借口

所有类都明确地声明自己实现了哪些接口，那些想与这些类打交道的对象可以针对这些声明进行检查，接口自身仍然只是注释，但可通过检查一个属性得知某个类自称实现了什么接口：

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

var CompositeForm = function(id, method, action) {
	this.implementsInterfaces = ['Composite', 'FormItem'];
	//...
};

//...

function addForm(formInstance) {
	if (!implements(formInstance, 'Composite', 'FormItem')) {
		throw new Error('Object does not implement a required interface.');
	}
	//...
}

//implements function 用来检查一个对象是否实现需要实现的接口

function implements(object) {
	for (var i = 1; i < arguments.length; i++) {
		
		var interfaceName = arguments[i];
		var interfaceFound = false;
		for (var j = 0; j < object.implementsInterfaces.length; j++) {
			if (object.implementsInterfaces[j] == interfaceName) {
				interfaceFound = true;
				break;
			}
		}
		if(!interfaceFound) {
			return false;	//有一个接口未实现
		}
	}
	return true;
}

{% endhighlight%}

宣称自己实现了Compsite和FormItem接口，做法是将两个接口的名称加入一个数组中。任何一个要求其参数属于特定类型的函数都可以对这个属性进行检查，并在所需接口未在声明之列时抛出错误。

优点： 对类所实现的接口提供文档声明。需要的接口不再类宣称支持的接口之类，会看到错误。

缺点： 为确保类真正实现了自称实现的接口。

#####2.3.3 用鸭式辨型模仿借口

类是否声明自己支持哪些接口不重要，只要具有接口中的方法就行。

> 像鸭子一样走路并且嘎嘎叫的就是鸭子。

把对象实现的方法集作为判断它是不是某个类的实例的唯一标准。如果对象具有与几口定义的方法同名的所有方法，那么就可以认为它实现了这个接口。

{% highlight js %}

//Interfaces，本书定义的Interface类

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);

var FormItem = new Interface('FormItem', ['save']);

//CompositeForm class

var CompositeForm = function(id, method, action) {
	//...
};

//...

function addForm(formInstance) {
	ensureImplements(formInstance, Composite, FormItem);
	//如果接口的方法没有被实现，这个函数将会抛出错误
	//...
}

{% endhighlight%}

鸭式辨型不借助注释。虽然是三种方法最有用（检查了接口的方法在类中是否都实现），但不声明自己实现哪些接口，降低代码可重用性，也缺乏自我描述性。同时需要使用辅助类（Interface）和辅助函数（ensureImplements）...

####2.4 本书的接口实现方式

注释法和鸭式辨型结合。用注释声明类支持的接口，从而提高代码的可重用性和文档的完善性；用辅助类Interface及其类方法Interface.ensureImplements进行显示检查。

实例：

{% highlight js %}

//Interfaces

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

//CompositeForm class

var CompositeForm = functio(id, method, action) {	//implements Composite, FormItem
	//...
};

//...
function addForm(formInstance) {
	Interface.ensureImplements(formInstance, Composite, FormItem);

	//...
}

{% endhighlight %}

####2.5 Interface类

{% highlight js %}

//Constructor 

var Interface = function(name, methods) {
	if (arguments.length != 2) {
		throw new Error('Interface constructor called with' + arguments.length + 'arguments, but expected exactly 2.');
	}

	this.name = name;
	this.methods = [];
	for (var i = 0, len = methods.length; i < len; i++) {
		if (typeof methods[i] !== 'string') {
			throw new Errow('Interface constructor expects method names to be passed in as a string');
		}
		this.methods.push(methods[i]);
	}
};

//Static class method

Interface.ensureImplements = function(object) {
	if(arguments.length < 2) {
		throw new Error('Function Interface.ensureImplements called with' + arguments.length + 'arguments, but expected at least 2.');
	}

	for (var i = 1, len = arguments; i < len; i++) {
		var interface = arguments[i];
		if (interface.constructor !== Interface) {
			throw new Error('Function Interface.ensurImplements expects arguments two and above to be instances of Interface.');
		}

		for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
			var method = interface.methods[j];
			if (!object[method] || typeof object[method] !== 'function') {
				throw new Error('Function Interface.ensurImplements: object does not implement the ' + interface.name + ' interface.Methods ' + method + 'was not found');
			}
		}
	}
};

{% endhighlight %}

#####2.5.1 Interface类的使用场合

接口可以降低对象间的耦合度，提高代码灵活性。既能向函数传递任何类型的参数，又能保证它只会使用那些具有必要方法的对象。某些场合下接口很有用处。

有时候无法直接控制代码的情况，譬如使用各种服务的API。有可能会发生变化。一种应对策略是为所依赖的每个API创建Interface对象

{% highlight js %}

var DynamicMap = new Interface('DynamicMap', ['centerOnPoint', 'zoom', 'draw']);

function displayRoute(mapInstance) {
	Interface.ensureImplements(mapInstance, DynamicMap);
	mapInstance.centerOnPoint(12, 34);
	mapInstance.zoom(5);
	mapInstance.draw();
	//...
}

{% endhighlight %}

#####2.5.2 Interface类的用法

判断使用接口是否华萱是最重要（也是最困难）的一步。权衡利弊

1. 将interface类引入html中
2. **逐一检查代码中所有以对象为参数的方法。搞清代码的正常运转要求这些对象参数具有哪些方法**
3. 为你需要的每一个不同的方法集创建一个Interface对象。
4. **剔除所有针对构造器的显式检查。因为用的是鸭式辨型，对象的类型不再重要**
5. 以Interface.ensureImplements取代原来构造器的检查

降低耦合度，不再依赖对象。

#####2.5.3 示例

创建一个类，可以将一些自动化测试结果转化为适用于在网页上查看的格式。

该类的构造器以一个TestResult类的实例为参数。它会应客户的请求对这个TestResult对象所封装的数据格式化，然后输出。

{% highlight js %}

//未使用接口

var ResultFormatter = function(resultsObject) {
	if(!(resultsObject instanceOf TestResult)) {
		throw new Errow('ResultsFormatter: constructor requires an instance of TestResult as an argument');
	}
	this.resultsObject = resultsObject;
};

ResultFormatter.prototype.renderResult = function() {
	
	var dataOfTest = this.resultsObject.getDate();
	var resultsArray = this.resultsObject.getResults();

	var resultsContainer = document.createElement('div');
	
	var resultsHeader = document.createElement('h3');
	resultsHeader.innerHTML = 'Test Results from' + dateOfTest.toUTCString();
	resultsContainer.appendChild(resultsHeader);

	var resultsList = document.createElement('ul');
	resultsContainer.appendChild(resultsList);

	for (var i = 0, len = resultsArray.length; i < len; i++) {
		var listItem = document.createElement('li');
		listItem.innerHTML = resultsArray[i];
		resultsList.appendChild(listItem);
	}

	return resultsContainer;
};

{% endhighlight %}

该类的构造器对参数进行检查，确保了为TestResult类，但无法保证是否实现了getDate()、getResults()；同时加了限制条件，参数不允许使用其他类的实力作参数。

解决方案：

{% highlight js %}

var ResultSet = new Interface('ResultSet', ['getDate', 'getResults']);

var ResultFormatter = function(resultsObject) {
	Interface.ensureImplements(resultsObject, ResultSet);
	this.resultsObject = resultsObject;
};

ResultFormatter.prototype.renderResults = function() {
	//...
};

{% endhighlight %}

检查变得更准确，参数变得更宽容

####2.6 依赖于接口的设计模式

1. 工厂模式
2. 组合模式
3. 装饰者模式
4. 命令模式

####2.7 小结

接口在流行的面向对象语言中的使用和实现方式；js实现接口

#参考书籍

[JavaScript设计模式](http://book.douban.com/subject/3329540/)

[JavaScript权威指南](http://book.douban.com/subject/2228378/)