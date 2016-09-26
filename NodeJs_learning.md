## Node.js 学习 9/11/2016 5:45:15 PM 

[http://www.runoob.com/nodejs/nodejs-npm.html](http://www.runoob.com/nodejs/nodejs-npm.html)

### Node.js 创建第一个应用

如果我们使用PHP来编写后端的代码时，需要Apache或者Nginx的HTTP服务器，并配上mod_php5模块和php_cgi。

从这个角度看，整个“接受HTTP请求并提供Web页面”的需求根本不需要PHP来处理。

Node.js不仅仅使用一个应用，同时还实现了整个HTTP服务器。

在我们创建Node.js第一个“Hello,World！”应用前，分为几个部分。

1. 引入required模块：我们可以使用require指令来载入Node.js模块。
2. 创建服务器：服务器可以监听客户端的请求，类似Apache、Nqinx等Http服务器。
3. 接受请求与相应请求：服务器很容易创建，客户端可以使用浏览器或终端发送Http请求，服务器接受请求后返回响应数据。

### NPM介绍

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的问题，常见的使用场景有以下几种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

由于新版的nodejs已经集成了npm，所以之前npm也一并安装好了。

### 使用package.json

package.json 位于模块的目录下，用于定义包的属性。接下来让我们来看下express包的package.json文件。

### 创建模块

创建模块，package.json文件是必不可少的。我们使用NPM生成package.json文件，生成的文件包含了基本的结果。

### Node.js REPL(交互式解释器)

Node.js REPL表示一个电脑的环境，类似Window系统的终端或Unix shell，我们可以再终端中输入命令，并接收系统的响应。

- 读取 读取用户输入，解析输入了JavaScript数据结构并存储在内存中。
- 执行 执行输入的数据结构。
- 打印 输出结果
- 循环 循环操作以上步骤知道用户两次按下 ctrl+c按钮退出

### 简单的表达式运算

<pre>
$ node
> 1 +4
5
> 5 / 2
2.5
> 3 * 6
18
> 4 - 1
3
</pre>

### 使用变量
你可以将数据存储在变量中，并在你需要的使用它。
变量声明需要使用var关键字，如果没有使用var关键字变量会直接打印出来。
使用var关键字的变量可以使用console.log()来输出变量。

### 多行表达式
Node REPL 支持多行表达式，这就有点类似JavaScript。

### Node.js 回调函数
Node.js 异步编程的直接体现就是回调。
异步编程依托于回调来体现，但不能说使用了回调后程序就异步化了。
回调函数在完成任务后就会被调用，Node使用了大量的回调函数,Node所有API都支持回调函数。

### Node.js 事件循环 9/26/2016 11:12:51 AM
 
Node.js是单进程单线程应用程序。

Node.js的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

Node.js 观察者模式 

### 事件驱动程序

Node.js使用事件驱动模型，当web server接受到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

### Node.js EventEmitter

Node.js 所有的异步I/O 操作在完成时都会发送一个事件到事件队列。

### EventEmitter类

events模块只提供了一个对象：events.EventEmitter。EventEmitter的核心就是事件触发与事件监听器的封装。

EventEmitter的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter支持若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

<pre>
//event.js 文件
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
</pre>

以上例子中，emitter为事件someEvent注册了两个事件监听器，然后触发了someEvent事件。运行结果可以看出两个事件监听器回调函数被先后调用。这就是EventEmitter最简单的用法。

EventEmitter提供了多个属性，如on和emit。on函数用于绑定事件函数，emit属性用于触发一个事件。

### buffer类

JavaScript语言只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在Node.js中，定义一个Buffer类，该类用来创建一个专门存放二进制数据的缓存区。

Buffer库为Node.js带来了一种存储原始数据的方法，可以让Node.js处理二进制数据，每当需要在Node.js中处理I/O操作中移动的数据时，就有可能使用Buffer库。一个Buffer类似于一个整数数组。

### 创建Buffer对象

- 创建长度为10字节的Buffer实例：

		var buffer = new Buffer(10);

- 通过给定的数组创建Buffer实例：

		var buf = new Buffer([10,20,30,40,50]);

- 通过一个字符串来创建Buffer实例：

		var buf = new Buffer("www.runoob.com","utf-8");

### 写入缓冲区

写入缓冲区的语法：
	
	buf.write(string[, offset[, length]][, encoding]);

### 冲缓冲区读取数据

	buf.toString([encoding[, start[, end]]])

