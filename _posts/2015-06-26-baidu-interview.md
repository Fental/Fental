---
layout: post
title: 百度面试相关问题
---

# 百度面试相关问题

## 1. html语义化

个人对语义化的理解，最忌讳的一点就是放着html5的标签不用然后一直div，根据样式效果选择标签。

用正确的标签做正确地事。

每个标签都有自己的含义以及适用场景，正确使用的好处：

+ 利于SEO（搜索引擎貌似依赖标签来确定上下文和各关键字的权重）
+ 容易将网站分块，易于阅读源码和维护
+ 增强了网站的可用性（不排除会有视觉有障碍的人使用屏幕阅读器阅读网页）

样式就交给 CSS 来。

## 2. img 的title 和 alt 的区别

img 的 title 是指鼠标悬浮在图片上显示的文字，提供建议性信息； alt 则是图片显示不出来时的替代文字（用来替代图像而不是做额外申明）

## 3. CSS布局

布局相关：display

display 是CSS中用于控制布局的元素，每个元素都有自己默认的display值。

大多是默认是block 或者inline

block：块级元素，一般会开启新一行并尽可能撑满容器

inline：行内元素，一般不会打乱布局

none：一些元素的默认值是它，如script，被用来在不删除元素的情况下隐藏元素。不过得区别与visibility：hidden，后者会保留原有的空间位置

其他display值，如inline-block，flex

## 4. 清除浮动

同级：可以在浮动元素后面的元素（或设置一个空元素），使用CSS的clean: left || right || both属性清除

父级：

+ 通过设置伪元素::after，使用CSS的clean属性，同上设置
+ 激活父级的BFC(块级格式化范围)

BFC:

它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。

float的值不为none。

overflow的值不为visible。

display的值为table-cell, table-caption, inline-block中的任何一个。

position的值不为relative和static。

## 5. 实现Ajax的过程

+ 新建一个xhr（XMLHTTPRequest）对象（注意老ie，ie6需要采取兼容方式）

+ 调用对象的 xhr.open 方法来开启Ajax连接，其中open(way, url, opt)方法有两个必须参数（参数1：http的方法，一般是 get 和 post，不区分大小写；参数2：目标url），一个可选系数（是否异步，true表示异步，false表示同步。。。不过现在一般都是异步啦）。

+ 如果使用 get 方法连接，有需要传输的数据则使用 encodeURIComponent 方法  编码之后用 = & ？ 加在 url 最后面；有请求头则需要使用 xhr.setRequestHeader 方法设置请求头(其中post方法需要设置设置请求头来告诉对方传输主体的 MIME 类型)，如果想要模拟表单的提交，需要设置这样的请求头：xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")。

+ 一般 open 方法的最后一个参数会设置成true，使用异步模式，这时候就得设置监听xhr.onreadystatechange，然后执行异步回调函数，然而，这个监听在readyState这个属性改变时都会触发，0：open()未调用，1：open()已调用，2：接收响应头，3：接收响应主体，4：响应完成，所以需要加条件判断 xhr.readyState == 4 && xhr.status == 200。

+ 调用对象的 send 方法来发送数据，send方法发送请求主体，使用get则可以send()或者send(null)

## 6. 取消a链接的默认跳转行为

+ 设置href="###"，这么设置既可以达到空链接效果，又可以防止与锚冲突，在事件中返回false
+ 设置href="javascript:void(0)"，但这样不好，个人觉得不符合web标准

## 7. 水平垂直居中

1、传统的方法：

+ 水平居中：块级元素固定宽度，可以通过设置margin-left和margin-right为auto，行内元素则可在父级元素上设置text-align: center；
+ 垂直居中：对于单行的行内元素，父级元素高度固定时，可以设置line-height设置成与父元素高度相等（最近在实习的时候发现我的手机需要多2px才能居中），块级元素可以利用::after, ::before伪元素设置inline-block，高度100%，然后一起vertical-align: middle。

2、CSS3的新的可伸缩框属性（Flexible Box）

方便布局！！！！但是兼容性。。。

display: box;

display: -moz-box;

display: -webkit-box;

+ 规定如何对齐框的子元素(垂直方向上，可选值start，end，center，baseline)

-webkit-box-align: center;

-moz-box-align: center;

box-align: center;

+ 规定子元素以什么方向排列

box-direction: normal | reverse | inherit;

+ 规定子元素是否可伸缩（在子元素上设置）

可伸缩元素能够随着框的缩小或扩大而缩小或放大。

box-flex: value（比例系数）

+ 规定水平框中的水平位置或垂直框中的垂直位置

box-pack: start | end | center | justify(最后一个值指的是每个子元素分割剩余空间，除了第一个和最后一个子元素)

+ 还有其他属性，[看这里](http://www.w3school.com.cn/cssref/pr_box-pack.asp)

## 8. JS 数据类型判断

可以用typeof区分出简单数据类型、function 和 其他高级数据类型

typeof 1;		// number

typeof 'str';		// string

typeof false;		// boolean

typeof a;		// undefined

typeof undefined;	// undefined

typeof null;		// object

typeof function() {};		// function

至于array 和 其他对象，可以通过instanceof 或者constructor来判断

（知心姐姐之前说过一些坑，回头补）

## 9. 事件模型

支持两种事件模型：捕获型事件 以及 冒泡型事件

+ 捕获型事件：事件从最不精确的对象（document）开始触发，然后到最精确的目标
+ 冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标顺序触发

支持w3c标准的浏览器注册事件时使用addEventListener(event, fn, useCature)。其中第三个参数是Boolean值，用来设置事件是在捕获时执行还是在冒泡时执行。

可以参考我之前整理的事件模型总结：
[这里](http://fental.github.io/Fental/2015/04/17/js-event-spread.html)

## 10. IE和DOM事件绑定的区别

事件绑定有三种方式：

+ 直接在DOM对象的onXXX属性上设置，如ele.onclick = fn，默认冒泡绑定，且通过这种方式绑定只能一个事件，解绑则直接将该属性赋值为null即可
+ W3C标准：使用addEventListener方法绑定，可指定冒泡或捕获，可同时绑定多个事件，发生事件的顺序按照注册的顺序发生。解绑调用removeEventListener方法。同样有三个参数。
+ 不符合W3C标准的那些IE，使用attachEvent()方法，参数只有两个，只能注册冒泡事件，但能注册多个事件，执行顺序应该还是跟注册顺序一样。解绑调用detachEvent()

需要注意的一点是：

获取事件目标

var e = e || window.event;

var target = e.srcElement || e.target;

为什么要这么写呢，window.event 代表着事件对象的状态，只有在事件发生时生效，但这不是标准，只有在IE中才是这样（好像IE8及IE8之前都是这样）。至于W3C标准支持的浏览器事件对象是事件函数的第一个参数，参数名随意

## 11. JS动画

通过计时器，setInterval()，注意做动画时由于人眼对60帧的要求，所以要根据动画完成事件计算16ms的增量，当目标属性达到指定值则clearInterval()。

## 12. 计时器深入理解

js的计时器主要有setTimeout和setInterval，然而js是单线程，很多人都错误地以为计时器类似线程。其实他们都是设置了再一段时间后异步回调函数，异步回调的函数会挂起放在事件队列中，但是得等到执行线程空闲才会去执行回调函数。

setInterval存在时间间隔或许会跳过的问题。（不是特别了解）

## 13. 获取元素的页面坐标

提到坐标就需要讲到两个坐标系：视口坐标和文档坐标，元素的位置是以像素来度量，向右代表X坐标增加，向下代表Y坐标增加。

+ 视口：实际显示文档内容的浏览器的一部分，不包括浏览器的菜单、工具条之类的
+ 文档坐标则比视口坐标更基础，不会随着滚动条的滚动而变化

这两个坐标可以互相转化：滚动条的偏移量。

so：问题来了，哪些坐标是可以获取的呢？

### 滚动条偏移量：

+ 除了 IE8 及更早的版本以外，其他浏览器都可用：window.pageXoffset和window.pageYoffset可以获得
+ 标准模式的 IE （或任何浏览器）：document.documentElement.scrollLeft和document.documentElement.scrollRight

### 视口尺寸：

+ 除了 IE8 及更早的版本以外，其他浏览器都可用：window.innerWidth和window.innerHeight可以获得
+ 标准模式的 IE （或任何浏览器）：document.documentElement.clientWidth和document.documentElement.clientHeight

### 视口坐标：

IE5 引入getBoundingClientRect()，在各浏览器中都已实现。

element.getBoundingClientRect() 返回一个有left、right、top、bottom的对象，有的浏览器返回的这个对象还包括width、height属性。

利用视口坐标和滚动条偏移量可以获得*文档坐标*

### 关于元素尺寸、位置和溢出的更多信息

offset系列、client系列以及scroll系列

对于那些对getBoundingClientRect方法不兼容的浏览器，可以使用offset系列和scroll系列来简单计算元素的文档坐标

+ offset系列：

offsetWidth、offsetHeight、offsetLeft、offsetTop、offsetParent

其中offsetWidth和offsetHeight返回的是屏幕尺寸，包括除外边距以外的尺寸

至于offsetLeft和offsetRight返回的是元素的x y坐标，对于很多元素，这些值是文档坐标，直接指向元素的位置。但是，对于定位元素的后代元素，他们的offsetLeft和offsetRight并不是相对文档的，而是相对父级元素，如果offsetParent == null，则这些属性都是文档坐标

<pre>
function getElementPosition(e) {
	var x = 0, y = 0;
	while(e != null) {
		x += e.offsetLeft;
		y += e.offsetTop;
		e = e.offsetParent;
	}
	return {x: x, y: y};
}
</pre>

+ client系列：

clientWidth、clientHeight、clientLeft、clientTop

clientWidht 和clientHeight和offset系列相对应的东西很类似，但是它们不包括边框。需要注意的是对于内联元素，这两个值返回的都是0

clientLeft、clientTop返回元素内边距与外边缘之间的距离，大部分时候等于左边框和上边框。（例外就是有时候有的浏览器将滚动条放置在左边或上边时，这两个值会算上滚动条）

+ scroll系列：

scrollWidth、scrollHeight、scrollLeft、scrollTop

scrollWidth和scrollHeight是元素的内容区域加上内边距加上任何溢出内容的尺寸

scrollLeft和scrollTop返回滚动条偏移量

利用offset系列和scroll系列求视口坐标

<pre>
function getElementPos(elt) {
	var x = 0, y = 0;
	
	// 累计偏移量
	for (var e = elt; e !=null ; e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop; 
	}
	
	// 循环减去滚动偏移量
	for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
		x -= e.scrollLeft;
		y -= e.scrollTop;
	}
	
	return {x: x, y: y};
}
</pre>

## 14. JSONP相关知识

没接触过

## 15. HTTP状态码

常见302、304、403、404、500、503

302：重定向；304：未修改；403：禁止，权限错误；404：未找到资源；500：服务器错误；503：服务器忙

## 16. 块级元素以及内联元素的区别

## 17. 项目

## 18. png24 png8

1. png8和png24的根本区别，不是颜色位的区别，而是存储方式不同。
2. png8有1位的布尔透明通道（要么完全透明，要么完全不透明），png24则有8位（256阶）的布尔透明通道（所谓半透明）。
png-8 和 gif 有一些相似之处，模式都是索引颜色，只支持像素级的纯透明，不支持 alpha 透明。
我们通常说的“IE6 不支持 PNG 透明”，是指不支持 PNG-24 的透明。但是 IE6 支持 PNG-8 的透明，就像支持 gif 的透明一样。

## 19. 盒模型

CSS认为，每个元素都包含在一个盒子中，这整个盒模型由内容、内边距、边框、外边距构成。

主要存在的问题就是width和height的计算，默认盒模型中，width是指content的宽度，不包括padding和border，而有的IE的width貌似会包含padding。

所以为了解决这一问题，应该使用box-sizing: border-box，则width包括content，padding和border

## 20. 定位方式

position: static | relative | absolute | fixed

+ absolute：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。

+ fixed （老IE不支持）生成绝对定位的元素，相对于浏览器窗口进行定位。

+ relative 生成相对定位的元素，相对于其正常位置进行定位。和absolute的区别就在于它默认文档流的位置还占着

+ static  默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。

+ inherit 规定从父元素继承 position 属性的值。

## 21. CSS3新增的属性

边框：border-radius、border-shadow、text-shadow
字体：font-face
转换：translate scale rotate
动画：@keyframes 。。。。

## 22. CSS实现省略号

1. overflow: hidden;
2. white-space: nowrap;
3. text-overflow: ellipsis;

## 23. HTML5新增的内容

各种语义化标签，video等

## 24. this

this指针的指向取决于函数的调用模式

+ 方法调用，指向访问自己的对象
+ 函数调用，指向window对象，即使是内部函数。内部函数调用时，this被绑定到全局对象，可通过外部函数定义变量并赋值为this
+ 构造器调用：this绑定到创建的新对象
+ apply、call方法：指定this值

## 25. 作用域

JS变量的作用域：全局变量和局部变量，函数内部可以直接读取全局变量（反过来则涉及闭包）

ES5词法作用域，没有块级作用域，存在声明提前的现象。

提到作用域不得不提的是作用域链。任何执行上下文时刻的作用域，都是由作用域链（scope chain）实现。

在函数被定义时，会将定义时刻的scope chain链接到这个函数对象的[[scope]]属性（函数定义时，会创建一个这个函数对象的[[scope]]属性，内部属性，但fx得几个引擎提供私有属性__parent__来访问）

在函数被调用时，会创建一个活动对象，然后对于每个函数的形参，都命名为改活动对象的命名属性，然后将这个活动对象作为此时的作用域链最前端，并将这个函数对象的[[scope]]加入到scope chain中

标识符解析时候，你想查询当前scope chain列表的每个对象属性，如果找到同名就返回，找不到，那就是这个标示符没有被定义。

**[[scope]]属性是在定义一个函数的时候决定的，而非调用的时候**

## 26. 闭包

个人对闭包的理解：函数体内的变量保存在起作用域中，函数中父函数不会被GC（阮一峰），形成一个包。常用闭包的用途：构造模块，外部函数通过内部函数返回的函数操作内部函数变量，这些函数变量的值始终保存在内存中。

<pre>
function f1() {
    var n = 999;
    nAdd = function() { n += 1;};
    function f2() {
    	console.log(n);
    }
    return f2;
}

var result = f1();
result(); 	// 999
nAdd();
result();		// 1000
</pre>

f1是f2的父函数，f2被赋给一个全局变量，导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，呗垃圾回收机制（garbage collection）回收

注意一点，闭包内存消耗大。

## prototype && constructor

[最刺激的参考链接](http://www.cnblogs.com/wangfupeng1988/p/3977987.html)

JS中一切都是对象（属性的集合），**函数是一种对象，但是函数却不像数组一样——你可以说数组是对象的一种，因为数组就像是对象的一个子集一样。但是函数与对象之间，却不仅仅是一种包含和被包含的关系，函数和对象之间的关系比较复杂，甚至有一点鸡生蛋蛋生鸡的逻辑。**

对象是函数创建的，而函数却又是一种对象。怎么理解？借由prototype。

JS规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承，意味着可以把不变的属性和方法，直接定义在prototype对象上。

任何一个prototype对象都有一个constructor属性，指向它的构造函数。另外，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。

<img src="http://images.cnitblog.com/blog/138012/201409/172121182841896.png" />

<pre>
console.log(cat.constructor == Cat.prototype.constructor);	//true
</pre>

每个实例拥有一个\_\_proto__隐藏属性，指向构造函数prototype设置的原型

<pre>
console.log(cat.__proto__ == Cat.prototype);	//true
</pre>

obj这个对象本质上是被Object函数创建的，因此obj.__proto__=== Object.prototype。我们可以用一个图来表示。

<img src="http://images.cnitblog.com/blog/138012/201409/181509180812624.png" />

那么上图中的“Object prototype”也是一个对象，它的\_\_proto\_\_指向哪里？

好问题！

在说明“Object prototype”之前，先说一下自定义函数的prototype。自定义函数的prototype本质上就是和 var obj = {} 是一样的，都是被Object创建，所以它的\_\_proto\_\_指向的就是Object.prototype。

但是**Object.prototype确实一个特例——它的\_\_proto\_\_指向的是null，切记切记！**

\_\_proto\_\_的顶端为Object.prototype，Object.prototype的\_\_proto\_\_为空

<img src="http://images.cnitblog.com/blog/138012/201409/181510403153733.png" />

还有，函数也是对象，那其\_\_proto\_\_呢？

Function创建了函数

<pre>
function fn(x, y) {
	return x + y;
}
console.log(fn(10, 20));

// 等价于
var fn1 = new Function("x", "y", "return x + y;");
console.log(fn1(10, 20));
</pre>

所以就会出现Object.\_\_proto\_\_ == Function.prototype

<img src="http://images.cnitblog.com/blog/138012/201409/181512068463597.png" />

上图中，很明显的标出了：自定义函数Foo.\_\_proto\_\_指向Function.prototype，Object.\_\_proto\_\_指向Function.prototype，唉，怎么还有一个……Function.\_\_proto\_\_指向Function.prototype？这不成了循环引用了？

对！是一个环形结构。

其实稍微想一下就明白了。Function也是一个函数，函数是一种对象，也有\_\_proto\_\_属性。既然是函数，那么它一定是被Function创建。所以——Function是被自身创建的。所以它的\_\_proto\_\_指向了自身的Prototype。

**instanceof的规则**

instanceof运算符的第一个变量是一个对象a，第二个变量一般是一个函数A

instanceof判断规则：沿着a的\_\_proto\_\_这条线找，同时沿着A的prototype这条线找，如果这两条线能找到同一个引用，即同一个对象，就返回true，若找到终点还未重合，则返回false

完整的图

<img src="http://images.cnitblog.com/blog/138012/201409/181637013624694.png" />

**原型链**

javascript中的继承是通过原型链来体现的

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。


## 27. 创建对象的模式

## 28. localStorage 和 sessionStorage

区别在于存储的有效期和作用域不同。

localStorage存储的数据是永久性，除非web应用可以删除数据的数据之类的，作用域是限定在文档源中。文档源是通过协议、主机名以及端口三者来确定。

sessionStorage有效期与最顶层窗口或者浏览器标签页一样；作用域限定在文档源和窗口中。

## 29. 前端是怎样的一个体系

## 30. 继承

ES5 继承方式

+ 类式继承

<pre>
function A(name) {
	this.name = name;
}
A.prototype.test = function() {
}

// B继承A

function B(name, age) {
	// 将父对象的构造函数绑定在子对象中
	B.call(this, name);
	this.age = age;
}
B.prototype = new A();
// 导致继承链紊乱，手动纠正继承链
B.prototype.constructor = B;
B.prototype.test1 = function() {
}
</pre>

+ 原型式继承

<pre>
var A = {
	name: 'default name',
	getName: function() {
		return this.name
	}
};

// 不需要构造函数
var a = clone(A);
console.log(a.getName());
a.name = 'fental';
console.log(a.getName());

// 继承
var B = clone(A);
B.books = [];
B.getBooks = function() {
	return this.books;
};

// 实例化B
var b = clone(B);
b.name = 'fental';
b.books = ['fuck this name'];
console.log(b.getName());

// clone

function clone(object) {
	function F() {
	}
	F.prototype = object;
	
	return new F();
}
</pre>
