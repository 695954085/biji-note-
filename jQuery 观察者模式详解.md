## jQuery的观察者模式 9/26/2016 11:20:11 AM 

在jQuery中，on方法可以为元素绑定事件，trigger方法可以手动触发事件。

**on方法绑定内置事件，自然触发**

比如，我们给页面的body元素绑定一个click事件，这样写。
<pre>
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;script src="Scripts/jquery-2.1.1.min.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript"&gt;
        $(function() {
            $('body').on('click', function () {
                console.log('被点击了~~');
            });
        });      
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;hello&lt;/h1&gt;
&lt;/body&gt;
</pre>

**on方法绑定自定义事件，手动触发**

<pre>
    &lt;script src="Scripts/jquery-2.1.1.min.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript"&gt;
        $(function() {
            $('body').on('someclick', function () {
                console.log('被点击了~~');
            });
            $('body').trigger('someclick');
        });      
    &lt;/script&gt;
</pre>

以上，我们自定义了someclick事件，得到的结果和上面一样。
trigger触该事件。
