### 什么是webPack，为什么使用它 ###

现金的很多网页其实可以看做是功能复杂的应用，它们拥有复杂的JavaScript代码和一大堆的依赖包。

- 模块化
- 类似Ts
- Scss，less等CSS预处理器。

这些改进确实大大的提高了我们的开发效率，但是利用它们开始的文件往往需要进行额外的处理才能让浏览器识别，而手动处理有是非常繁琐的，这就是WebPack类的工具的出现提供了需求。

### 什么是WebPack ###

WebPack可以看做是模块化包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其他的一些浏览器不能直接运行的扩展语言(Scss,Ts)，并将其转化和打包为合适供浏览器使用。

### WebPack和Grunt以及Gulp相比有什么特性 ###

其实WebPack和另外两个并没有太多相似之处。Gulp/Grunt是一种能够优化前端的开发流程工具，而WebPack是一种模块化的解决方案，不过WebPack的优点使得WebPack在很多场景下可以替代Gulp和Grunt。

WebPack的工作方式是：把你的项目当做是一个整体，通过一个给定的主文件(index.js)，WebPack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。


### 正式使用WebPack前的准备 ###

	1. npm init
	// 安装WebPack
	2. npm install --save-dev webpack
	3. 创建app文件夹和public文件夹 app文件夹用来存放原始数据和我们要写的JavaScript模块，public文件夹用来供浏览器读取的文件(包括使用WebPack打包生成的js文件以及一个index.html文件)。
		1. index.html 放在public文件夹中
		2. Greeter.js 放在app文件夹中
		3. main.js 放在app文件夹中

### 正式使用WebPack ###

	webpack ./app/main.js ./public/bundle.js

指定入口文件后，webpack将自动识别项目所依赖的其他文件。

可以看到bundle.js同时编译了main.js和Greeter.js.

### 通过配置文件来使用webpack ###

定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，我们可以把所有与打包相关的信息放在里面。

继续上面的离职，在webpack-proj文件夹根目录下新建一个名为webpack.config.js的文件，目前主要用来配置涉及到内容的入口文件和打包后文件的存放路径。

<pre>
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
</pre>

> "_dirname" 是node.js中的一个全局变量，它指向当前执行脚本所在目录。

有了这个配置文件后，只需要在终端运行`webpack(非全局安装需使用node_modules/.bin/webpack)`命令就可以了，这条命令会自动引用`webpack.config.js`文件中的配置选项。

### WebPack的强大功能 ###

#### 生成Source Maps(使调试更容易) ####

开发总是离不开调试，方便调试能极大的提高开发效率，不过有时候打包后的文件，你不是找到出错的地方，对应的你写的代码的位置，`Source Maps`就是来帮我们解决这个问题的。

通过简单的配置，`webpack`就可以在打包是为我们生成`Source Maps`，这就为我们提供了对应的编译文件和源文件的方法，使得编译后的代码可读性更高。更容易调试。

### 使用webpack构建本地服务器 ###

想不想让你的浏览器监听你的代码的修改，并自刷新修改后的结果，其实`webpack`提供一个可选的本地开发服务器。这个服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖。

### Loaders ###

`Loaders`是`webpack`最让人激动的功能之一。通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的js文件转化为现代浏览器兼容的js文件。

Loaders需要单独安装并且需要在`webpack.config.js`中的modules关键字下进行配置。


- test:一个用以匹配loaders所处理文件的扩展名的正则表达式
- loader:loader的名称
- include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件
- query：为loaders提供额外的设置选项


### Babel ###

Babel其实是一个变异JavaScript的平台，它的强大之处表现在可以变异帮你达到以下目的：

- 使用下一代的JavaScript代码（ES6，ES7...），即使这些标准目前并未被当前的浏览器完全的支持
- 使用基于JavaScript进行了拓展的语言，比如React的JSX；

### 一切皆模块 ###

Webpack有一个不可不说的有点，它把所有的文件都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loaders都可以处理。

### CSS ###

webpack提供两个工具处理样式表，`css-loader`和`style-loader`，两者处理的任务不同，`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

### CSS module ###

最近有一个叫做CSS modules的技术就意在把js的模块化思想带入CSS中，通过CSS模块，所有的类型，动画名默认都只作用域当前的模块。webpack从一开始就对css模块化提供了支持，在css loader中进行配置后，你所需要做的一切就是把‘modules’传递到所需要的地方，然后就可以直接把css的类型传递到组件中，且这样做只对当前组件有效，不必担心在不同模块中使用相同的类型造成冲突。


CSS module，相同的类名也不会造成不同组件之间的污染。


### CSS 预处理器 ###

`Sass`和`Less`之类的预处理器是对原生CSS的扩展，它们允许你使用类似于variables, nesting, mixins, inheritance等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句，

- Less Loader
- Sass Loader
- Stylus Loader


### 插件 ###

插件是用来扩展webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
Loaders和Plugins常常被弄混，但是它们其实是完全不同的东西，可以说Loaders是在打包构建过程中用来处理源文件，一次处理一个，插件并不是直接操作单个文件，它们直接对整个构建剁成起作用。


### 使用插件的方法 ###

要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件。


### HtmlWebpackPlugin ###

这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用。

### Hot Module Replacement ###

Hot Module Replacement也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新试试预览修改后的结果。

在webpack中实现HMR，只需要做两项配置