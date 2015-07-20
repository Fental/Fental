---
layout: post
title: CSS3 3D transform变换
---

# CSS3 3D transform变换

[参考链接](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

## 1. 3D坐标：

<img src="http://image.zhangxinxu.com/image/blog/201209/3d_axes.png">

## 2. 理解三维坐标的突破口：

3Dtransform有下面三个方法：

+ rotateX(angle)		// 旋转X轴
+ rotateY(angle)		// 旋转Y轴
+ rotateZ(angle)		// 旋转Z轴

对应效果：

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_175406.png">

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_175458.png">

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_175551.png">

## 3. perspective属性（透视、视角）

perspective属性的存在与否决定了所看到的变换是2D的还是3D的。

CSS3 3D transform的透视点在浏览器前方。

	比方说，一个1680像素宽的显示器中有张美女图片，应用了3D transform，同时，该元素或该元素父辈元素设置的perspective大小为2000像素。则这张美女多呈现的3D效果就跟你本人在1.2个显示器宽度的地方(1680*1.2≈2000)看到的真实效果一致！！
	
<img src="http://image.zhangxinxu.com/image/blog/201209/3d-distance.jpg">

## 4. 寻找透视位置：

近大远小，translateZ改变元素在Z轴的位置。如果设置元素的perspective为200像素。

<pre>
perspective: 200px;
</pre>

其子元素，设置的translateZ值越小，则子元素大小越小（元素远去）；translateZ值越大，子元素会越来越大。注意translateZ的值非常接近200px时，子元素会撑满整个屏幕（如果父元素没有设置类似overflow: hidden;）。

	因为这个时候，子元素正好移到了你的眼睛前面，所谓“一叶蔽目，不见泰山”
	
translateZ超过200px时，子元素不见了，道理也很简单，元素移到了眼睛后面。。。。

## 5. perspective的两种书写

+ 用在舞台元素上（动画元素们的共同父辈元素）
+ 用在当前动画元素上，与transform的其他属性写在一起。

<pre>
.stage {
	perspective: 200px;
}

/*以及*/

.stage .box {
	transform: perspective(200px) rotate(45deg);
}
</pre>

[demo](http://www.zhangxinxu.com/study/201209/transform-perspective-two-write-style.html)

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_222328.png">

表面上看起来好像两种书写形式没什么区别，其实不然。上面的demo上下两个效果之所以会一样，是因为舞台上只有一个元素，如果舞台上有很多个元素，两种写法的差异立马显现。

[demo2](http://www.zhangxinxu.com/study/201209/transform-perspective-same-rotate.html)

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_222911.png">

解释：上面舞台整个作为透视元素，看到的每个子元素的形体都是不一样；下面每个元素都有自己的视点，rotateY的角度一样，因此，看上去的效果一模一样。。

### 5.1 chrome浏览器 以及 透视盲区

#### 5.1.1 chrome浏览器

chrome浏览器中，想看到完整地3D效果，需要3D变换元素正好在窗体的垂直居中位置。（但现在好像不用的样子，我的chrome版本版本 43.0.2357.13）

#### 5.1.2 透视盲区

特定的视角以及距离形成视觉盲区

<img src="http://image.zhangxinxu.com/image/blog/201209/2012-09-05_224822.png">

## 6. 透视原点perspective-origin

眼睛看的位置，默认舞台或元素的中心。如果我们对中心位置不感兴趣，可使用perspective-origin属性将视线放在其他地方。比如：

<img src="http://image.zhangxinxu.com/image/blog/201209/what-are-u-looking.png">

实际效果图：

perspective-origin: 25% 75%;

<img src="http://image.zhangxinxu.com/image/blog/201209/perspective02.png">

## 7. transform-style属性

transform-style属性是3D空间一个重要属性，指定嵌套元素如何在3D空间中呈现。主要有两个属性值：flat | preserve-3d

<pre>
transform-style: flat | preserve-3d;
</pre>

其中flat值为默认值，表示所有子元素在2D平面呈现。preserve-3d表示所有子元素在3D空间中呈现。

如果对一个元素设置了transform-style的值为flat，则该元素的所有子元素都将被平展到该元素的2D平面中进行呈现。沿着X轴或Y轴方向旋转改元素将导致位于正或负Z轴位置的子元素显示在该元素的平面上，而不是它的前面或者后面。如果设置了transform-style: preserve-3d表示不执行平展操作，所有子元素位于3D空间中

transform-style属性需要设置在父元素中，并且高于任何嵌套的变形元素。

注意父元素的overflow: hidden有时候会迫使子元素表现出flat的效果。

[参考链接](http://www.w3cplus.com/css3/transform-basic-property.html)

## 8. backface-visibility

=。= 鑫空间的解释貌似有点问题。。。

backface-visibility 属性定义当元素不面向屏幕时是否可见。如果在旋转元素不希望看到其背面时，该属性很有用。默认值visible。

<pre>
backface-visibility: visible | hidden;
</pre>

visible：背面是可见的；hidden：背面是不可见的

## 9. 实践-旋转木马

[demo](http://www.zhangxinxu.com/study/201209/pictures-3d-slide-view.html)