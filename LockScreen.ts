/*
 * 特别声明：本技术材料受《中华人民共和国著作权法》、《计算机软件保护条例》等法律、法规、行政
 * 规章以及有关国际条约的保护，赞同科技享有知识产权、保留一切权利并视其为技术秘密。未经本公司书
 * 面许可，任何人不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使用，
 * 不得向第三方泄露、透露、披露。否则，本公司将依法追究侵权者的法律责任。特此声明！
 *
 * Special Declaration: These technical material reserved as the technical secrets by AGREE 
 * TECHNOLOGY have been protected by the "Copyright Law" "ordinances on Protection of Computer 
 * Software" and other relevant administrative regulations and international treaties. Without 
 * the written permission of the Company, no person may use (including but not limited to the 
 * illegal copy, distribute, display, image, upload, and download) and disclose the above 
 * technical documents to any third party. Otherwise, any infringer shall afford the legal 
 * liability to the company.
 */
import {Widget} from "./Widget";
import {Composite} from "./Composite";
import {ADORE} from "../ADORE";
import {EventHub} from "../event/EventHub";
import {MessageType} from "../event/MessageType";
import {Event} from "../event/Event";
import GesturePwd = require("../jquery.gesture.password");

export class LockScreen extends Widget {

    private static Template: string = `<div></div>`;

    constructor(parentId: string, id: string, style: number) {
        super(parentId, id, style);
        this.$thisNode = $(LockScreen.Template).attr({ id: id });
        let that = this;
        this.$thisNode.on("hasPasswd", function (e, passwd) {
            let result: boolean;

            if (passwd === "1235789") {

                result = true;
            }
            else {
                result = false;
            }

            if (result === true) {
                that.$thisNode.trigger("passwdRight");
                setTimeout(function () {
                    //密码验证正确后的其他操作，打开新的页面等。。。
                    alert("密码正确！")
                }, 500);  //延迟半秒以照顾视觉效果
            }
            else {
                that.$thisNode.trigger("passwdWrong");

                //密码验证错误后的其他操作。。。

            }
        });
    }

    public setPwd(args: { pwd: string }) {

    }
}