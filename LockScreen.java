package cn.com.agree.adore.widget;

/**
 * Created by xiachiquan on 2016/7/6.
 */
public class LockScreen extends Widget {

    protected static final String type = "LockScreen";

    @Override
    protected String getType() {
        return type;
    }

    /**
     * 该无参构造器供某些框架使用,如ssh框架。使用该构造器实例化对象过后,应利用该对象的实例
     * 继续调用init(parent,id)函数来通知浏览器创建html控件
     */
    public LockScreen() {
        super();
    }

    /**
     * @param parent 父容器
     */
    public LockScreen(Container parent, int style) {
        super(parent, style);
    }

    public void setPwd(String pwd) {
        checkWidget();
        if (pwd != null) {
            setAttribute("pwd", pwd, "setPwd");
        }
    }
}
