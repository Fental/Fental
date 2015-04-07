---
layout:post
title:我的博客——搭建过程
---

#我的博客——搭建过程

##为什么要在Github上搭建静态博客系统

1. 相较于CSDN等博客，我觉得Github的个人定制空间比较大。
2. 逼格...高

##博客成型

根据阮一峰前辈的博文[搭建一个免费的，无限流量的Blog----github ](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)搭建了一个最简单的blog。

##充实博客

在编写之前，为文章的模板（_layout目录下的html文件）增加样式和插件功能。需要注意的地方：样式表和js文件路径使用绝对路径会好些。（为什么呢？个人猜测就是jekyll在转换文章的时候，文章的实际存放路径有变动？查查资料先。）

+ 增加css样式，在模板文件中link一下:ghost：

{% highlight css %}
body{
    background-color: #cccccc;
    font-size: 100%;
    font-family: 宋体, Geneva, sans-serif;
}
body *{
    font-size: 1em;
}
.page{
    background-color: white;
    max-width:60em;
    padding: 1.253em .625em;
    margin:1em auto;
    border-radius: 1em;
    box-shadow: .25em .25em #595959;
}
h1{
    font-size: 1.875em;
}
h2{
    font-size: 1.5em;
}

blockquote{
    background-color: #cccccc;
    padding: .625em;
    border-left: solid .25em #595959;
}
pre{
    background-color: #cccccc;
    border:.125em dashed #595959;
    padding: .625em;
}
img.emoji {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: top;
}
{% endhighlight %}

+ 增加插件功能：评论（[disqus](https://disqus.com/)）、[emoji表情](https://github.com/hassankhan/emojify.js)、代码高亮（[pygments](https://github.com/hugomaiavieira/pygments-style-github)）(具体操作见下篇博文。)

##编写博客

进入_posts目录，创建文章。

> 文章就是普通的文本文件，文件名假定为2012-08-25-hello-world.html。（**注意，文件名必须为“年-月-日-文章标题.后缀名”的格式**。如果网页代码采用html格式，后缀名为html；如果采用[mardown](http://daringfireball.net/projects/markdown/)格式，后缀名为md。）

	---
	layout: default
	title: 你好，世界
	---
	<h2>{{ page.title }}</h2>
	<p>我的第一篇文章</p>
	<p>{{ page.date | date_to_string }}</p>


>每篇文章的头部，必须有一个yaml文件头，用来设置一些元数
据。它用三根短划线"---"，标记开始和结束，里面每一行设置一种元数据。"layout:default"，表示该文章的模板使用\_layouts目录下的default.html文件；"title: 你好，世界"，表示该文章的标题是"你好，世界"，如果不设置这个值，默认使用嵌入文件名的标题，即"hello world"。
在yaml文件头后面，就是文章的正式内容，里面可以使用模板变量。{{ page.title }}就是文件头中设置的"你好，世界"，{{ page.date }}则是嵌入文件名的日期（也可以在文件头重新定义date变量），"| date_to_string"表示将page.date变量转化成人类可读的格式。

我使用markdownpad2编写博客，=。=

##上传博文

熟悉几个git操作：

+ git add -A
+ git commit -m "update message"
+ git push origin gh-pages

