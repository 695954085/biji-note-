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