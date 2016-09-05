## Jquery Mobile 学习 ##

- data-role = "page" 是显示在浏览器中的页面
- data-role = "header" 创建页面上方的工具栏（常用于标题和搜索按钮）
- data-role = "content" 定义页面的内容，比如文本、图像、表单和按钮，等等。
- data-role = "footer" 创建页面底部的工具栏

----------

###在Jquery Mobile中添加页面  
在Jquery Mobile，您能在单一HTML文件中创建多个页面。  
请通过唯一的id来分隔每张页面，并使用href属性来连接彼此。

----------
###将页面用做对话框  
对话框是用来显示信息或请求输入的视窗类型。  
如需在用户点击链接时创建一个对话框，请向该链接添加 data-rel = "dialog";

----------
### jQuery Mobile过渡效果
jQuery Mobile拥有一系列关于如何从一页过渡到下一页的效果。  
过渡效果可应用与任意链接或通过使用data-transition属性进行的表单提交


----------
### 在jQuery Mobile中创建按钮

jQuery Mobile中的按钮可通过三种方法创建:  

- 使用button元素
- 使用input元素
- 使用data-role="button"的a元素

<pre>&lt;button&gt;按钮&lt;/button&gt;</pre>

----------
### 导航按钮

如果需要通过按钮来连接页面，请使用data-role="button"的&lt;a&gt;

    <a href="#pagetwo" data-role="button">转到页面二</a>
  

----------
### 行内按钮

默认情况下，按钮会占据屏幕的全部宽度。如果您需要按钮适应其内容，或者如果您需要两个或多个按钮并排显示，请添加data-inline="ture":

----------
### 为jQuery Mobile按钮添加图标

如需向您的按钮添加图标，请使用data-icon属性：

    <a href="#anylink" data-role="button" data-icon="search">搜索</a>

> 提示：您也可以在 &lt;button&gt; 或 &lt;input&gt; 元素中使用 data-icon 属性。


----------
###定位图标

您也能够规定图标被放置的位置：上下左右。  

请使用data-iconpos属性来规定位置：

----------
### 标题栏

页眉通常会包含页眉标题/LOGO或一到两个按钮。

    <div data-role="header">
    	<a href="#" data-role="button">首页</a>
		<h1>欢迎来到我的主页</h1>
		<a href="#" data-role="button">搜索</a>
	</div>


----------
### Ajax跨域请求

1. jsonp 需要服务器与客户端协同开发
2. 使用别人提供的服务器跨域访问

