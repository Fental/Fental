---
layout: post
title: js模块化编程（二）：amd规范
---
#js模块化编程（二）：amd规范

规范地使用模块

##模块的规范

有了模块，方便使用别人的代码，想要什么功能就加载什么模块。

**前提：以同样的方式编写模块。**

> 通行的js模块规范共有两种：CommonJS和AMD

##CommonJS

[node.js](http://nodejs.org/)项目标志着js模块化编程正式诞生。node.js的模块系统参照CommonJS规范实现。

CommonJS中，有个全局方法require()，用于加载模块。假定有模块math.js，加载：

	var math = require('math');

调用模块提供的方法。

	var math = require('math');
	math.add(2,3);//5

针对浏览器编程，对CommonJS不多介绍，这里只要知道require()用于加载模块。

##浏览器环境(AMD规范诞生的背景)

由于重大局限，CommonJS规范不适用于浏览器环境。上一节的代码如果在浏览器中运行，有一个问题：第二行在第一行之后运行，因此必须等math.js加载完。因此浏览器端的模块，不能“同步加载”，只能采用“异步加载”。

##AMD（Asynchronous Moudule Definition）

异步模块定义。采用异步方式加载模块，不影响后面语句的运行。所有依赖这个模块的语句，都定义在回调函数，模块加载完成后，这个回调函数才会运行。

AMD也采用require（）语句加载模块，但不同于CommonJS，要求两个参数：

	require([module],callback);

第一个参数为加载的模块数组，第二个参数callback则是加载成功之后的回调函数。

	require(['math'],function(math){
		math.add(2,3);
	});

math.add()与math模块加载不是同步，浏览器不会发生假死

主要有两个js库实现了amd规范：[require.js](http://requirejs.org/)和[curl.js](https://github.com/cujojs/curl)。


