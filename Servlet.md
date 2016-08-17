# Servlet是什么？ #

----------

Java Servlet是运行在Web服务器或应用程序上的程序，它是作为来自Web浏览器或其他HTTP客户端的请求和HTTP服务器上的数据库或应用程序之间的中间层。

使用Servlet，您可以收集来自网页表单的用户输入，呈现来自数据库或者其他源的记录，还可以动态创建网页。

Java Servlet通常情况下与使用CGI实现的程序可以达到异曲同工的效果。但是相比于CGI，Servlet有一下几点优势：
- 性能明显更好。
- Servlet在Web服务器的地址空间内执行。这样它就没有必要再创建一个单独的进程来处理每个客户端请求。
- Servlet是独立于平台的，因为它们是用Java编写的。
- 服务器上的Java安全管理器执行了一系列限制。以保护服务器计算机上的资源。因此，Servlet是可信的。
- Java类库的全部功能对Servlet来说都是可用的。它可以通过sockets和RMI机制与applets、数据库或其他软件进行交互。

# Servlet任务 #

----------
Servlet执行以下主要任务：
- 读取客户端（浏览器）发送的显式的数据。这包括网页上的HTML表单，或者也可以是来自applet或自定义的HTTP客户端程序的表单。
- 读取客户端（浏览器）发送的隐式HTTP请求数据。这包括cookies、媒体类型和浏览器能理解的压缩格式等等。
- 处理数据并生成结果。这个过程可能需要访问数据库，执行RMI或CORBA调用，调用Web服务，或者直接计算得出对应的响应。
- 发送显示的数据（即文档）到客户端（浏览器）。该文档的格式可以是多种多样的，包括文本文件（HTML或XML）、二进制（GIF）、Excel等。
- 发送隐式的HTTP响应到客户端（浏览器）。这包括高速浏览器其他客户端被返回的文档

----------
# 目录 #
- 编写你的第一个Servlet
- Servlet声明周期
- 使用@WebServlet注解开发Servlet
- 打包和部署Servlet到Tomcat服务器
- 编写动态的Servlet响应内容
- 处理Servlet请求和响应
- 监听Servlet容器事件
- 传递Servlet初始化参数
- 为特定的URL请求添加Servlet过滤器
- 使用Servlet下载二进制文件
- 使用RequestDispatcher.forward()转发请求到另外一个Servlet
- 使用HttpServletResponse.sendRedirect()重定向请求到另外一个Servlet
- 使用Servlet读写Cookie



1. 重新doGet，doPost方法，这两个方法都已经在HttpServlet类里定义了。当一个GET或POST请求到来时



----------
# Servlet生命周期 #

- Servlet通过调用init()方法进行初始化。
- Servlet调用service()来处理客户端的请求。
- Servlet通过调用destroy（）方法终止
- 最后，Servlet是有JVM的垃圾回收器进行垃圾回收的。

## Init方法 ##
init方法被设计调用一次。它在第一次创建Servlet时被调用，在后续每次用户请求时不再调用。因此，它是用于一次性初始化。

## service方法 ##
service方法是执行实际任务的主要方法。Servlet容器调用service方法来处理来自客户端的请求，并把格式化的响应写会客户端。
每次服务器接受到一个Servlet请求时，服务器会产生一个新的线程并调用服务。

## 使用Servlet读取表单数据 ##
Servlet处理表单数据，这些数据会根据不同的情况使用不同的方法自动解析：
- getParameter():您可以调用request.getParameter（）方法来获取表单参数的值。
- getParameterValue():如果参数出现一次以上，则调用改方法，并返回多个值，例如复选框。
- getParameterNames():如果您想要得到当前请求中的所有参数的完整列表，则调用改方法。


## 包装类DataOutputStream、DataInputStream的常见用法 ##
- 包转了DataOutputStream、DataInputStream为我们提供了多种对文件的写入和读取方法，如writeBoolean、writeUTF、writeChar、writeByte、WriteDouble等对应的read方法。
- 注意1：一般情况下在读入是尽量按照写入时的格式进行读取，否则有可能会出现显示乱码或程序出现异常。
- 如首先写入文件用的是writeUTF，在读取的时候如果不是用readUTF就会出现乱码。
- 注意2：如程序中注释所说，对于出现汉字字符的情况不能用writeBytes，这会在写入文件时丢弃汉字字符的第一个字节从而在读取时出现错误。
- 注意3：所有的读取方法都是共享一个位置指示器的，即在前面的read方法执行后，后面再执行其他read方法都是从上一个read方法读取到的位置开始向后读取的。如开始执行了1次readByte后面的readChar是从第2个字节开始读的。

## ThreadPoolExecutor ##

- 所有的BlockingQueue都可用于传输和保持提交的任务。可以使用此队列与池大小进行交互。
	- 如果运行的线程少于corePoolSize，则Executor始终首选添加新的线程，而不是进行排队。
	- 如果运行的线程等于或多于corePoolSize，则Executor始终首选将请求加入队列，而不添加新的线程。
	- 如果无法将请求加入队列，则创建新的线程，除非创建此线程超出maximumPoolSize，任务将被拒绝。

- 排队3种通用策略：
	-  直接提交：SynchronousQueue，它将任务直接提交给线程而不保持它们。在此，如果不存在可用于立即运行的任务的线程，则试图把任务加入队列将失败，因此会构成一个新的线程。此策略可以避免在处理可能具有内部依赖性的请求集时出现锁。直接提交通常要求无界maximimPoolSizes以避免拒绝新提交的任务。
	-  无界队列。使用无界队列将导致在所有corePoolSize线程都忙时新任务在队列中等待。这样，创建的线程就不会超过corePoolSize。当每个任务完全独立于其他任务，即任务执行互不影响时，适用于使用无界队列；
	-  有界队列。当使用有限的maximumPoolSizes时，有界队列有助于防止资源耗尽，但是可能较难调整和控制。队列大小和最大池大小可能需要互相

- shutDown() 
	- 当线程池调用该方法时，线程池的状态则立刻SHUTDOWN状态。唯一的影响就是不能再提交任务了，正在执行任务即使在阻塞也不会结束，在排队的任务也不会取消。
	- 