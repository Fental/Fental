---
layout: post
title: line-height
---
#2015-04-18 的收获

##深入理解css的行高line-height属性

行间距：用来控制行与行垂直距离。

如何使用？

默认状态，浏览器使用1.0-1.2 line-height，可定义该属性覆盖初始值。

	p {
		line-height: 140%;
	}

###5种方式定义：
	
	1. body {line-height: normal;}
	2. body {line-height: inherit;}
	3. body {line-height: 120%;}
	4. body {line-height: 25px;}	/*单位可以是px, em等*/
	5. body {line-height: 1.2;}

###缩写line-height

line-height写法可在font属性中缩写。line-height的值紧跟font-size值，使用斜杠分开。

	body {font: 100%/normal arial, SimSun, sans-serif;}
	body {font: 100%/120% arial, SimSun, sans-serif;}
	...

###计算line-height

line-height可继承，但line-height的继承有点复杂

####1. 百分比

	body {
		font-size: 16px;
		line-height: 120%;
	}
	h1 {
		font-size:32px;
	}
	p {
		font-size: 16px;
	}
	#footer {
		font-size: 12px;
	}

line-height 的百分比和body的文字大小被用来计算line-height的值：16\*120%=19.2px，这个计算出来的值会被层叠下去的元素所继承，继承下来的元素会忽略本身的font-size，使用**相同的计算出来的line-height**

elememt|font-size|line-height	|计算后的line-height
-------|---------|--------------|------------------
body   |16px	 |120%		 	|16px*120px=19.2px
h1	   |32px     |继承，19.2px	|19.2px	
p	   |16px     |继承，19.2px	|19.2px	
\#footer|12px     |继承，19.2px	 |19.2px	

line-height不会随着相关的font-size做相应的比例缩放

####2. 长度

	...
	line-height: 20px;
	...

长度值20px被后代元素继承，所有继承下来的元素会忽略本身的font-size，而使用相同的，继承的line-height

elememt|font-size|line-height	|计算后的line-height
-------|---------|--------------|------------------
body   |16px	 |20px		 	|20px
h1	   |32px     |继承，20px		|20px	
p	   |16px     |继承，20px		|20px	
\#footer|12px     |继承，20px	 |20px	

line-height依然不会苏浙相关的font-size做相应的比例缩放

####3. normal

	...
	line-height: normal;	/*约为1.2*/
	...

现在所有继承下来的元素**不会**忽略本身font-size，使用基于font-size算出来的line-height

elememt|font-size|line-height	|计算后的line-height
-------|---------|--------------|------------------
body   |16px	 |normal	 	|16\*1.2
h1	   |32px     |normal		|32\*1.2	
p	   |16px     |normal		|16\*1.2	
\#footer|12px     |normal	 	|12\*1.2	

既想normal的灵活，又想要设置一个自定义的值，可使用纯数字

####4. 纯数字

	...
	line-height: 1.5;
	...

现在所有继承下来的元素使用基于font-size算出来的line-height

elememt|font-size|line-height	|计算后的line-height
-------|---------|--------------|------------------
body   |16px	 |1.5		 	|16\*1.5
h1	   |32px     |1.5			|32\*1.5	
p	   |16px     |1.5			|16\*1.5	
\#footer|12px     |1.5		 	|12\*1.5

###小总结

一般，设置行高为纯数字是比较理想的方式，因为其会随着对应font-size缩放。在多种情况下很难确定完美的line-height。

万维网内容可取性指南规定：

> 段落中的行距至少要1.5倍

###深入line-height

####1. 了解css boxes的各种类型

	<p>
		the <em>emphasis</em> element is defined as "inline"
	</p>

上述例子涉及四种boxes

#####1.1 containing box(包含其他boxes)

![cotaining box](http://fental.github.io/Fental/images/post/containing-box.png)

#####1.2 inline box(不会让内容显示成块形式，二是排成一排)

![inline box](http://fental.github.io/Fental/images/post/inline-box.png)

em元素就是一种inline box，其他没有特别标签的box被称为匿名inline boxes

#####1.3 line box(inline boxes在containing box里一个接一个组成line boxes)

![line-box](http://fental.github.io/Fental/images/post/line-box.png)

#####1.4 content area(围绕着文字的看不见的一种box,高度取决于font-size)

![content-area](http://fental.github.io/Fental/images/post/content-area.png)

####2. 简单原则

#####2.1 line-height和font-size的差别

![line-height-font-size](http://fental.github.io/Fental/images/post/line-height-font-size.png)

#####2.2 拆分行间距，创建一个“半行间距”

	4px行间距 / 2 = 2px半行间距

#####2.3 半行间距会被应用在content area的顶部和底部

![half-line-height](http://fental.github.io/Fental/images/post/half-line-height.png)

####3. 有时候有点复杂

inline box包裹着content box，半行间距位于content box的上部和下部

#####3.1 若inline box小于content area

举例来说，如果line-height小于font-size，inline box会优先于行高

	例如：font-size: 16px;
		line-height: 16px;/*inline box 高度12px*/

content area会溢出inline box的顶部和底部，半行高会折叠起来以保证inline box的高度。

![special](http://fental.github.io/Fental/images/post/special.png)

####4.line-box 高度注解

#####4.1 line box高度取决于内部最高的inline box（或被替换的元素）

![normal-line-box](http://fental.github.io/Fental/images/post/normal-line-box.png)

#####4.2 最高的inline box 可以是匿名inline box，也可以是增加line-height后的inline box

![line-box-with-line-height](http://fental.github.io/Fental/images/post/line-box-with-line-height.png)

#####4.3 还可以是更大font-size的inline box

![line-box-with-font-size](http://fental.github.io/Fental/images/post/line-box-with-font-size.png)

#####4.4 存在上标或下标

![line-box-with-label](http://fental.github.io/Fental/images/post/line-box-with-label.png)

#####4.5 存在替换元素，例如一张图

![line-box-instead-ele](http://fental.github.io/Fental/images/post/line-box-instead-ele.png)

##参考链接

[深入了解css的行高Line Height属性](http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html)