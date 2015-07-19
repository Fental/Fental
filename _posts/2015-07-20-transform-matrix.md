---
layout: post
title: CSS3 transform中matrix的使用
---

# CSS3 transform中matrix的使用

[参考链接](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)

## 1. transform几个属性：

+ transform: skew(35deg);		// 斜拉
+ transform: scale(1, 0.5);	// 缩放
+ transform: rotate(45deg);	// 旋转
+ transform: translate(10px, 20px);		// 位移

应用matrix实现

## 2. transform与坐标系统

transform默认是绕着中心点旋转的，由transform-origin属性控制

<img src="http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix2.png">

+ transform-origin: bottom left;
+ transform-origin: 50px 70px;

## 3. CSS3的transform的matrix()

### 3.1 2Dmatrix

<pre>
transform: matrix(a, b, c, d, e, f);
</pre>

对应矩阵：

<img src="http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix3.gif">

初始坐标：(x, y)，转换公式：

<img src="http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix5.gif">

#### 3.1.1 偏移

<pre>
transform: matrix(a, b, c, d, 水平偏移位置, 垂直偏移位置);
</pre>

#### 3.1.2 旋转

<pre>
transform: matrix(cosθ, sinθ, -sinθ, cosθ, 0, 0);	// 记忆方法：初三-上床
// 直接用rotate更简便，不用算角度的正弦余弦。transform: rotate(45deg);
</pre>

#### 3.1.3 拉伸

拉伸也用到三角函数，不过是tanθ，与b, c两个参数相关，注意y轴倾斜角度在前：

<pre>
transform: matrix(1, tan(θy), tan(θx), 1, 0, 0);
// 对应于 transform: skew(θx + "deg", θy + "deg");
</pre>

### 3.2 matrix的作用

普通的场景，transform属性默认提供的方法足够，但像“镜像对称效果”transform属性并没有提供接口方法。

matrix矩阵式transform变换的基础，可以应付很多高端的效果。

利用矩阵公式，以及高中数学=。=，知道(x, y)，求(x', y')坐标

x' = ax+cy+e;
y' = bx+dy+f;

<img src="http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix-mirror.png">

上图求(x', y')坐标的思路是中点在直线上，求中点坐标，代入直线，变换形式。即可求得a-f等参数

### 3.3 3Dmatrix

对应矩阵：

<img src="http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix8.gif">

<pre>
transform: matrix3d(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
</pre>

matrix3d有待继续学习


