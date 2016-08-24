## Java中实现CallBack功能 ##

[http://blog.csdn.net/imzoer/article/details/9422013](http://blog.csdn.net/imzoer/article/details/9422013 "Java中实现CallBack")

<br/>
现在模拟一下场景：

定义三个类。分别是主函数类。callback函数的接口类。业务处理类。在业务处理类中，处理完业务之后，执行一个callback函数。

<pre>
package comz;  
  
public class Main {  
    public static void main(String[] args) {  
        new TestCallBack().compute(1000, new ComputeCallBack() {  
  
            @Override  
            public void onComputeEnd() {  
                System.out.println("end back!!!");  
  
            }  
        });  
    }  
}  
</pre>

这是主函数类。new了一个业务处理类来处理逻辑，并在处理完毕之后，执行callback函数。

<pre>
package comz;  
  
public class TestCallBack {  
  
    public void compute(int n, ComputeCallBack callback) {  
        for (int i = 0; i < n; i++) {  
            System.out.println(i);  
        }  
        callback.onComputeEnd();  
    }  
}  
</pre>
这是业务处理类。仅仅输出一些数字，然后执行回调函数。

<pre>
package comz;  
  
public interface ComputeCallBack {  
    public void onComputeEnd();  
}  
</pre>
这是回调函数的接口。

----------
这里的原理是：

在主类中，新建业务类的时候，传递进入的第二个参数是一个实现了回调接口的匿名类对象。

在业务类中，我们调用了这个对象的onComputeEnd方法。在执行onComputeEnd的时候，jvm会找到这儿对象的函数实现并调用。


## Js实现CallBack回调 ##
<pre>
$(this.id).on("passwdWrong", { that: that }, function (e) {
            that.$ctx.clearRect(0, 0, that.options.width, that.options.height);
            that.$ctx.beginPath();
            that.$ctx.putImageData(that.initImg, 0, 0);
            that.allDraw("#cc1c21");
            that.result = "";
            that.pList = [];
            that.sList = [];

            setTimeout(function () {
                that.$ctx.clearRect(0, 0, that.options.width, that.options.height);
                that.$ctx.beginPath();
                that.initDraw();
            }, 500);

        });
</pre>

$(this.id)绑定一个名为passWrong的回调函数

	 own.$thisNode.trigger("passwdWrong");
通过trigger触发passWrong的回调函数