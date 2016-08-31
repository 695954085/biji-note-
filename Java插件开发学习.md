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


