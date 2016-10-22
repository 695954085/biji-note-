## Java 插件开发 ##

### 1. Dependencies

Required Plug-ins 
	
	org.eclipse.ui
	org.eclipse.core.runtime

> Sepcify the list of plug-ins required for the operation of this plug-in.

Imported Packages

> Specify packages on which this plug-in depends without explicitly identifying their originating plug-in.


### Runtime 

Exported Packages

> Enumerate all the packages that this plug-in exposes to clients.All other packages will be hidden from clients at all times.
> 枚举这个插件的所有包给客户端。其他包任何时间相对于客户端将被隐藏。


### Extensions

All Extensions

> Define extensions for this plug-in in the following section.


### Extension Points

All Extension Points 

> Edit extension points defined by this plug-in in the following section.


----------

## Day 02 
[http://www.vogella.com/tutorials/EclipseExtensionPoint/article.html#tutorialextensionpoint](http://www.vogella.com/tutorials/EclipseExtensionPoint/article.html#tutorialextensionpoint)

### Extensions and extension points

![](http://www.vogella.com/tutorials/EclipseExtensionPoint/images/xextensionpointconcept10.png.pagespeed.ic.fQusXwiK21.webp)

### Creating an extension point

A plug-in which declares an extension point must declare the extension point in its plugin.xml file. You use the Extension Points tab for the definition.

## 4. Adding extensions to extension points

## 5. Accessing extensions

The information about the available extension points and the provided extensions are stored in a class of type IExtensionRegistry.

### Edit Extension Point

The definition of the extension is generated and the schema editor opens.


Choice -> This defines how often the extension "client" can be provided by contributing plug-ins.

<pre>
package com.vogella.extensionpoint.definition;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.ISafeRunnable;
import org.eclipse.core.runtime.SafeRunner;
import org.eclipse.e4.core.di.annotations.Execute;

public class EvaluateContributionsHandler {

	private static final String IGREETER_ID = "com.vogella.extensionpoint.definition.greeter";

	@Execute
	public void execute(IExtensionRegistry registry) {
		IConfigurationElement[] config = registry
				.getConfigurationElementsFor(IGREETER_ID);
		try {
			for (IConfigurationElement e : config) {
				System.out.println("Evaluating extension");
				final Object o = e.createExecutableExtension("class");
				if (o instanceof IGreeter) {
					executeExtension(o);
				}
			}
		} catch (CoreException ex) {
			System.out.println(ex.getMessage());
		}
	}

	private void executeExtension(final Object o) {
		ISafeRunnable runnable = new ISafeRunnable() {
			@Override
			public void handleException(Throwable e) {
				System.out.println("Exception in client");
			}

			@Override
			public void run() throws Exception {
				((IGreeter) o).greet();
			}
		};
		SafeRunner.run(runnable);
	}

}

</pre>


The code above uses the ISafeRunnable interface. This interface protects the plug-in which defines the extension point form malfunction extensions. If an extension throws an Exception, it will be caught by ISafeRunnable and the remaining extensions will still get executed.


----------

### Handler-定义行为


Elicpse是一个commands是一个组件的说明和声明的实施细则，从独立。一个command可以被归类，分配给用户界面和一键绑定可以为命令定义。


----------

OSGI(open service gateway initativate)技术是面向Java的动态模型系统。OSGI服务平台向Java提供服务，这些服务使Java成为软件集成和软件开发的首选环境。Java提供在多个平台支持产品的可移植性。OSGI技术提供允许应用程序使用精炼、可重用和可协作的组件构建的标准化语言。


----------

众所周知，Eclipse平台本身就是作为一个成功的OSGI应用，从技术层面讲，Eclipse本身就是有OSGI协议驱动的，同时Eclipse对OSGI组件机制做了有力的扩充，也就是我们所熟知的扩展点机制，关于扩展点的支持也作为。

OSGI为我们提供了一个追求模块化的方式来开发、部署、运行、管理组件的机制，其主要的技术特征包括模块化、生命周期管理、松耦合交互等。

Eclipse本身作为一个基础平台存在，其关键需求就是来方便用户扩展，并能够方便的和Eclipse平台本身做无缝集成。说白了，就是Eclipse中一个组件的任务大致为二：提供扩展实现或者声明扩展需求。我们知道，一个软件产品的技术实现必须要以符合产品需求为基础，Eclipse作为一个软件产品最大的需求就是如何方便的允许用户扩展并无缝地集成这些扩展。
如果要满足Eclipse的这种需求，需要一个组件还需要具备什么关键特指呢？开放、易扩展！！！
显然，OSGI本身并不能满足Eclipse的部分关键需求。Eclipse在osgi之上向用户提供了扩展点的机制，以一种xml描述的方式来配置组件之间的扩展关系，设计到的三个核心概念便是我们熟知的：扩展点（Extension Point）、扩展（Extension）和 扩展注册表（Extension Registry）。

### Platform回获取一些系统的路径和参数 10/11/2016 10:24:09 AM 

	摘要:Platform来获取一些系统的路径和参数，在Eclipse的插件开发中，可以通过Platform来获取一些系统的路径和参数。

### Java 进程间文件锁FileLock详解

两个进程中对同一个文件进行操作，正好Java提供了文件锁FileLock类，利用这个类可以控制不同程序对同一个文件的并发访问，是吸纳进程间同步操作。

FileLock可以通过对一个可写文件加锁，保证同时只有一个进程可以拿到文件的锁，这个进程从而可以对文件做访问；