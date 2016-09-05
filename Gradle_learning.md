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

