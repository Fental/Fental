---
layout: post
title: 解决之前存在的一些疑惑
---

# 解决之前存在的一些疑惑

其实这些东西会是疑惑主要是老是懒得查。

## 疑惑一 Object.prototype.toString

Object.prototype.toString老是要通过call来调用（http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html）主要原因应该是typeof和instanceof比较不可靠，Object.prototype.toString可靠的地方就在于它的原理。

### ES3 

ES3的Object.prototype.toString()方法规范如下：

[[Class]]内部属性，所有对象（原生对象：JS语言自带的对象和宿主对象：运行环境决定）都拥有这个属性。

>[[Class]]：一个字符串值，表明了该对象的类型

>所有内置对象的[[Class]]属性的值由规范定义，所有宿主对象的[[Class]]属性的值可以是任何值，甚至可以是内置对象使用过的[[Class]]属性的值。[[Class]]属性的值可以用来判断一个原生对象属于哪种内置类型。

>**除了通过Object.prototype.toString方法之外，本规范没有提供任何其他方式来让程序访问该属性的值。**

Object.prototype.toString()规范如下：

+ 被调用时获取this对象的[[Class]]属性的值
+ 计算出三个字符串"[object "，第一步的操作结果Result(1)，以及"]"连接后的新字符串
+ 返回第二步的操作结果Result(2)

在ES3阶段，[[class]]内部属性经过统计，原生对象的这个内部属性一共有10中：

Array, Boolean, Date, Error, Function, Math, Number, Object, RegExp, String

### ES5

ES5的规范变得更加详细，[[class]]内部属性定义上也有些变化。

>[[Class]]：所有宿主对象的[[Class]]属性的值可以是除了Arguments, Array, Boolean, Date, Error, Function, Object, JSON, Math, Number, String, RegExp之外的任何字符串。[[Class]]内部属性是引擎内部用来判断一个对象属于哪种类型的值。

Object.prototype.toString()规范如下：

+ this为undefined时，返回"[object Undefined]"
+ this为null时，返回"[object Null]"
+ 获取this内部属性[[Class]]的值
+ 返回字符串"[object" + [[Class]] + "]"

### ES6

[[Class]]内部属性好像要被取消的样纸。。11年的文章，待考核（自己在最新内容获取的能力上有待提升。）

[参考链接](http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html)

## 疑惑二 typeof

不遵守规范导致一门语言如此令人诟病。。。

[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

 
## 疑惑三 关于变量赋值，引用之类的问题

对象间赋值为引用赋值，简单类型赋值则是直接赋值。。。（不知道自己在疑惑什么= =||）

```
var a = {
    "a": {
        "aa": 2
    }
};
var b = a.a;
b.aa = 3;
console.log(a.a.aa);	// 3

var a = {
    "a": {
        "aa": 2
    }
};
var b = a.a.aa;
b = 3;
console.log(a.a.aa);	// 2
```

所以这里有个问题来了，怎么clone对象。递归！！

```
// 来裸写段代码

/**
 * clone
 * @param {Object} obj 要克隆的对象
 * @return {Object} clone后的对象
 */
function clone(obj) {
    // undefine && null && 简单类型
    if (obj === undefined
        || obj === null
        || typeof obj === 'number'
        || typeof obj === 'string'
        || typeof obj === 'boolean') {
        return obj;
    }

    var result = {};

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            result[i] = clone(obj[i]);
        }
    }
    return result;
}
```

## 疑惑四 浏览器输入url的一系列行为

之前疑惑的地方就是，单线程却怎么并行请求资源。

简直傻逼了。。。

在解析html文件之后，就对静态资源进行请求，这个请求是并发的。但也不是无限并发，会受到一定的限制：

+ 对同一域名的资源，同时请求数有限，所以存在将内容分发到各个域名的技术
+ 浏览器本身可开启的线程数

在获取了资源之后，浏览器使用自己的规则，对html文档和资源进行渲染。


