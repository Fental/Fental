#js模块化编程（三）：require.js的用法

实战，使用库require.js

##为什么使用require.js

加载多个js文件

	<script src="1.js"></script>
	<script src="2.js"></script>
	<script src="3.js"></script>
	...

浏览器加载js时停止网页渲染，加载越多，网页失去响应时间越长。
js文件存在依赖性，必须严格保证加载顺序（保留看法：现在不是并行加载js？）

require.js诞生，解决两个问题：

1. js文件异步加载，避免网页失去响应
2. 管理模块之间依赖性，便于代码编写和维护

##require.js的加载

[官网下载](http://requirejs.org/docs/download.html)最新版本，下载后加载这个文件。加载这个文件也可能造成网页失去响应，解决办法，一个是把他放到网页底部加载，另一个写成：

	<script src="js/require.js" defer async="true"></script>

async属性表名这个文件需异步加载，避免网页失去响应。IE不支持，只支持defer，所以把defer也写上。

加载require.js以后，下一步加载自己的代码。假定自己的代码是main.js，也放在js目录下。那么：

	<script src="js/require.js" data-main="js/main"></script>

data-main属性作用是，指定网页程序的主模块。在上例中，js目录下的main.js，这个文件会第一个被require.js加载。由于require.js默认文件后缀名是js，所以可以把main.js简写成main

##主模块的写法

主模块：整个网页的入口代码，所有代码都从这儿开始运行。如果代码不依赖任何其他模块，那么可以直接写入js代码。但这样的话就没必要使用require.js。

常见的情况是，主模块依赖于其他模块，这时就要使用amd规范定义的require()函数

	//main.js

	require(['moduleA','moduleB','moduleC'],function(mouduleA,moduleB,moduleC){
	
		//some code
	});

require()接受两个参数。第一个参数是数组，表示所依赖的模块，上例就是['mouduleA','mouduleB','mouduleC'],即主模块依赖这三个模块；第二个参数是一个回调函数，当前面所制定的模块都加载成功后，将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require()异步加载mouduleA，mouduleB，moduleC，浏览器不会失去响应，指定的回调函数只有前面模块都加载完成，才会运行，解决依赖性问题

实例：假定主模块依赖jquery、underscore和backbone这三个模块，main.js就可以这样写：

	require(['jquery','underscore','backbone']),function($,_,Bcakbone){
		//some code
	});

require.js会先加载jQuery、underscore和backbon，然后再运行回调函数。主模块的代码就写在回调函数中。

##模块的加载

上面那个例子中，主模块的依赖模块是['jquery','underscore','backbone']。默认情况，require.js假定这三个模块与main.js在同一个目录，文件名分别为jquery.js,underscore.js,backbone.js，然后自动加载

使用require.config()方法，可以对模块的加载行为进行自定义。

	require.config({
		paths:{
			"jquery":"jquery.min",
			"underscore":"underscore.min",
			"backbone":"backbone.min"
		}
	});

上面代码给出了三个模块的文件名，路径默认与main.js在一个目录，如果这些模块在其他目录，比如js/lib，则两种写法。

	require.config({
		paths:{
			"jquery":"lib/jquery.min",
			"underscore":"lib/underscore.min",
			"backbone":"lib/backbone.min"
		}
	});

直接改变基目录（baseUrl）

	require.config({
		baseUrl:"js/lib",
		
		paths:{
			"jquery":"jquery.min",
			"underscore":"underscore.min",
			"backbone":"backbone.min"
		}
	});

如果模块在另一台主机上，也可以直接指定它的网址，比如：

	require.config({
		paths:{
			"jquery":"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
		}
	});

require.js要求，每个模块是一个单独的js文件。但是如果加载多个模块，就会发出多次http请求，会影响网页的加载速度。因此，require.js提供了一个[优化工具](http://requirejs.org/docs/optimization.html)，模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少http请求

##amd模块的写法

require.js加载的模块，采用amd规范。也就是说，模块必须按照amd的规定来写。

具体来说：模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。

假定现有math.js文件，定义了math模块。main.js要这样写：

	//math.js
	define(function(){
		var add=function(x,y){
			return x+y;
		};
		return {
			add:add
		};
	});

加载方法如下：

	//main.js
	require(['math'],function(math){
		alert(math.add(1,1));
	});

如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明模块的依赖性。

	define(['myLib'],function(myLib){
		function foo(){
			myLib.doSomething();
		}
		return {
			foo:foo
		};
	});

require()函数加载上面这个模块的时候，会先加载myLib.js文件

##加载非规范模块

理论上，require.js加载的模块，必须按amd规范、用define()函数定义的模块。但require.js也可以加载非规范的模块。

这样的模块在用require()加载之前，要先用require.config()方法，定义特征。

举例：underscore和backbone两个库，没有采用amd规范来编写。加载的话，必须定义：

	require.config({
		shim:{
			'underscore':{
				exports:'_'
			},
			'backbone':{
				deps:['underscore','jquery'],
				exports:'Backbone'
			}
		}
	});

require.config()接受一个配置对象，这个对象除了paths属性之外，还有一个shim属性，专门用来配置不兼容模块。

具体来说，每个模块要定义

1. exports值（输出变量名），表明模块外部调用名称
2. deps数组，表名该模块的依赖性

比如jQuery插件可以这样定义。

	require.config({
		shim:{
			'jquery.scroll':{
				deps:['jquery'],
				exports:'jQuery.fn.scroll'
			}
		}
	});

##[require.js插件](https://github.com/jrburke/requirejs/wiki/Plugins)

提供一系列插件，实现一些特定功能

domready插件，可以让回调函数在页面dom结构加载完成后再运行。

	require(['domready!'],function(doc){
		//called once the dom is ready
	});

text和image插件，允许require.js加载文本和图片文件。

	define(['text!review.txt','image!cat.jpg'],function(review,cat){
		console.log(review);
		document.body.appendChild(cat);
	});

类似插件还有json和mdown，用于加载json文件和markdown文件。

#参考链接

[Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)