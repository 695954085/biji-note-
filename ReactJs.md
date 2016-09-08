## ReactJs 入门教程 9/7/2016 10:56:38 AM 

### 1.ReactDOM.render()
ReactDOM.render是React的最基本方法，用于将模板转为HTML语言，并插入指定的DOM节点。

<pre>
ReactDOM.render(
	&lt;h1&gt;Hello,World!&lt;/h1&gt;,
	document.getElementById('example');
);
</pre>
上面代码将一个h1标题，插入example节点。

### 2.JSX语法

HTML语言直接写在JavaScript语言之中，不加任何引号，这就是JSX语法，它允许HTML与JavaScript的混写

<pre>
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  &lt;div&gt;
  {
    names.map(function (name) {
      return &lt;div&gt;Hello, {name}!&lt;/div&gt;
    })
  }
  &lt;/div&gt;,
  document.getElementById('example')
);
</pre>

上面代码体现了JSX的基本语法规则，遇到HTML标签(以&lt;开头)，就用HTML规则解析;遇到代码块(以{开头)，就用JavaScript规则解析。

JSX允许直接在模板插入JavaScript变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

### 3.组件

React允许将代码封装成组件，然后像插入普通HTML标签一样，在网页中掺入这个组件。

React.createClass方法就用于生成一个组件类。

<pre>
var HelloMessage = React.createClass({
  render: function() {
    return &lt;h1&gt;Hello {this.props.name}&lt;/h1&gt;;
  }
});

ReactDOM.render(
  &lt;HelloMessage name="John"/&gt;,
  document.getElementById('example')
);
</pre>

变量HelloMessage就是一个组件类。模板插入&lt;HelloMessage&gt;时，会自动生成HelloMessage的一个实例。所有组件类必须有自己的render方法，用于输出组件。

注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessag不能写成helloMessage。另外，组件类只能一个顶层标签，否则也会报错。

<pre>
var HelloMessage = React.createClass({
  render: function() {
    return &lt;h1&gt;
      Hello {this.props.name}
    &lt;/h1&gt;&lt;p&gt;
      some text
    &lt;/p&gt;;
  }
});
</pre>

上面会报错，因为HelloMessage组件包含了两个顶层标签：h1和p。

组件的用法与原生的HTML标签完全一致，可以任意加入属性，比如&lt;HelloMessage name='John'&gt;，就是HelloMessage组件加入一个name属性，值为Jhon。组件的属性可以在组件类的this.props对象上获取，比如name属性就可以通过this.props.name读取。

>添加组件属性，就是class属性需要写成className,for属性需要写成htmlFor，这是因为class和for是JavaScript的保留字。

### 4.this.props.children

this.props对象的属性与组件的属性一一对应，但是有一个例外，就是this.props.children属性。它表示组件的所有子节点。

### 5.PropTypes

组件的属性可以接受任意值，字符串，对象，函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类PropTypes属性，就是用来验证组件实例的属性是否符合要求。

<pre>
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return &lt;h1&gt;{this.props.title} &lt;/h1&gt;;
   }
});
</pre>

此外，getDefaultProps方法可以用来设置组件属性的默认值。

<pre>
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return &lt;h1&gt; {this.props.title} &lt;/h1&gt;;
   }
});

ReactDOM.render(
  &lt;MyTitle/&gt;,
  document.body
);
</pre>

### 6.获取真实的DOM节点

组件并不是真实的DOM节点，而是存在于内存之中的一种数据结构，叫做虚拟DOM。只有当它插入文档以后，才会变成真实的DOM。根据React的设计，所有的DOM变动，都先在虚拟DOM上发生，然后在将实际发生变动的部分，反映在真实的DOM上，这种算法叫做DOM diff。

但是，有时需要从组件获取真实的DOM的节点，这时就要用到ref属性。

<pre>
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      &lt;div&gt;
        &lt;input type="text" ref="myTextInput" /&gt;
        &lt;input type="button" value="Focus the text input" onClick={this.handleClick} /&gt;
      &lt;/div&gt;
    );
  }
});

ReactDOM.render(
  &lt;MyComponent /&gt;,
  document.getElementById('example')
);
</pre>

组件MyComponent的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的DOM节点，虚拟DOM是拿不到用户输入的。为了做到这一点，文本输入框必须有一个ref属性，然后this.refs.[refName]就会返回这个真实的DOM节点。

由于this.refs.[refName]属性获取的真实DOM，所以必须等到虚拟DOM插入文档以后，才能使用这个属性，否则报错。通过为组件指定Click事件的回调函数，确保了只有等到真实DOM发生Click事件之后，才会督导this.refs.[refName]属性。

###7.this.state

组件免不了要与用户互动，React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI。

<pre>
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      &lt;p onClick={this.handleClick}&gt;
        You {text} this. Click to toggle.
      &lt;/p&gt;
    );
  }
});

ReactDOM.render(
  &lt;LikeButton /&gt;,
  document.getElementById('example')
);
</pre>

一个LikeButton组件，它的getInitialState方法用于定义初始状态，也就是一个对象，这个对象可以通过this.state属性获取。当用户点击组件，导致状态变化，this.setState方法就修改状态值，每次修改以后，自动调用this.render方法，再次渲染组件。

由于，this.props和this.state都用于描述组件的特性，可能会产生混淆。一个简单区分方法是，this.props表示那些一旦定义，就不在改变的特性，而this.state是会随着用户互动而产生变化的特性。

### 8.表单

用户在表单填入的内容，属于用户跟组件的互动，所有不能用this.props读取。

<pre>
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      &lt;div&gt;
        &lt;input type="text" value={value} onChange={this.handleChange} /&gt;
        &lt;p&gt;{value}&gt;/p&gt;
      &lt;/div&gt;
    );
  }
});

ReactDOM.render(&lt;Input/&gt;, document.body);
</pre>

文本输入框的值，不能用this.props.value读取，而要定义一个onChange事件的回调函数，通过event.target.value读取用户输入的值。textarea元素，select元素、radio元素都适用。

### 10.组件的生命周期

组件的生命周期分为三个状态：

- Mounting:已插入真实DOM
- Updateing:正在被重新渲染
- Unmounting：已移出真实DOM

	style={{opacity: this.state.opacity}}

这是因为React组件样式是一个对象，多以第一重大括号表示是JavaScript语法，第二重大括号表示样式对象。

### 10.Ajax

组件数据来源，通常是通过Ajax请求从服务器获取，可以使用componentDidMount方法设置Ajax请求，等到请求成功，再用this.setState方法重新渲染UI。

<pre>
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      &lt;div&gt;
        {this.state.username}'s last gist is
        &lt;a href={this.state.lastGistUrl}&gt;here&lt;/a&gt;.
      &lt;/div&gt;
    );
  }
});

ReactDOM.render(
  &lt;UserGist source="https://api.github.com/users/octocat/gists" /&gt;,
  document.body
);
</pre>

我们甚至可以把一个Promise对象传入组件。

<pre>
ReactDOM.render(
  &lt;RepoList
    promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
  /&gt;,
  document.body
);
</pre>

如果Promise对象正在抓取数据(pending状态)，组件显示“正在加载”；如果Promise对象报错（rejected状态），组件显示报错信息，如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

