### 译者序

TCP/IP成为计算机网络协议事实上的标准。Java凭借着其跨平台特性和对网络编程的强大支持能力，在网络应用中已占据了主导地位。

### 前言

### 简介

Java语言从一开始就是为了让人们使用互联网而设计的，它为实现程序的相互通信提供了许多有用的抽象应用编程接口，这类应用编程接口被称为套接字。


信息是指由程序创建和解释的字节序列。字节序列称为分组报文。一组报文包括了网络用来完成工作的控制信息，有时还包括了一些用户数据。用于定位分组报文目的地址的信息。

协议相当于相互通信的程序间搭乘的一种约定。他规定了分组报文的交换方式和它们包含的意义。一组报文规定了分组报文的结构以及怎样对报文中所包含的信息进行解析。

应用程序通过套接字API对UDP协议和TCP协议所提供的服务进行访问。

IP协议层之上称为传输层。它提供了两种可选择的协议：TCP和UDP协议。这两种协议都简历在IP层所提供的服务基础上，但根据应用程序协议的不同需求，它们使用了不同的方法来实现不同方式的传输，TCP和UDP共有的一个功能即是寻址。IP协议只是将分组报文分发到不同的主机，很明显，还需要更细粒度的寻址将报文发送到主机中自定的应用程序，因为同一主机上可能多个应用程序在使用网络。TCP协议和UDP协议使用的地址是端口号，都是用来区分同一主机中不同应用程序的。TCP协议和UDP协议也称为端到端传输协议。

TCP协议能够检测和恢复IP层提供的主机到主机的信道中可能发生的报文丢失、重复及其他错误。UDP协议并不尝试对IP层产生的错误进行修复，它紧紧简单地扩展了IP协议“尽力而为”的数据包服务。

### 1.2 关于地址

每个互联网地址代表了一台主机与底层的通信信道的连接，就是网络接口。主机可以有多个接口。例如有线以太网和无线网

端口号是一组16位的无符号二进制数，每个端口号的范围是1~65535.

回环接口：简单地将发送给它的报文直接回发给发送者。

### 1.3 关于名字

DNS协议允许连接到互联网的主机通过TCP协议或者UDP协议从DNS数据库中获取信息。

### 1.5 什么是套接字

socket是一种抽象层，应用程序通过它来发送和接收数据。

流套接字将TCP作为其端对端协议，提供了一个可信赖的字节流服务。一个TCP/IP流套接字代表了TCP连接的一段。数据报套接字使用UDP协议们，提供了一个“尽力而为”的数据报服务。

## 第二章

### 2.1 套接字

InetAddress类代表一个网络目标地址，包括主机名和数字类型的地址信息。

InetAddress实例是不可变的，一旦创建了，每个实例就是种执行同一个地址。

网络接口指的是网络设备的各种接口，电脑与其他设备的网络通讯的进出口。

### 2.2 TCP套接字

在开通通信之前，要简历一个TCP连接，这需要先有客户端请求创建新的Socket实例。ServerSocket实例则监听TCP连接请求，并为每个请求创建新的Socket实例。也就是说，服务器端要同事处理ServerSocket实例和Socket实例。客户端只需要处理Socket实例。

TCP协议并不能确定在read和write方法中所发送信息的界限，虽然我们只用了一个write方法来发送回馈字符串，回馈服务器也可能从多个快中接受该信息。即使回馈字符串在服务器上存于一个快中，在返回的时候，也可能被TCP协议分隔成多个部分。最常见的错误就是认为有一个write方法发送的数据总是会由一个read方法来接收。

2.2.2 TCP服务器

- 服务器端的工作是建立一个通信终端，并被动地等待客户端的连接。
	1. 创建一个ServerSocket实例并制定本地端口。此套接字的功能是监听该制定端口收到的连接。
	2. InputStream.read(byte[] b) 方法每次获取缓存数组所能放下的最多的字节，并存入该数组，同时返回实际读取的字节数。read()方法将阻塞等待，直到有可读数据。如果已经数据已经读完则返回-1，表示客户端关闭了其套接字。	
	3. `(recvMsgSize = in.read(receiveBuf)) != -1` read()方法并不一定要在整个字节数组填满后才返回。实际上它只是接受了一个字节时就可以返回。

### 第三章

- 在程序中使用套接字是因为需要向其他程序提供信息，或使用其他程序提供的信息。



### InetAddress ###

1. 简介
	1. Ip地址是Ip使用32位或者128位无符号数字，它是传输层协议TCP，UDP的基础。InetAddress是Java对IP地址的封装，在java.net中有许多类使用了InetAddress，包括ServerSocket，Socket，DatagramSocket等。
	2. InetAddress的实例对象包含以数字形式保存的IP地址，同时还包含主机名。InetAddress类提供了将主机名解析为IP地址（或反之）的方法。
	3. InetAddress对域名进行解析是使用本机机器配置或网络命名服务。对于DNS来说，本地需要向DNS服务器发送查询的请求，然后服务器根据一系列的操作，返回对应的IP地址，为了提高效率，通常本地会缓存一些主机名与IP地址的映射，这样访问相同的地址，就不需要重复发送DNS请求了。在java.net.InetAddress类同样采用了这种策略。在默认情况下，会缓存一段有限时间的映射，对于主机名解析不成功的结果，会缓存非常短的时间来提高性能。

2. InetAddress对象的获取
	1. InetAddress的构造函数不是公开的，所以需要通过它提供的静态方法来获取。
		* static InetAddress[] getAllByName(String host)
		* static InetAddress getByAddress(byte[] addr)
		* static InetAddress getByAddress(String host,byte[] addr)
		* static InetAddress getByName(String host)
		* static InetAddress getLocalHost()
	2. 在这些静态方法中，最为常见的应该是getByName(String host)方法了，只需要传入目标主机的名字，InetAddress会尝试做连接DNS服务器，并且获取IP地址的操作。
		<pre>InetAddress inetAddress = InetAddress.getByName("www.baidu.com")</pre>
		* 注意这些方法可能会抛出异常。如果禁止访问网络或者不允许访问DNS，或者找不到主机的IP地址。
	 

## Mina学习 ##

1. Mina 是 NIO。
2. Mina 可以模仿阻塞效果。
3. Mina 作用于TCP和UDP就是传输层
4. Mina掩盖了TCP和UDP之间的差异，使您专注于对应用程序代码和应用协议编码解码。


#### 创建Mina应用程序 ####

1. Create an I/O service - Choose from already available Services (*Acceptor) or create your own
2. Create a Filter Chain - Choose from already existing Filters or create a custom Filter for transforming request/response
3. Create an I/O Handler - Write business logic, on handling different messages



#### Server Architecture 服务器架构 ####

![服务器架构](https://github.com/695954085/biji-note-/blob/master/res/Server_arch.png?raw=true)

1. IOAcceptor 在网络上监听传入的连接/数据包
2. 对于新连接Connection，会创建一个新的session，并在后续的来自相同IP地址和端口组合的请求都由此session处理。
3. 所有session接收的数据都是通过上图的流程遍历过滤链。过滤器用于修改数据包的内容(如转化对象，添加/删除信息等)。
4. 最后数据包和转化后的对象进入了IOHandler。IOHandler被用于业务需求。


#### Client Architecture 客户端架构 ####

![客户端架构](https://github.com/695954085/biji-note-/blob/master/res/clientdiagram.png?raw=true)

1. 客户端首先创建一个IOConnector(Mina Server已经连接Socket)，启动与服务器连接。
2. 连接之后，将创建一个Session并与connection相关联。
3. 客户端写入回话数据时，导致数据在过滤链中遍历后发送到服务器。
4. 从服务器中的到的数据将在过滤链中遍历，最后到达IOHandler处处理。


#### telnet命令 ####

telnet就是查看某个端口是否可访问。

#### IOService ####

1. 它将处理与您的应用应用程序的所有交互，并与远程对等体发送和接收消息，管理回话，连接等。
2. 它是一个交口，它是为实现IoAcceptor，IoConnector。
3. IoService的用处：
	1. sessions manager：创建和删除回话，检测空闲。
	2. 过滤器链管理：处理过滤器链，允许用户即是更改链
	3. 处理程序调用：在收到某些消息时，调用处理函数
	4. 统计管理：更新发送的消息数
	5. 监听器管理
	6. 通信管理

4. IoService是Mina中两个最重要的类实现的接口。
	1. IoAcceptor
	2. IoConnector

#### IoAcceptor ####
1. 这个接口是由于accept()方法而命名的，负责在客户机和服务器之间创建新的连接。服务器接受传入的连接请求。
2. 由于要处理多种传输(TCP/UDP/...)，因此我们对该接口有多个实现。
	1. NioSocketAcceptor：非阻塞Socket传输IoAcceptor
	2. NioDatagramAcceptor：非阻塞UDP传输IoAcceptor
	3. AprSocketAcceptor： APR？
	4. VmPipeSocketAcceptor： VM？

![](https://github.com/695954085/biji-note-/blob/master/res/IoServiceAcceptor.png?raw=true)
#### IoConnector ####

1. IoConnector实现类
	1. NioSocketConnector：非阻塞Socket传输IoConnector
	2. NioDatagramConnector：非阻塞UDP传输IoConnector
	3. AprSocketConnector：APR？
	4. ProxyConnector：提供代理支持的IoConnector
	5. SerialConnector：一个IoConnector用于串行传输
	6. VmPipeConnector：VM中的IoConnector

![](https://github.com/695954085/biji-note-/blob/master/res/IoServiceConnector.png?raw=true)

#### session会话 ####

会话用于存储有关连接的持久信息，以及客户端或服务器在请求处理期间可能需要使用的任何信息。

session有一个状态标志。
1. connected 会话已经创建并且可用。
2. idle：会话至少没有处理任何请求
	1. idle for read：实际上有一段时间没有读取
	2. idle for write：一段时间没有写入
	3. idle：不读写一段时间
3. closing：会话正在关闭
4. closed：会话现已关闭


#### Filter ####

IoFilter可以过滤IoService和IoHandler之间的所有I/O事件和请求。

过滤器提供了多种开箱即用的过滤器：
1. LoggingFilter记录所有事件和请求
2. ProtocolCodecFilter将传入的ByteBuffer转换为消息pojo
3. SSLFilter添加SSL-TLS支持。

转换写请求

如果您通过IoSession.write() 转换传入的写入请求，那么事情会变得非常棘手。

#### IoHandler ####

- sessionCreated Event

	创建新连接时触发会话创建的事件。对于TCP连接成功触发，对于UDP，接收到数据包才触发。

- sessionIdle Event
	
	会话空闲时触发会话空闲事件，UDP功能不被调用。

- ExceptionCaught Event

	当用户代码或MINA抛出异常时，调用此函数。如果异常是IOException，连接被关闭。

- messageSent Event

	当执行了IoSession.write() 此方法被触发。
	
#### IoBuffer ####

#### Codec Filter 编解码器 ####

**为什么要使用ProtocolCodecFilter？**

 - TCP保证会以正确的顺序发送所有的数据包。但是，不能保证发送方的一个写操作会引起接收方的一个读操作。如果发送者没有调用ProtocolCodecFilter的Iosession.write(Object message)，会导致接收者产生过个messageReceived事件。
 - 大多数网络应用程序需要一种方法来查找当前消息的结束位置以及下一个消息的开始位置。

**怎么办？**

应用程序基本上只是接收一堆字节，你需要把这些字节转化为消息(高级对象)。

有三种将字节流分解为消息的常用技术：
	- 使用固定长度的消息
	- 使用固定长度的头部用于指定body的长度
	- 使用分隔符

Mina保证了不会有多个线程同时执行同一个session的decode，但是不能确保数据1和数据2在同一个线程下执行。为了避免可见性问题，您必须正确地访问此解码器状态(IoSession的属性是存储在ConCurrentHashMap中)，以便其他线程自动可见。

**HashTable ConCurrentHashMap 区别**

![](https://github.com/695954085/biji-note-/blob/master/res/HashTable%E5%92%8CConcurrentHashMap.jpg?raw=true)

1. 大家都知道，HashMap中未进行同步考虑，而HashTable则使用了synchronized，带来的影响就是可选择，我们可以在单线程时使用HashMap提高效率，而多线程时使用HashMapTable来保证安全。
2. HashTable是通过synchronized整张Hash表，即每次锁住整张表让线程独占，安全背后是巨大的浪费。
3. ConcurrentHashMap则是锁桶。

#### SSL Filter ####

SSL Filter负责管理通过安全连接发送加密和解密数据的过滤器。每当你需要建立安全连接或转换现有连接以使其安全时，您必须在过滤器链上添加SSL Filter。


SSLFilter一定要注入到过滤链的第一个位置。



