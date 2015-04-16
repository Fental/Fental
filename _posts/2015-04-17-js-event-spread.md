#js的事件冒泡和捕获

1. 冒泡型事件：时间按照从最特定的事件目标到最不特定的事件目标（document）的顺序触发
2. 捕获型事件：事件从最不精确的对象（document）开始触发，然后到最精确（可以在窗口级别捕获事件，不过必须由开发人员特别指定）。
3. DOM事件流同时支持两种事件模型：捕获型事件和冒泡型事件。捕获型事件先发生。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。

支持w3c标准的浏览器再添加事件时用addEventListener(event, fn, useCature)方法，第三个参数是Boolean值，用来设置事件是在事件捕获时执行，还是在事件冒泡时执行。

不兼容W3C标准的浏览器（IE）用attachEvent()方法，此方法没有相关设置，默认在事件冒泡时执行。

所以，在处理事件时把useCapture设置为false比较安全，也实现兼容浏览器的效果。

传统的绑定事件方式：

{% highlight js %}
ele.onclick = doSomething2;
{% endhighlight %}

采用事件冒泡方式。
下面例子执行结果//12453

{% highlight js %}
var handler = function() {
    var e = e || window.event;
    console.log(e.srcElement.id || e.target.id);
//        alert('fuck');
};
var handler1 = function() {
    console.log("1");
};
var handler2 = function() {
    console.log("2");
};
var handler3 = function() {
    console.log("3");
};
var handler4 = function() {
    console.log("4");
};
var handler5 = function() {
    console.log("5");
};

var a = document.getElementById("a");
//    console.log(a.addEventListener);
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var e = document.getElementById("e");
var f = document.getElementById("f");
//    a.addEventListener("click", handler, false);
a.addEventListener("click", handler1, true);
//    b.addEventListener("click", handler, false);
b.addEventListener("click", handler2, true);
c.addEventListener("click", handler3, false);
//    c.addEventListener("click", handler, true);
//    d.addEventListener("click", handler, false);
d.addEventListener("click", handler4, true);
e.addEventListener("click", handler5, true);
//    f.addEventListener("click", handler, true);
//    document.body.addEventListener("click", handler, true);

{% endhighlight %}

事件的传播是可以阻止的。

1. w3c中，使用stopPropagation()方法
2. IE下设置cancelBubble = true;

在捕获的过程中，stopPropagation();后，后面的冒泡过程也不会发生

阻止事件的默认行为，例如click a 后跳转

1. w3c中，使用preventDefault()方法，IE中设置
2. window.event.returnValue = false;

不是所有事件都能冒泡。例如，blur focus load unload