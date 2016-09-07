## Gradle 9/4/2016 11:27:18 AM 


Gradle是一种构建工具，它抛弃了基于xml的构建脚本，取而代之是采用一种基于Groovy的尼日不领域特定语言。

### Gradle构建简介

在Gradle中，有两个基本概念：项目和任务。

- 项目是指我们的构建产物（比如Jar包）或实施产物（将应用程序部署到生产环境）。一个项目包含一个或多个任务。
- 任务是指不可分的最小工作单元，执行构建工作（比如编译项目或执行测试）。

**每一次Gradle的构建都包含一个或多个项目。**

![](https://github.com/695954085/biji-note-/blob/master/res/gradle01.jpg?raw=true)

配置文件对Gradle的构建进行配置：

- Gradle构建脚本（build.gradle）指定一个项目和它的任务。
- Gradle属性文件（gradle.properties）用来配置构建属性。
- Gradle设置文件（gradle.settings）对于只有一个项目的构建而言是可选的，如果我们的构建包含多于一个项目，那么它就是必须的，因为它描述了哪一个项目参与构建，每一个多项目的构建都必须在项目构建的根目录中加入一个设置文件。

### 更简短的Gradle插件简介

Gradle的设计理念是，所有有用的特性都是由Gradle插件提供，一个Gradle插件能够：

- 在项目中添加新任务
- 为新加入的任务提供默认配置，这个默认配置会在项目中注入新的约定（如源文件位置）
- 加入新的属性，可以覆盖插件的默认配置属性。
- 为项目加入新的依赖。

### Java工程中的任务

- assemble任务会编译程序中的源代码，并打包生成Jar文件，这个任务不执行单元测试。
- build任务会执行一个完整的项目构建。
- clean任务会删除构建目录。
- compileJava任务会编译程序中的源代码。

----
### Gradle管理依赖

## 在构建中加入Maven仓库
我们可以通过URL地址或本地文件系统地址，将Maven仓库加入到我们的构建中。

如果我们通过URL地址添加一个Maven仓库，我们可以将一下代码片段加入到build.gradle文件中：

<pre>
repositories {
    maven {
        url &quot;http://maven.petrikainulainen.net/repo&quot;
    }
}
</pre>

如果想通过本地文件系统地址添加一个Maven仓库，我们可以将以下代码片段加入到build.gradle

<pre>
repositories {
    maven {       
        url "../maven-repo"
    }
}
</pre>

### 依赖管理简介

在配置完项目仓库后，我们可以声明其中的依赖，如果我们想要声明一个新的依赖，可以采用如下步骤：

- 指定依赖的配置。
- 声明所需的依赖。

### 配置中的依赖分类

在Gradle中，依赖是按照指定名称进行分类的，这些分类被称为配置项，我们可以使用配置项声明项目的外部依赖。

Java插件指定了若干依赖配置项，其描述如下：

- 当项目的源代码被编译时，compile配置项中的依赖是必须的。
- runtime配置项中包含的依赖在运行时是必须的。
- testCompile配置项中包含的依赖在编译项目的测试代码时是必须的。
- testRuntime配置项中的包含的依赖在运行测试代码时是必须的。
- archives配置项中包含项目生成的文件（Jar文件）
- default配置项中包含运行时必须的依赖。

### 声明项目依赖

最普遍的依赖称为外部依赖，这些依赖存放在外部仓库中。一个外部依赖可以由以下属性指定：

- group属性指定依赖的分组（在Maven中，就是groupId）。
- name属性指定依赖的名称（（在Maven中，就是artifactId）。
- version属性指定外部依赖的版本（在Maven中，就是version）。

我们假设我们需要指定一下依赖：

- 依赖的分组是foo。
- 依赖的名称是foo。
- 依赖的版本是0.1。
- 在项目编译时需要这些依赖。

<pre>
dependencies {
    compile group: &#039;foo&#039;, name: &#039;foo&#039;, version: &#039;0.1&#039;
}

dependencies {
    compile group: 'foo', name: 'foo', version: '0.1'
    testCompile group: 'test', name: 'test', version: '0.1'
}
</pre>

### 总结

- 我们学会了配置构建所需的仓库。
- 我们学会了如何声明所需的依赖以及依赖的分类（分组）。
- 我们了解了Gradle会在测试执行后创建一个HTML测试报告。
- 我们学会创建一个jar文件。

----
### 创建一个多项目构建

我们将创建一个多项目的Gradle构建，包括两个子项目：app和core。初始阶段，先要建立Gradle构建的目录结构。

### 建立目录结构

由于core和app模块都使用Java语言，而且它们都使用Java项目的默认项目布局，我们根据以下

### 对包含在多项目构建中的项目进行配置

- 在根目录的根目录下创建setting.gradle文件，一个多项目Gradle构建必须含有这个文件，因为它指明了那些包含在多项目构建中的项目。
- 确保app和core项目包含在我们的多项目构建中。

我们的settings.gradle文件如下：

	include 'app'
	include 'core'

### 配置core项目

我们可以通过以下步骤对core项目进行配置：

- 在core项目的根目录下创建build.gradle文件。
- 使用Java插件创建一个Java项目。
- 确保core项目从Maven2中央仓库（central Maven2 repository）中获取依赖。
- 声明JUnit依赖，并使用testCompile配置项，该配置项声明：core项目在它的单元测试被编译前，需要JUnit库。

### 配置App项目

如果多项目构建拥有项目A和项目B，同时，项目B的编译需要项目A，我们可以通过在项目B的build.gradle文件中添加一下依赖声明来惊醒依赖配置。

<pre>
dependencies {
    compile project(&#039;:A&#039;)
}
</pre>

app项目配置：

1. 配置所需的依赖，app项目在编译时需要两个依赖：
	- Log4j
	- core模块


### 移除重复配置

当我们对多项目构建中的子项目进行配置时，我们在core和app项目的构建脚本中添加了重复的配置。
	- 由于两个项目都是Java项目，因此它们都使用Java插件。
	- 两个项目都使用Maven2中央仓库。

如果想要将重复的配置转移到根目录的构建脚本中，就必须将一下配置添加到build.gradle文件中。

<pre>
project(&#039;:app&#039;) {
	apply plugin: &#039;java&#039;
 
	repositories {
		mavenCentral()
	}
}
 
project(&#039;:core&#039;) {
	apply plugin: &#039;java&#039;
 
	repositories {
		mavenCentral()
	}
}
</pre>

如果我们想要在根目录的子目录中添加通用的配置，需要将以下片段添加到根目录的build.gradle文件中。

<pre>
subprojects {
    apply plugin: 'java'
 
    repositories {
        mavenCentral()
    }
}
</pre>

####总结

1. 一个多项目构建必须在根目录下包含settings.gradle文件，因为它指明了那些包含在多项目构建中的项目。
2. 如果需要在多项目构建的所有项目中加入公用的配置或行为，我们可以将这项配置加入到根项目的build.gradle文件中。
3. 如果需要在根项目的子项目中加入公用的配置或行为，我们可以将这项配置加入到根项目的build.gradle文件中(使用subprojects)。
