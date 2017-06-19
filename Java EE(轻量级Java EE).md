## 6/7/2017 11:25:07 AM  ##

#### 2.13 Listener介绍 ####

实际上，Servlet Api提供了大量监听器来监听Web应用的内部事件，从而允许当Web内部事件发生时回调事件监听器内的方法。

使用Listener需要两个步骤

1. 定义Listener实现类
2. 通过Annotation或者Web.xml文件中配置Listener
