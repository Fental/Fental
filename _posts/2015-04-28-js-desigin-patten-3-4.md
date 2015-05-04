---
layout: post
title: JavaScript设计模式 3-4章
---
#JS设计模式读书笔记

##一. 面向对象的js

###3. 封装和信息隐藏

封装是面向对象设计的基石，为对象创建私有成员是任何面向对象语言最基本和有用的特性之一。将一个方法或属性声明为私有的，可以让对象的实现细节对其他对象保密以降低对象之间的耦合程度，可以保持数据的完整性并对其修改方式加以约束。

js不具备用以将成员声明为公用或私用的任何内置机制。但利用语言的灵活性实现这种特性。

####3.1 信息隐藏原则

#####3.1.1 封装与信息隐藏

一种概念的两种表述。信息隐藏是目的，而封装则是借以达到这个目的的技术。

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

var theHobbit = new Book('0-395-07122-4', 'The Hobbit', 'J. R. R. Tolkien');

theHobbit.display();

{% endhighlight %}

#####3.2.1 门户大开型对象

用函数来做其构造器，公用属性需要使用this关键字来创建

{% highlight js %}

var Book = function(isbn, title, author) {
	if (isbn == undefined) {
		throw new Error('Book constructor requires an isbn.');
	}
	this.isbn = isbn;
	this.title = title || 'No title specified';
	this.author = author || 'No author specified';
};

Book.prototype.display = function() {
	//...
};

{% endhighlight %}

可在上述代码中添加一个checkIsbn方法，保证ISBN是一个具有正确位数和校验和的字符串，还可以在一定程度上确保display方法能正常工作。

{% highlight js %}

Book.prototype = {
	var checkIsbn = function() {
		//...
	};
	var display = function() {
		//...
	};
}

{% endhighlight %}

但无法保证其他人会直接赋什么样的值给内部数据。

{% highlight js %}

//譬如有人会这么做
theHobbit.isbn = '987-0261103283';
theHobbit.display();

{% endhighlight %}

为了保护内部数据，为每个属性提供取值器(accessor，通常以getAttributeName这种形式命名，用于获取属性值)和赋值器(mutator，通常以setAttributeName这种形式命名)方法，可以在把新值赋给属性前进行检验。

{% highlight js %}

var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle', 'getAuthor', 'setAuthor', 'display']);

var Book = function(isbn, title, author) {	//implements Publication
	this.setIsbn(isbn);
	this.setTitle(title);
	this.setAuthor(author);
};

Book.prototype = {
	checkIsbn: function(isbn) {
		//...
	},
	getIsbn: function() {
		return this.isbn;
	},
	setIsbn: function(isbn) {
		if (!this.checkIsbn(isbn)) {
			throw new Error('Book: Invalid ISBN');
		}
		this.isbn = isbn;
	},
	getTitle: function() {
		return this.title;
	},
	setTitle: function(title) {
		this.title = title || 'No title sepecified';
	},
	getAuthor: function() {
		return this.author;
	},
	setAuthor: function(author) {
		this.author = author || 'No author sepecified';
	}, 
	display: function() {
		//...
	}
};

{% endhighlight %}

虽然这个类有对数据具有保护作用的取值器和赋值器方法、有效性检验的方法，但又漏洞。

**成员属性仍然公开，可以被直接设置，别人依然可以无视提供的结构，直接赋值。**

#####3.2.2 用命名规范区别私用成员

通过使用命名规范模仿私用成员的模式，致力于解决上一节中遇到的一个问题：无法阻止其他程序猿无意中绕过所有检验步骤。

本质上这种模式与门户大开型对象创建模式如出一辙，只不过在一些方法和属性的名称前加了下划线以示其私用性而已。

{% highlight js %}

var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle', 'getAuthor', 'setAuthor', 'display']);
var Book = function(isbn, title, author) {	//implements Publication
	this.setIsbn(isbn);
	//...
	//...
};

Book.prototype = {
	checkIsbn: function() {
		//...
	},
	getIsbn: function() {
		return this._isbn;
	},
	setIsbn: function() {
		if (!this.checkIsbn(isbn)) {
			throw new Error('Book: Invalid ISBN');
		}
		this._isbn = isbn;
	}
	//...
};

{% endhighlight %}

这种命名规范也可以应用于方法。

下划线的这种用法是个众所周知的命名规范，表明属性（或方法）仅供对象内部使用，直接访问它或设置它可能会导致意想不到的后果。

这助于防止对它无意使用，却不能防止对它的有意使用。

#####3.2.3 作用域、嵌套函数和闭包

真正实现私用性。

一些技术原理：

作用域： js中，只有函数有作用域，函数内部声明的变量在函数外部无法访问。

{% highlight js %}

function foo() {
	var a = 10;
	
	function bar() {
		a *= 2;
		//a定义在foo()中，bar可以访问它
	}
	
	bar();
	return a;
}

{% endhighlight %}

闭包： 函数体内的变量都可以保存在其函数作用域内，形成一个包。

{% highlight js %}

function foo() {
	var a = 10;
	
	function bar() {
		a *= 2;
		return a;
	}
	
	return bar;
}

var baz = foo();
baz();	//20
baz();	//40
baz();	//80

{% endhighlight %}

私用属性就其本质就是希望在对象外部无法访问的变量。

#####3.2.4 用闭包实现私用成员

借用闭包。为了创建私用属性，需要在构造器函数的作用域中定义相关变量，这些变量可以被定义于该作用域中的所有函数访问，包括那些特权方法：

{% highlight js %}

var Book = function(newIsbn, newTitle, newAuthor) {	//implements Publication

	//Private attributes.
	//var声明这些变量，意味着只存在于Book构造器中
	var isbn, title, author;

	//Private method.
	//checkIsbn同样只存在于Book构造器中
	function checkIsbn(isbn) {
		//...
	}

	//Privileged methods.
	//特权方法，是公用方法，却能访问私用属性和方法
	this.getIsbn = function() {
		return isbn;
	};
	this.setIsbn = function(newIsbn) {
		if (!checkIsbn(newIsbn)) {
			throw new Error('Book: Invalid ISBN');
		}
		isbn = newIsbn;
	};
	
	this.getTitle = function() {
		return title;
	};
	this.setTitle = function(newTitle) {
		title = newTitle || 'No title specified';
	};

	this.getAuthor = function() {
		return author;
	};
	this.setAuthor = function(newAuthor) {
		author = newAuthor || 'No author specified';
	}; 

	//Constructor code
	this.setIsbn(newIsbn);
	this.setTitle(newTitle);
	this.setAuthor(newAuthor);
};

//Public, non-privilieged methods
Book.prototype = {
	display: funciton() {
		//...
	}
};

{% endhighlight %}

这种对象创建模式解决了其他模式中的所有问题，但有弊端：

1. 前两种对象创建模式中，所有方法都创建在原型对象中，因此不管生成多少对象实例，这些方法在内存中只有一份。而利用闭包创建对象将为每一个私用方法和特权方法生成一个新副本。所以只宜在需要真正的私用成员的场合。
2. 不利于派生子类，所派生的子类不能访问超类的任何私用属性或方法。“继承破坏封装”。创建的类以后可能需要派生子类，那么最好还是采用前两种。

####3.3 更多高级对象创建模式

#####3.3.1 静态方法和属性

静态成员所关联的则是类本身。静态成员是在类的层次上操作，不是在实例的层次上操作。每个静态成员都只有一份，通过类对象访问。

{% highlight js %}

var Book = (function() {
	//外层函数被用于创建一个可以用来存放静态私用成员的闭包
	//private static attributes私有静态属性
	var numOfBooks = 0;

	//private static method
	function checkIsbn(isbn) {
		//...
	}
	
	//Return the constructor

	return function(newIsbn, newTitle, newAuthor) {	//implements Publication
		//private attributes
		var isbn, title, author;

		//privileged methods
		this.getIsbn() {
			return isbn;
		};
		this.setIsbn(newIsbn) {
			if (!checkIsbn(newIsbn)) {
				throw new Error('Book: Invalid ISBN');
			}
			isbn = newIsbn;
		}
		//其他特权函数

		//Constructor code
		numOfBook++;	//利用私有静态属性跟踪有多少类被初始化

		if (numOfBooks > 50) {
			throw new Error('Book: Only 50 instances of Book can be created');
		}

		this.setIsbn(newIsbn);
		this.setTitle(newTitle);
		this.setAuthor(newAuthor);
	}
})();

//Public static method
Book.converToTitleCase = function(inputString) {
	//...
};

//Public, non-privileged methods
Book.prototype = {
	display: function() {
		//...
	}
};

{% endhighlight %}

经验法则：一个私用方法是否应该被设计为静态方法，看它是否需要访问任何实例数据。如果不需要，那么设计成静态方法更有效率。

所有公用静态方法如果作为独立的函数来声明其实也同样简单，但最好还是像这样把相关行为集中在一起。这些方法用于与类这个整体相关的任务，而不是与类的任一特定实例相关的任务。并不直接依赖于对象中包含的任何数据。

#####3.3.2 常量

常量：不能被修改的变量。js中可以通过创建只有取值器而没有赋值器的私用变量来模仿常量。因为常量往往是在开发时进行设置，不因对象实例的不同而变化。将其作为私用静态属性设计。

{% highlight js %}

var Class = (function() {
	//常量
	var UPPER_BOUND = 100;
	
	//构造器
	var ctor = function(constructorArgument) {
		//...
	};
	
	//特权静态方法,privileged static method
	ctor.getUPPER_BOUND = function() {
		return UPPER_BOUND;
	};
	//...
	//...
	//返回构造器
	return ctor;
})();

//获取参数
Class.getUPPER_BOUND();

{% endhighlight %}

需要许多常量，创建通用取值器

{% highlight js %}

var Class = (function() {
	//静态属性
	var constants = {
		UPPER_BOUND: 100,
		LOWER_BOUND: -100
	};

	//构造器
	var ctor = function(constructorArgument) {
		//...
	};
	ctor.getConstant = function(name) {
		return constants[name];
	};
	//...
	//返回构造器	
	return ctor;
})();

//获取参数
Class.getConstant('UPPER_BOUND');

{% endhighlight %}

#####3.3.3 单体和对象工厂

后面章节会讲

####3.4 封装之利

>封装保护了内部数据的完整性。通过将数据的访问途径限制为取值器和赋值器两个方法，可以获得对取值和赋值的完全控制。这可以减少其他函数所需的错误检测代码的数量，并确保数据不会处于无效状态。
>
>对象重构因此可以变得更轻松。可以随心所欲地修改对象内部使用的数据结构和算法

####3.5 封装之弊

复杂化，私用方法难以单元测试。云云

####3.6 小结

js封装技术。如果确信其他程序猿只会使用接口中规定的方法，或者并非迫切需要保持内部数据的完整性，使用门户大开型对象；命名规范可以用来引导其他程序猿。真正的私用成员，那就只能使用闭包。

###4 继承

非常复杂的话题。js使用原型式继承（极大的优点？）。得益于语言的灵活性，既可以使用标准的基于类的继承，也可以使用原型式继承

#####4.1 为什么要继承

设计类的时候，希望减少重复性的代码，并尽量弱化对象间的耦合。

继承符合前一个设计原则的需要。但可能会使得两个类强耦合。

#####4.2 类式继承

用函数声明类，关键字new创建实例

譬如：

{% highlight js %}

//Class Person

function Person(name) {
	this.name = name;
}

Person.prototype.getName = function() {
	return this.name;
}

//首先创建构造函数。惯例，名称类名，首字母大写。结合new调用

var reader = new Person('John Smith');
reader.getName();

{% endhighlight %}

#####4.2.1 原型链

创建继承Person的类则要复杂一些：

{% highlight js %}

//Class Author

function Author(name, books) {
	Person.call(this, name);	//调用超类的构造函数，并将绑定this
	this.books = books;
}

Author.prototype = new Person();	//建立原型链
Author.prototype.constructor = Author;	//设置构造器属性
Author.prototype.getBooks = function() {
	return this.book;
};

{% endhighlight %}

让一个类继承另一个类需要挺多行代码。

首先创建一个构造函数，在构造函数中调用超类的构造函数，并将name参数传递给它。

**需要注意的是：**使用new运算符时，系统进行的事情：

+ 创建一个空对象，并且this变量引用该对象，同时还继承了该函数的原型。
+ 属性和方法被加入到this引用的对象中。
+ 新创建的对象有this所引用，并且最后隐式的返回this

{% highlight js %}

var obj = {};
Base.call(obj);
obj.__proto__ = Base.prototype;

{% endhighlight %}

>首先创建一个空对象，然后调用构造函数，在此过程中这个空对象处于作用域链的最前端。而在Author函数中调用超类的构造函数时，你必须手工完成同样的任务。`Person.call(this, name);`这条语句调用了Person的构造函数，并且在此过程中让那个空对象（用this表示）处于作用域链的最前端，而name则被作为参数传入。
>
>下一步是设置原型链。尽管相关代码比较简单，但这实际上是一个非常复杂的话题。JavaScript每个对象都有一个原型对象，但并不意味这每个对象都有一个prototype属性（实际上只有函数对象才有这个属性）。**创建一个对象时，JS会自动将其原型对象设置为其构造函数的prototype属性所知的对象。**应该注意的是，构造函数本身也是一个对象，其构造函数是Function。构造函数的原型对象实际上是Function.prototype所指的对象。在访问对象的某个成员时，如果这个成员未见与于当前对象，那么JS会在其原型对象中查找它，沿着原型链向上逐一访问每个原型对象，直到找到这个成员。这意味着为了让一个类继承另一个类，只需将子类的prototype设置为指向超类的一个实例即可。为了让Author继承Person，必须手工将Author的prototype设置为Person的一个实例
>
>最后一个步骤是将prototype的constructor属性重设为Author（因为把prototype属性设置为Person的实例中，其constructor属性被抹除。）定义一个构造函数时，其默认的prototype对象是一个Object类型的实例，其constructor属性会被自动设置为该构造函数本身。如果手工将其prototype设置为另一个对象，那么新对象自然不会具有原对象的constructor值，所以需要重新设置constructor属性。

由于上面的例子的超类名称固化在Author类的声明之中。更好的普适性的方法：

{% highlight js %}

function extend(subClass, superClass) {
	var F = function() {
	};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	//提供superclass属性，弱化子类父类之间的耦合。
	//确保超类的prototype的constructor属性被正确设置，即使超类是Object本身。
	subClass.superclass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}

//Class Author

function Author(name, books) {
	Author.superclass.constructor.call(this, name);
	this.books = books;
}
extend(Author, Person);

Author.prototype.getBooks = function() {
	return this.books;
};

//superclass属性，可直接调用超类中的方法

Author.prototype.getName = function() {
	var name = Author.superclass.getName.call(this);
	return name + ', Author of ' + this.getBooks().join(', ');
};

{% endhighlight %}

####4.3 原型式继承

只从对象的角度思考。并不需要用类来定义对象的结构，只需直接创建一个对象即可。得益于原型链查找的工作机制。这个对象随后可以被新的对象重用。该对象被称为**原型对象**，为其他对象应有的模样提供了一个原型，正式原型式继承这个名称的又来。

{% highlight js %}

var Person = {
	name: 'default name',
	getName: function() {
		return this.name;
	}
};

//不需要使用构造函数
//实例化

var reader = clone(Person);
alert(reader.getName());
reader.name = 'John Smith';
alert(reader.getName());

//clone函数用来创建新的类Person对象。创建一个空对象，其原型对象呗设置为Person

//继承
//Author Prototype Object

var Author = clone(Person);
Author.books = [];
Author.getBooks = function() {
	return this.books;
};

//实例化
var author = [];

author[0] = clone(Author);
author[0].name = 'Dustin Diaz';
author[0].books = ['JavaScript Design Patterns'];

author[1] = clone(Author);
author[1].name = 'Ross Harmes';
author[1].books = ['JavaScript Design Patterns'];

author[1].getName();
author[1].getBooks();

{% endhighlight %}

#####4.3.1 对继承而来的成员的读和写的不对等性

> 为了有效地使用原型式继承，你必须忘记有关类式继承的一切。在类式继承中，Author的每一个实例都有一份自己的books数组副本。你可以用代码`author[1].books.push('New Book Title')`为其添加元素。
>
>但是对于使用原型式继承方式创建的类Author对象来说，由于原型链接的工作方式，这种做法并非一开始就能行得通。一个克隆并非其原型对象的一份完全独立的副本，它只是一个以哪个对象为原型对象的空对象而已。克隆刚被创建时，author[1].name其实是一个指向最初的Person.name的链接。对于从原型对象继承而来的成员，其读和写具有内在的不对等性。在读取author[1].name的值时，如果你还没有直接为author[1]实例定义name属性的话，那么所得到的是其原型对象的同名属性值。而在写入author[1].name的值时，你是在直接为author[1]对象定义一个新属性。
>
>说明了为什么必须为通过引用传递的数据类型的属性创建新副本

{% highlight js %}

var authorClone = clone(Author);
alert(authorClone.name);	//指向原先的Person.name

authorClone.name = 'new name';	//name被创建并被添加到authorClone object自身

alert(authorClone.name);	//指向authorClone.name

authorClone.books.push('new book');	//authorClone.books被链接到Author.books，这里修改了prototype object的默认值

authorClone.books = [];	//新的books被添加到authorClone自身

authorClone.books.push('push book');


{% endhighlight %}

有时原型对象也有自己的子对象。为了尽量弱化对象之间的耦合，任何复杂的子对象都应该使用方法创建。

{% highlight js %}

var CompoundObject = {
	string1: "default value",
	childObject: {
		bool: true,
		num: 10
	}
};

var compoundObjectClone = clone(CompoundObject);

//Bad!修改了CompoundObject.childObject.num
compoundObjectClone.childObject.num = 5;

//Better.创建了一个新的Object，但必须知道object的结构，导致紧耦合
compoundObjectClon.childObject = {
	bool: true,
	num: 5
};

//更好的办法，使用工厂方法来创建childObject
//Best
var CompoundObject = {};
CompoundObject.string1 = 'default value';
CompoundObject.createChildObject = function() {
	return {
		bool: true,
		num: 10
	};
};
CompoundObject.childObject = CompoundObject.createChildObject();

var compoundObjectClone = clone(compoundObject);
compoundObjectClone.childObject = CompoundObject.createChildObject();
compoundObjectClone.childObject.num = 5;

{% endhighlight %}

#####4.3.2 clone函数

clone函数首先创建一个新的空函数F，然后将F的prototype属性设置为作为参数object传入的原型对象。

prototype属性就是用来指向原型对象的，通过原型链接机制，提供了到所有继承而来的成员的连接。

函数所返回的这个克隆结果是一个以给定对象为原型对象的空对象。

{% highlight js %}

function clone(object) {
	function F() {
	}
	F.prototype = object;
	//为什么不用
	//F.prototype.constructor = F;

	return new F();
}

{% endhighlight %}

####4.4 类式继承和原型式继承的对比

大相径庭，各有有确定。判断特定场合应该使用哪一种。

几乎所有用面向对象方式编写的js代码中都用到类式继承，设计众人使用的Api最后还是使用类式继承。

在各种流行语言中只有js使用原型式继承，对象具有到自己的原型对象的反向链接。但高级js程序猿需要懂的原型式继承的工作机制

原型式继承更能节约内存。在原型链查找成员的方式使得所有克隆出来的对象都共享每个属性和方法的唯一一份实例（上面也提到过）。原型继承显得更为简练。

本书介绍的设计模式都可以应用于两种继承范型。但本书主要使用类式继承

####4.5 继承与封装

封装对继承的影响。从现有类派生出一个子类时，只有公用和特权成员会被承袭下来。

由于这个原因门户大开型类是最适合于派生子类的。所有成员公开，可遗传给子类，若要稍加隐藏，可使用下划线符号规范。

派生具有真正的私用成员的类时，特权方法是公用，所以会被遗传下来。藉此可以在子类中间接访问父类的私用属性，但子类自身的实力方法都不能直接访问这些私用属性。

不累的私用成员只能通过这些既有的特权方法进行访问，不能再子类中添加能够直接访问它们的新的特权方法。

####4.6 掺元类

有一种重用代码的方法不需要用到严格的继承。把一个函数用到多个类中，可以通过扩充的方式让这些类共享该函数。

实际做法：创建一个包含各种通用方法的类（掺元类），然后再用它扩充其他类。

{% highlight js %}

//Mixin类 掺元类
var Mixin = function() {
};

Mixin.prototype = {

	//遍历this对象的所有成员并将值组织为一个字符串输出

	serialize: function() {
		var output = [];
		for (key in this) {
			output.push(key + ':' + this[key]);
		}
		return output.join(', ');
	}
};

//扩充
augment(Author, Mixin);	//扩充函数，下面会提到

var author = new Author('Ross Harmes', ['JavaScript Design Patterns']);
var serializedString = author.serialize();

{% endhighlight %}

Mixin类只有一个方法。可能在许多不同类型的类都会用到，但没必要让这些泪都继承Mixin，把这个方法的代码复制到这些类也并不明智。最好还是用augment函数把这个方法添加到每个需要它的类中。一个类可以用多个掺元类加以扩充，实际上实现了多继承的效果。

{% highlight js %}

//augment函数
function augment(receivingClass, givingClass) {
	for (methodName in givingClass.prototype) {
		if (!receivingClass.prototype[methodName]) {
			receivingClass.prototype[methodName] = givingClass.prototype[methodName];
		}
	}
}

//改进，可复制其中的一两个方法

function augment(reveivingClass, givingClass) {
	if(arguments[2]) {	//给了确定的方法
		for (var i = 2, len = arguments.length; i < len; i++) {
			receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
		}
	}
	else {
		for (methodName in givingClass.prototype) {
			if (!receivingClass.prototype[methodName]) {
				receivingClass.prototype[methodName] = givingClass.prototype[methodName];
			}
		}
	}
}

//augment(Author, Mixin, 'serialize');

{% endhighlight %}

####4.7 示例： 就地编辑

提供了三种解决方案，演示了类式继承、原型式继承和掺元类的用法

{% highlight js %}

function EditInPlaceField(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElements(this.id);
    this.attachEvents();
}

EditInPlaceField.prototype = {
    createElements: function(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'Save';
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = 'Cancel';
        this.containerElement.appendChild(this.cancelButton);
        this.converToText();
    },
    attachEvents: function() {
        var that = this;
        addEvent(this.staticElement, 'click', function() {
            that.convertToEditable();
        });
        addEvent(this.saveButton, 'click', function() {
            that.save();
        });
        addEvent(this.cancelButton, 'click', function() {
            that.cancel();
        });
    },
    convertToEditable: function() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },
    save: function() {
        this.value = this.getValue();
        var that = this;
        var callback = {
            success: function() {
                that.convertToText();
            },
            failure: function() {
                alert('Error saving value');
            }
        };
        ajaxRequest('GET', 'save.php?id=' + this.id + '&value=' + this.value, callback);
    },
    cancel: function() {
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';

        this.setValue(this.value);
    },

    setValue: function(value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    getValue: function() {
        return this.fieldElement.value;
    }
};

//创建一个就地编辑域，实例化这个类

var titleClassical = new EditInPlaceField('titleClassical', $('doc'), 'Title Here');
var currentTitleText = titleClassical.getValue();

{% endhighlight %}



#参考书籍

[JavaScript设计模式](http://book.douban.com/subject/3329540/)

[JavaScript权威指南](http://book.douban.com/subject/2228378/)