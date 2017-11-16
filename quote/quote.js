/**
 * quote.js 基于jquery和layer的装修报价插件
 * 若页面已引入jquery(版本大于1.8.0)和layer(版本大于3.1)
 * 可注释本页第11和12行代码,注意先后顺序
 * @version v 1.0
 * @author underclound<underclound@163.com>
 * @copyright 选装网 © 2016-2017
 * @link http://www.028hdzx.com
 * Everyone should keep code elegant.
 */

;document.writeln('<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>');
document.writeln('<script src="http://kf.028hdzx.com/kf/layer/layer.js"></script>');
(function (window, document) {
    var Quote = function (time) {
        var _this = this;
            _this.time = time * 1000 || 8000; //若没有定义time 默认8秒后调用
            _this.implement = '/'; //接口地址
        //省份
        _this.province = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','西藏'];
        //主要城市
        _this.city = [
            ['北京'],
            ['天津'],
            ['石家庄','唐山','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水'],
            ['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'],
            ['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安盟','锡林郭勒盟','阿拉善盟'],
            ['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'],
            ['长春','吉林','四平','辽源','通化','白山','松原','白城','延边朝鲜族自治州'],
            ['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭地区'],
            ['上海'],
            ['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','秦州','宿迁'],
            ['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水'],
            ['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','六安','亳州','池州','宣城'],
            ['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德'],
            ['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶'],
            ['济南','青岛','淄博','枣庄','东营','烟台','潍坊','济宁','泰安','威海','日照','莱芜','临沂','德州','聊城','滨州','菏泽'],
            ['郑州','开封','洛阳','平顶山','安阳','鹤壁','新乡','焦作','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店'],
            ['武汉','黄石','十堰','宜昌','襄阳','鄂州','津门','孝感','荆州','黄冈','咸宁','随州','恩施','仙桃','潜江','天门','神农架'],
            ['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西土家族苗族自治州'],
            ['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'],
            ['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左'],
            ['海口','三亚','三沙','五指山','琼海','儋州','文昌','万宁','东方','定安县','屯昌县','澄迈县','临高县','白沙黎族自治县','昌江黎族自治县','乐东黎族自治县','陵水黎族自治县','保亭黎族苗族自治县','琼中黎族苗族自治县'],
            ['重庆'],
            ['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','眉山','宜宾','广安','达州','雅安','巴中','资阳','阿坝藏族羌族自治州','甘孜藏族自治州','凉山彝族自治州'],
            ['贵阳','六盘水','遵义','安顺','毕节','铜仁','黔西南布依族苗族自治州','黔东南苗族侗族自治州','黔南布依族苗族自治州'],
            ['昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','楚雄彝族自治州','红河哈尼族彝族自治州','文山壮族苗族自治州','西双版纳傣族自治州','大理白族自治州','德宏傣族景颇族自治州','怒江傈僳族自治州','迪庆藏族自治州'],
            ['拉萨','昌都地区','山南地区','日喀则地区','那曲地区','阿里地区','林芝地区'],
            ['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛'],
            ['兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏回族自治州','甘南藏族自治州'],
            ['西宁','海东地区','海北藏族自治州','黄南藏族自治州','海南藏族自治州','果洛藏族自治州','玉树藏族自治州','海西蒙古族藏族自治州'],
            ['银川','石嘴山','吴忠','固原','中卫'],
            ['乌鲁木齐','克拉玛依','吐鲁番地区','哈密地区','昌吉回族自治州','博尔塔拉蒙古自治州','巴音郭楞蒙古自治州','阿克苏地区','克孜勒苏柯尔克孜自治州','喀什地区','和田地区','伊犁哈萨克自治州','塔城地区','阿勒泰地区','石河子','阿拉尔','图木舒克','五家渠']
        ];

        _this._init();

        //延时调用
        setTimeout(function () {
            $(".common-tender-wrapper").show();
        },_this.time);

    };
    //重写原型
    Quote.prototype = {

        //初始化方法-----------------------------------------
        _init:function () {
            _this = this;
            //初始化层叠样式----------------------------------
            _this.renderStyle();
            //初始化html界面----------------------------------
            _this.renderHtml();
            //-----------------------------------------------
            //初始化省份选择器
            var mfbj = $(".popup-mfbj-province[name=shen]");//两个选择省份的select对象
            var mfsj = $(".popup-mfsj-province[name=shen]");
            _this.appendProvince(mfbj);
            _this.appendProvince(mfsj);
            //-----------------------------------------------
            //启用免费报价/免费设计 切换效果
            _this.switch();
            //启用报价值随机变化效果---------------------------
            _this.randomQuote();
            //启用提交数据接口--------------------------------
            _this.submit();
            //监听关闭事件------------------------------------
            $(".popup-close").click(function () {
                _this.closeWindow();
            })
        },
        //提交数据--------------------------------------------
        submit:function () {
            var _this = this;
            var quote = $("#mfbj-submit-btn");
            var design = $("#mfsj-submit-btn");
            quote.click(function () {
                if(_this.validate("mfbj")) {
                    _this.ajax("mfbj");
                }
            });
            design.click(function () {
                if(_this.validate("mfsj")) {
                    _this.ajax("mfsj");
                }
            });
        },
        //自定义ajax------------------------------------------
        ajax:function (cdkey) {
            var _this_ = this;
            var province = $(".popup-" + cdkey + "-province").val();
            var city = $(".popup-" + cdkey + "-city").val();
            var phone = $(".popup-" + cdkey + "-phone").val();
            var area = '', room = '', hall = '', kitchen ='',toilet ='', balcony = '';
            if(cdkey === "mfbj") {
                area = $("#square").val();
                room = $(".popup-mfbj-shi[name=shi]").val();
                hall = $(".popup-mfbj-ting[name=ting]").val();
                kitchen = $(".popup-mfbj-chu[name=chu]").val();
                toilet = $(".popup-mfbj-wei[name=wei]").val();
                balcony = $(".popup-mfbj-yt[name=yangtai]").val();
            } else if (cdkey === "mfsj") {
                var username = $("#username").val();
            }

            //对接后台数据库-------------------------------------
            var load = layer.load(0, {shade: false});
            $.ajax({
                type:'post',
                url: _this_.implement,//接口地址
                data:{province:province,city:city,username:username,phone:phone,area:area,room:room,hall:hall,kitchen:kitchen,toilet:toilet,balcony:balcony},
                success:function (e) {
                    setTimeout(function () {
                        layer.close(load);
                        layer.msg('您的报价已在后台生成，我们将尽快与您取得联系！');
                    },2000)
                },
                error:function (e) {
                    setTimeout(function () {
                        layer.close(load);
                        layer.msg('服务器忙，请稍后重试！');
                    },2000)
                }
            });
        },
        //数据初步校验----------------------------------------------
        validate:function (cdkey) {
            if(cdkey !== "mfbj" && cdkey !== "mfsj") {
                return false;
            }
            if($(".popup-" + cdkey + "-province[name=shen]").val() == "") {
                this.showMsg('请选择省份',$(".popup-" + cdkey + "-province[name=shen]"));
                return false;
            }
            if($(".popup-" + cdkey + "-city[name=city]").val() == "") {
                this.showMsg('请选择城市',$(".popup-" + cdkey + "-city[name=city]"));
                return false;
            }
            if( cdkey === "mfbj" && $("#square").val() == "" ) {
                this.showMsg('面积不能为空',$("#square"));
                return false;
            } else if(cdkey === "mfbj" && (!/^\d{2,4}(\.\d{1,2})?$/.test($("#square").val()) || parseFloat($("#square").val()) <= 0)) {
                this.showMsg('面积格式不正确，请输入数字',$("#square"));
                return false;
            } else if(cdkey === "mfsj" && $("#username").val() == "") {
                this.showMsg('称呼不能为空',$("#username"));
                return false;
            }
            if($(".popup-" + cdkey + "-phone[name=phone]").val() == "") {
                this.showMsg('手机号码不能为空', $(".popup-" + cdkey + "-phone[name=phone]"));
                return false;
            }
            if(!/^1[345678]\d{9}$/.test($(".popup-" + cdkey + "-phone[name=phone]").val())) {
                this.showMsg('手机号码不正确',$(".popup-" + cdkey + "-phone[name=phone]"));
                return false;
            }
            return true;
        },
        //报价随机值动画------------------------------------------------
        randomQuote:function () {
            var _this_ = this;
            setTimeout(function () {
                $("#popup-bj-price").text(Math.ceil(Math.random()*190000 + 10000));
                _this_.randomQuote();
            },200)
        },
        //切换器 免费设计和免费报价之间相互切换----------------------------
        switch:function () {
            var tabs = $("#popup-tabs li");
            tabs.click(function () {
                tabs.removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                if(index === 0 ) {
                    $(".popup-mfbj").css("display","block");
                    $(".popup-mfsj").css("display","none");
                } else if(index === 1) {
                    $(".popup-mfbj").css("display","none");
                    $(".popup-mfsj").css("display","block");
                }
            })
        },
        //渲染层叠样式---------------------------------------------------
        renderStyle:function () {
            document.writeln("<style>");
            document.writeln("\
                blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,html,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0}\
                a,a:active,a:hover{text-decoration:none}\
                body,button,input,select,textarea{font:12px/1.5 'Source Han Sans SC','HanHei SC','PingFang SC','Helvetica Neue',Helvetica,'Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;color:#333}\
                button,h1,h2,h3,h4,h5,h6,input,select,textarea{font-size:100%}\
                a,button,input,select,textarea{font-family:'Source Han Sans SC','HanHei SC','PingFang SC','Helvetica Neue',Helvetica,'Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;outline:0}\
                address,cite,dfn,em,var{font-style:normal}\
                dl,ol,ul{list-style:none}\
                a{cursor:pointer;color:#666}\
                img{border:0}\
                table{border-collapse:collapse;border-spacing:0}\
                .clearfix{*zoom:1}\
                .clearfix:after{display:block;clear:both;content:'\0020';visibility:hidden;height:0}\
            ");

            document.writeln("\
            .common-tender-wrapper{position:fixed;left:0;top:0;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYxOEEzODk0MzI0NzExRTc4NkI3ODg2QzkyMEQyRjIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYxOEEzODk1MzI0NzExRTc4NkI3ODg2QzkyMEQyRjIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjE4QTM4OTIzMjQ3MTFFNzg2Qjc4ODZDOTIwRDJGMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjE4QTM4OTMzMjQ3MTFFNzg2Qjc4ODZDOTIwRDJGMjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5F2vrqAAAAD0lEQVR42mJgYGA4BBBgAADHAMOuvqBZAAAAAElFTkSuQmCC) repeat;z-index:9999}\n" +
                "        .common-tender-popup{position:absolute;left:50%;top:50%;margin-left:-490px;margin-top:-228px;width:980px;height:auto;background:#fff}\n" +
                "        .common-tender-popup .popup-tabs{position:absolute;left:-43px;top:0;width:43px;height:100%}\n" +
                "        .common-tender-popup .popup-tabs li{position:relative;float:left;width:100%;height:50%;border-left:3px solid #e8e8e8;background:#e8e8e8;cursor:pointer}\n" +
                "        .common-tender-popup .popup-tabs li.active{border-left:3px solid #01af63;background:#fff;color:#01af63}\n" +
                "        .common-tender-popup .popup-tabs-item{display:block;position:absolute;top:50%;left:50%;height:78px;width:20px;margin-top:-39px;margin-left:-10px;line-height:16px;font-size:14px}\n" +
                "        .common-tender-popup .popup-content,.common-tender-popup .popup-main{width:100%}\n" +
                "        .common-tender-popup .popup-content-left,.common-tender-popup .popup-content-right{float:left;width:489px;height:465px}\n" +
                "        .common-tender-popup .popup-content-left{border-right:1px solid #ddd}\n" +
                "        .common-tender-popup .popup-title{padding-top:60px;font-size:28px;text-align:center;color:#333;line-height:36px;font-weight:400}\n" +
                "        .common-tender-popup .popup-title-count{color:#fe5f00;margin:0 15px}\n" +
                "        .common-tender-popup .popup-title-count-right{color:#fe5f00;width:108px;margin:0;display:inline-block}\n" +
                "        .common-tender-popup .popup-title-unit{font-size:14px;color:#333;font-weight:400}\n" +
                "        .popup-content-explain{margin-bottom:20px;margin-left:88px;color:#fe5f00}\n" +
                "        .common-tender-popup .popup-close{position:absolute;top:10px;right:15px;width:28px;cursor:pointer;height:37px;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -129px -625px}\n" +
                "        .common-tender-popup .form-error{display:block;position:absolute;margin-left:88px;line-height:15px;font-size:12px;color:#ff6767}\n" +
                "        .common-tender-popup .form-error .form-error-icon{display:inline-block;width:20px;height:20px;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -100px -624px;vertical-align:top}\n" +
                "        .mfbj-left-result,.mfbj-right-result{display:none}\n" +
                "        .popup-mfbj .popup-mfbj-tip{margin-top:10px;text-align:center;color:#666}\n" +
                "        .popup-mfbj .popup-mfbj-del{margin-left:10px;color:#bbb;font-size:14px}\n" +
                "        .popup-mfbj .popup-mfbj-tip-num{color:#fe5f00}\n" +
                "        .popup-mfbj .popup-form{padding:10px 40px}\n" +
                "        .popup-form .popup-form-group{position:relative;margin-bottom:20px;line-height:36px;font-size:14px}\n" +
                "        .popup-form .popup-form-huxing-bottom{padding-left:88px}\n" +
                "        .popup-form .popup-form-label{float:left;position:relative;width:88px}\n" +
                "        .popup-form .popup-form-control{float:left}\n" +
                "        .popup-form .popup-form-control.popup-mfbj-city,.popup-form .popup-form-control.popup-mfbj-province{width:111px}\n" +
                "        .popup-form .popup-form-control.popup-mfbj-city{margin-left:10px}\n" +
                "        .popup-form .popup-form-required{position:relative;top:4px;color:#fe5f00;font-size:24px;vertical-align:middle;margin-right:6px}\n" +
                "        .popup-form .popup-form-control{width:212px;padding:8px 9px 7px;border:1px solid #ddd;vertical-align:middle;left:98px}\n" +
                "        .popup-form .popup-form-sup{position:absolute;right:100px;color:#333}\n" +
                "        .popup-mfbj .popup-form-control.popup-mfbj-chu,.popup-mfbj .popup-form-control.popup-mfbj-shi,.popup-mfbj .popup-form-control.popup-mfbj-ting{width:74px;margin-bottom:10px}\n" +
                "        .popup-mfbj .popup-form-control.popup-mfbj-wei,.popup-mfbj .popup-form-control.popup-mfbj-yt{width:111px}\n" +
                "        .popup-mfbj .popup-form-control.popup-mfbj-chu,.popup-mfbj .popup-form-control.popup-mfbj-ting{margin-left:5px}\n" +
                "        .popup-mfbj .popup-form-control.popup-mfbj-yt{margin-left:10px}\n" +
                "        .common-tender-popup .popup-title.mfbj-title{padding-top:58px;font-size:30px;font-weight:400}\n" +
                "        .common-tender-popup .popup-title.mfbj-title .mfbj-title-text{font-size:18px}\n" +
                "        .mfbj-right-init .mfbj-title-text{font-size:28px!important}\n" +
                "        .mfbj-right-init .mfbj-price-result-list{width:315px}\n" +
                "        .mfbj-price-result{padding:15px 40px 0}\n" +
                "        .mfbj-price-result-list{width:325px;margin:0 auto;padding:40px 0;border:1px solid #ddd}\n" +
                "        .mfbj-price-result-item{height:40px}\n" +
                "        .mfbj-price-result-item span{float:left;width:48%;height:40px;line-height:40px;text-align:right;font-size:14px}\n" +
                "        .mfbj-price-result-item strong{float:right;width:52%;height:40px;line-height:40px;margin-left:0;font-weight:400;font-size:12px}\n" +
                "        .mfbj-price-result-item strong em{text-align:center;padding:0 18px;font-weight:700;font-size:14px}\n" +
                "        .mfbj-left-result .mfbj-price-footer{margin:15px 43px 0}\n" +
                "        .mfbj-price-footer-call{color:#fe5f00}\n" +
                "        .mfbj-submit-btn{display:block;position:absolute;top:162px;left:422px;width:132px;height:143px;background:#fefefe url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -18px -10px}\n" +
                "        .mfbj-submit-btn-text{position:absolute;top:46px;left:53px;font-size:16px;width:39px;color:#fff;cursor:pointer}\n" +
                "        .mfbj-submit-btn:hover{background-position-x:-174px}\n" +
                "        .mfbj-submit-btn:active{background-position-x:-331px}\n" +
                "        .mfbj-right-result .pop-check-info,.mfbj-right-result .tender-pop-left{display:none}\n" +
                "        .mfbj-right-result .tender-pop-right{float:left;margin-left:16px;padding-right:10px;border-right:1px solid #e8e8e8}\n" +
                "        .mfbj-right-result .pop-check-info{display:block;position:relative;float:left;width:375px;margin:64px 0 0 62px;color:#333;font-size:14px}\n" +
                "        .mfbj-right-result .pop-check-info h3{font-size:18px;color:#333;font-weight:400}\n" +
                "        .mfbj-right-result .pop-check-info h3 span{font-size:12px;color:#fe5f00}\n" +
                "        .mfbj-right-result .pop-check-info .check_question{font-size:14px;color:#999}\n" +
                "        .mfbj-right-result .pop-check-info .house-type{margin-top:15px}\n" +
                "        .mfbj-right-result .pop-check-info .decorate-time{margin-top:16px}\n" +
                "        .mfbj-right-result .pop-check-info .plot-name{margin-top:26px}\n" +
                "        .mfbj-right-result .check-house{float:left;width:110px;height:100px}\n" +
                "        .mfbj-right-result .check-house-last{margin-top:-4px}\n" +
                "        .mfbj-right-result .check-house,.mfbj-right-result .check-time{cursor:pointer}\n" +
                "        .mfbj-right-result .check-house div{width:80px;height:85px;margin:0 auto}\n" +
                "        .mfbj-right-result .decorate-time .check-time{float:left;margin-top:12px}\n" +
                "        .mfbj-right-result .check-house div,.mfbj-right-result .check-house p i,.mfbj-right-result .check-time p i{background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -14px -495px}\n" +
                "        .mfbj-right-result .check-house .old-house{background-position:-140px -493px}\n" +
                "        .mfbj-right-result .check-house .little-change{background-position:-274px -498px}\n" +
                "        .mfbj-right-result .check-house p,.mfbj-right-result .check-time p{position:relative;text-indent:15px;font-size:12px;color:#333}\n" +
                "        .mfbj-right-result .pop-check-info .check-house p{margin-left:27px;margin-top:-6px}\n" +
                "        .mfbj-right-result .pop-check-info .check-house-last p{margin-top:-2px}\n" +
                "        .mfbj-right-result .check-time p{text-indent:18px;margin-left:13px}\n" +
                "        .mfbj-right-result .check-time-next p{margin-left:27px}\n" +
                "        .mfbj-right-result .check-house p i,.mfbj-right-result .check-time p i{position:absolute;width:15px;height:15px;left:0;top:2px;background-position:-49px -623px}\n" +
                "        .mfbj-right-result .check-house.on p i,.mfbj-right-result .check-time.on p i{background-position:-24px -623px}\n" +
                "        .mfbj-right-result .plot-name .check_question{float:left;margin-top:5px}\n" +
                "        .mfbj-right-result .plot-name input{width:229px;height:30px;text-indent:6px;border:1px solid #e8e8e8}\n" +
                "        .mfbj-right-result .check-upload,.mfbj-right-result .check-upload:hover{display:block;width:80px;height:32px;background-color:#ff701a;color:#fff;text-align:center;line-height:32px;margin:0 auto;margin-top:28px}\n" +
                "        .mfbj-right-result .pop-check-info .complate-form{display:none;position:absolute;top:148px;left:90px;width:180px;height:42px;background:#000;filter:alpha(opacity=60);opacity:.6;text-align:center;line-height:42px;font-size:14px;color:#fff}\n" +
                "        .check_pop_succ{display:none;z-index:10000}\n" +
                "        .check_pop_succ,.check_pop_succ .check_grey_layer{position:fixed;top:0;left:0;width:100%;height:100%}\n" +
                "        .check_pop_succ .check_grey_layer{background:#000;filter:alpha(opacity=60);opacity:.6}\n" +
                "        .check_pop_succ .check_pop_tip{position:absolute;top:248px;z-index:2;width:320px;height:237px;background-color:#fff;border-radius:4px;text-align:center}\n" +
                "        .check_pop_tip .check_pop_img{width:69px;height:69px;margin:0 auto;margin-top:20px;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -197px -610px}\n" +
                "        .check_pop_tip .check_pop_text{font-size:16px;color:#333}\n" +
                "        .check_pop_tip .check_pop_recall{margin-top:4px;font-size:12px;color:#999}\n" +
                "        .check_pop_tip .check_pop_recall span{color:#fe6022}\n" +
                "        .check_pop_tip .close_check_pop,.check_pop_tip .close_check_pop:hover{display:block;width:100px;height:32px;line-height:32px;font-size:12px;color:#666;border-radius:2px;border:1px solid #e8e8e8;margin:0 auto;margin-top:18px}\n" +
                "        .common-tender-popup .popup-mfsj{display:none}\n" +
                "        .popup-mfsj .popup-form{width:360px;margin:30px auto 0;padding:10px 40px}\n" +
                "        .popup-mfsj .popup-form .popup-form-control{width:236px}\n" +
                "        .popup-form .popup-form-control.popup-mfsj-city,.popup-form .popup-form-control.popup-mfsj-province{width:123px}\n" +
                "        .popup-form .popup-form-control.popup-mfsj-city{margin-left:11px}\n" +
                "        .popup-mfsj .popup-mfsj-agree{margin-left:88px;margin-bottom:20px}\n" +
                "        .popup-mfsj .popup-mfsj-agree-text{margin-left:5px}\n" +
                "        .popup-mfsj .popup-mfsj-agree-text a{color:#01af63}\n" +
                "        .popup-mfsj .popup-mfsj-btn{background:#fe5f00;display:block;margin:30px auto 20px;width:100px;height:28px;color:#fff;border-radius:6px;text-align:center;padding-top:10px}\n" +
                "        .popup-mfsj .popup-mfsj-btn.not-allow{background:#ddd;cursor:not-allowed}\n" +
                "        .common-tender-popup .popup-title.mfsj-title{padding-top:62px}\n" +
                "        .common-tender-popup .popup-mfsj-img{width:375px;height:270px;margin:25px auto 0;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -280px -191px}\n" +
                "        .popup-mfsj-result-left{display:none}\n" +
                "        .popup-mfsj-result-left .popup-mfsj-result-title{padding-top:60px;font-size:28px;text-align:center;color:#333;line-height:36px}\n" +
                "        .popup-mfsj-result-left .popup-mfsj-result-con{padding:10px 40px;line-height:36px;text-align:center}\n" +
                "        .popup-mfsj-result-left .popup-mfsj-result-text{font-size:14px;margin-bottom:17px}\n" +
                "        .popup-mfsj-result-left .popup-mfsj-result-mflf{display:block;width:131px;height:118px;margin:0 auto 17px;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat -310px -581px}\n" +
                "        .popup-mfsj-result-left .popup-mfsj-result-explain{margin-top:50px;margin-bottom:17px;line-height:36px;color:#fe5f00;font-size:14px}\n" +
                "        .popup-mfsj-right-result{display:none;padding:44px 90px 0}\n" +
                "        .popup-mfsj-right-result-img{display:block;width:303px;height:322px;background:url(http://kf.028hdzx.com/kf/img/common_bg.png?v=20170802) no-repeat 7px -153px}\
                            ");
            document.writeln("</style>")
        },
        //渲染html------------------------------------------------------
        renderHtml:function () {
            document.writeln("\
            <div class=\"common-tender-wrapper\" style='display:none;'>\n" +
                "    <div class=\"common-tender-popup\">\n" +
                "        <ul class=\"popup-tabs clearfix\" id=\"popup-tabs\">\n" +
                "            <li class=\"active\" data-ptag=\"1_1_1_846\" data-expose=\"true\"><span class=\"popup-tabs-item\" >免费报价</span></li>\n" +
                "            <li data-ptag=\"1_1_1_1039\" class=\"\" data-expose=\"true\"><span class=\"popup-tabs-item\" >免费设计</span></li>\n" +
                "        </ul>\n" +
                "        <div class=\"popup-main\">\n" +
                "            <div class=\"popup-mfbj popup-content clearfix\" style=\"display: block;\">\n" +
                "                <div class=\"popup-content-left mfbj-left-init\">\n" +
                "                    <h6 class=\"popup-title\">免费获取装修报价</h6>\n" +
                "                    <div class=\"popup-mfbj-tip\">今天已有<span class=\"popup-mfbj-tip-num\">2342</span>位业主获取了装修预算</div>\n" +
                "                    <form class=\"popup-form\" id=\"mfbjForm\">\n" +
                "                        <div class=\"popup-form-group\">\n" +
                "                            <div class=\"popup-form-group-box clearfix\">\n" +
                "                                <span class=\"popup-form-label\">所在城市 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                <div id=\"mfbj-Popup-area\">\n" +
                "                                    <select class=\"popup-form-control popup-mfbj-province prov\" name=\"shen\">\n" +
                                                         //此处循环获取省份
                "                                    </select>\n" +
                "                                    <select class=\"popup-form-control popup-mfbj-city city\" name=\"city\">\n" +
                "                                        <option value='' selected>请选择</option>"+
                                                         //根据省份循环获取城市列表
                "                                    </select>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"popup-form-group\">\n" +
                "                            <div class=\"popup-form-group-box clearfix\">\n" +
                "                                <span class=\"popup-form-label\">房屋面积 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                <input class=\"popup-form-control\" name=\"square\" id=\"square\" placeholder=\"输入您的房屋面积\">\n" +
                "                                <em class=\"popup-form-sup\">m²</em>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"popup-form-group\">\n" +
                "                        <div class=\"popup-form-group-box\">\n" +
                "                            <div class=\"popup-form-huxing-top clearfix\">\n" +
                "                            <span class=\"popup-form-label\">房屋户型 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                            <select class=\"popup-form-control popup-mfbj-shi\" name=\"shi\">\n" +
                "                                <option value=\"1\">1室</option>\n" +
                "                                <option value=\"2\">2室</option>\n" +
                "                                <option value=\"3\">3室</option>\n" +
                "                                <option value=\"4\">4室</option>\n" +
                "                                <option value=\"5\">5室</option>\n" +
                "                                <option value=\"6\">6室</option>\n" +
                "                            </select>\n" +
                "                            <select class=\"popup-form-control popup-mfbj-ting\" name=\"ting\">\n" +
                "                                <option value=\"1\">1厅</option>\n" +
                "                                <option value=\"2\">2厅</option>\n" +
                "                                <option value=\"3\">3厅</option>\n" +
                "                                <option value=\"4\">4厅</option>\n" +
                "                                <option value=\"5\">5厅</option>\n" +
                "                                <option value=\"6\">6厅</option>\n" +
                "                            </select>\n" +
                "                            <select class=\"popup-form-control popup-mfbj-chu\" name=\"chu\">\n" +
                "                                <option value=\"1\">1厨</option>\n" +
                "                                <option value=\"2\">2厨</option>\n" +
                "                                <option value=\"3\">3厨</option>\n" +
                "                            </select>\n" +
                "                        </div>\n" +
                "                            <div class=\"popup-form-huxing-bottom clearfix\">\n" +
                "                                <select class=\"popup-form-control popup-mfbj-wei\" name=\"wei\">\n" +
                "                                    <option value=\"1\">1卫</option>\n" +
                "                                    <option value=\"2\">2卫</option>\n" +
                "                                    <option value=\"3\">3卫</option>\n" +
                "                                    <option value=\"4\">4卫</option>\n" +
                "                                    <option value=\"5\">5卫</option>\n" +
                "                                    <option value=\"6\">6卫</option>\n" +
                "                                </select>\n" +
                "                                <select class=\"popup-form-control popup-mfbj-yt\" name=\"yangtai\">\n" +
                "                                    <option value=\"1\">1阳台</option>\n" +
                "                                    <option value=\"2\">2阳台</option>\n" +
                "                                    <option value=\"3\">3阳台</option>\n" +
                "                                    <option value=\"4\">4阳台</option>\n" +
                "                                    <option value=\"5\">5阳台</option>\n" +
                "                                    <option value=\"6\">6阳台</option>\n" +
                "                                </select>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                        <div class=\"popup-form-group\">\n" +
                "                            <div class=\"popup-form-group-box clearfix\">\n" +
                "                                <span class=\"popup-form-label\">手机号码 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                <input class=\"popup-form-control popup-mfbj-phone\" name=\"phone\" placeholder=\"我们将发送预算明细到您的手机\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"popup-content-explain\">*为了您的权益，您的隐私将被严格保密</div>\n" +
                "                    </form>\n" +
                "                    <a href=\"javascript:void(0)\" id=\"mfbj-submit-btn\" data-ptag=\"1_1_1_846\" class=\"mfbj-submit-btn\">\n" +
                "                        <span class=\"mfbj-submit-btn-text\">开始计算</span>\n" +
                "                    </a>\n" +
                "                </div>\n" +
                "                <div class=\"popup-content-left mfbj-left-result\">\n" +
                "                    <h6 class=\"popup-title mfbj-title\">\n" +
                "                        <em class=\"mfbj-title-text\">您家的装修预算为：</em>\n" +
                "                        <span class=\"popup-title-count\" id=\"priceTotal\">?</span>\n" +
                "                        <em class=\"popup-title-unit\">万元</em>\n" +
                "                    </h6>\n" +
                "                    <div class=\"mfbj-price-result\">\n" +
                "                        <div class=\"mfbj-price-result-detail\">\n" +
                "                            <ul class=\"mfbj-price-result-list\">\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>材料费 : </span><strong id=\"priceMterials\"><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>人工费 : </span><strong id=\"priceArtificial\"><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>设计费 : </span><strong id=\"priceDesign\"><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>质检费 : </span><strong id=\"priceQuality\"><em>？</em>元</strong></li>\n" +
                "                            </ul></div>\n" +
                "                        <div class=\"mfbj-price-footer\">\n" +
                "                            <p class=\"mfbj-price-footer-call\">* 报价有疑问？稍后装修管家将致电为您解答</p>\n" +
                "                             <p>* 该报价为毛坯半包价，实际装修报价以量房实测为准。</p>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"popup-content-right mfbj-right-init\">\n" +
                "                    <h6 class=\"popup-title mfbj-title\">\n" +
                "                        <em class=\"mfbj-title-text\">您家的装修预算为:</em>\n" +
                "                        <span class=\"popup-title-count-right\" id=\"popup-bj-price\">148165</span>\n" +
                "                        <em class=\"popup-title-unit\">元</em>\n" +
                "                    </h6>\n" +
                "                    <div class=\"mfbj-price-result\">\n" +
                "                        <div class=\"mfbj-price-result-detail\">\n" +
                "                            <ul class=\"mfbj-price-result-list\">\n" +
                "                                <li class=\"mfbj-price-result-item\">\n" +
                "                                    <span>材料费 : </span><strong><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>人工费 : </span><strong><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>设计费 : </span><strong><em>？</em>元</strong></li>\n" +
                "                                <li class=\"mfbj-price-result-item\"><span>质检费 : </span><strong><em>？</em>元</strong></li>\n" +
                "                            </ul>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"popup-content-right mfbj-right-result\">\n" +
                "                    <div class=\"pop-check-info\">\n" +
                "                        <h3>完善以下信息<span>&nbsp;&nbsp;&nbsp;让我们更了解您的需求优先为您服务</span></h3>\n" +
                "                        <div class=\"house-type clearfix\">\n" +
                "                            <p class=\"check_question\">1.&nbsp;您家的房屋现状是 :</p>\n" +
                "                            <div class=\"check-house\" data-ptag=\"0\"><div></div><p><i></i>毛坯房</p><input type=\"hidden\" value=\"毛坯房\"></div>\n" +
                "                            <div class=\"check-house\" data-ptag=\"1\">\n" +
                "                                <div class=\"old-house\"></div>\n" +
                "                                <p><i></i>旧房翻新</p>\n" +
                "                                <input type=\"hidden\" value=\"旧房翻新\">\n" +
                "                            </div>\n" +
                "                            <div class=\"check-house check-house-last\" data-ptag=\"2\">\n" +
                "                                <div class=\"little-change\"></div>\n" +
                "                                <p><i></i>局部改造</p>\n" +
                "                                <input type=\"hidden\" value=\"局部改造\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"decorate-time clearfix\">\n" +
                "                            <p class=\"check_question\">2.&nbsp;您家准备什么时候开始装修 :</p>\n" +
                "                            <div class=\"check-time\" data-ptag=\"4\"><p><i></i>一个月内</p><input type=\"hidden\" value=\"1个月内\"></div>\n" +
                "                            <div class=\"check-time check-time-next\" data-ptag=\"5\"><p><i></i>两个月内</p><input type=\"hidden\" value=\"2个月内\"></div>\n" +
                "                            <div class=\"check-time check-time-next\" data-ptag=\"6\">\n" +
                "                                <p><i></i>两个月以上</p><input type=\"hidden\" value=\"两个月以上\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"plot-name clearfix\">\n" +
                "                            <p class=\"check_question\">3.&nbsp;您家小区名称 :&nbsp;&nbsp;</p>\n" +
                "                            <input type=\"text\" placeholder=\"土巴兔将为您推荐优质施工方\" maxlength=\"24\">\n" +
                "                        </div>\n" +
                "                        <a href=\"javascript:void(0);\" class=\"check-upload\">提交</a>\n" +
                "                        <div class=\"complate-form\"><p>请选择您家的装修时间</p></div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"popup-mfsj popup-content clearfix\" style=\"display: none;\">\n" +
                "                <div class=\"popup-content-left\">\n" +
                "                    <div class=\"popup-mfsj-init\">\n" +
                "                        <h6 class=\"popup-title\">免费户型设计</h6>\n" +
                "                        <form class=\"popup-form\" id=\"mfsjForm\">\n" +
                "                            <div class=\"popup-form-group\">\n" +
                "                                <div class=\"popup-form-group-box clearfix\">\n" +
                "                                    <span class=\"popup-form-label\">所在城市 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                    <div id=\"mfsj-Popup-area\">\n" +
                "                                        <select class=\"popup-form-control popup-mfsj-province prov\" name=\"shen\">\n" +
                                                            //初始化省份列表
                "                                        </select>\n" +
                "                                        <select class=\"popup-form-control popup-mfsj-city city\" name=\"city\">\n" +
                "                                            <option value=\"\" selected=\"selected\">请选择</option>\n" +
                                                             //根据省份循环城市列表
                "                                        </select></div></div></div><div class=\"popup-form-group\">\n" +
                "                            <div class=\"popup-form-group-box clearfix\">\n" +
                "                                <span class=\"popup-form-label\">您的称呼 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                <input class=\"popup-form-control popup-mfsj-username\" name=\"username\" id=\"username\" placeholder=\"请输入您的称呼\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                            <div class=\"popup-form-group\">\n" +
                "                                <div class=\"popup-form-group-box clearfix\">\n" +
                "                                    <span class=\"popup-form-label\">手机号码 : <span class=\"popup-form-required\">*</span></span>\n" +
                "                                    <input class=\"popup-form-control popup-mfsj-phone\" name=\"phone\" placeholder=\"填写手机号，抢免费设计名额\">\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                            <div class=\"popup-mfsj-agree\">\n" +
                "                                <input type=\"checkbox\" checked=\"checked\" id=\"popup-mfsj-agree-btn\">\n" +
                "                                <span class=\"popup-mfsj-agree-text\">我已阅读并接受<a href=\"\">《装修常见问题条款》</a></span>\n" +
                "                            </div>\n" +
                "                            <a class=\"popup-mfsj-btn\" id=\"mfsj-submit-btn\" data-ptag=\"1_1_1_1039\" href=\"javascript:void(0)\">立即申请</a>\n" +
                "                            <div class=\"popup-content-explain\">*为了您的权益，您的隐私将被严格保密</div>\n" +
                "                        </form>\n" +
                "                    </div>\n" +
                "                    <div class=\"popup-mfsj-result-left\">\n" +
                "                        <h6 class=\"popup-mfsj-result-title\">申请成功！</h6>\n" +
                "                        <div class=\"popup-mfsj-result-con\">\n" +
                "                            <p class=\"popup-mfsj-result-text\">您同时还获得<span>1项增值服务</span></p>\n" +
                "                            <div class=\"popup-mfsj-result-mflf\"></div>\n" +
                "                            <div class=\"popup-mfsj-result-explain\">* 稍后装修管家将致电您，为您提供免费装修咨询服务。</div>\n" +
                "                        </div></div></div><div class=\"popup-content-right\">\n" +
                "                <div class=\"popup-mfsj-right-init\">\n" +
                "                    <h6 class=\"popup-title mfsj-title\">只需4步，享受专属定制</h6>\n" +
                "                    <div class=\"popup-mfsj-img\"></div>\n" +
                "                </div>\n" +
                "                <div class=\"popup-mfsj-right-result\"><em class=\"popup-mfsj-right-result-img\"></em></div>\n" +
                "            </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <span class=\"popup-close\"></span>\n" +
                "    </div>\n" +
                "</div>\
                            ");
        },
        //添加省份------------------------------------------------------
        appendProvince:function (selectObj) {
            var _this = this;
            $(selectObj).append(_this.createProvinceOption());
            _this.choseProvince(selectObj);
        },
        //添加城市------------------------------------------------------
        appendCity:function (selectObj, provinceIndex) {
          var _this = this;
          var selectCity;
          if(/mfbj\S*/.test(selectObj.attr("class"))) {
               selectCity = $(".popup-mfbj-city[name=city]");
          } else {
               selectCity = $(".popup-mfsj-city[name=city]");
          }
          $(selectCity).empty().append(_this.createCityOption(provinceIndex));
        },
        //选择省份生成该省的城市列表-------------------------------------
        choseProvince:function (selectObj) {
            var _this = this;
            $(selectObj).change(function () {
                var index = this.options.selectedIndex - 1;
                _this.appendCity(selectObj, index);
            });
        },
        //创建省份列表html---------------------------------------------
        createProvinceOption:function () {
            var provinceOptionHtml = "<option value='' selected='selected'>请选择</option>";
            for(var i in this.province) {
                provinceOptionHtml += "<option data-code='" + i + "' value='" + this.province[i] + "'>" + this.province[i] + "</option>";
            }
            return provinceOptionHtml;
        },
        //创建城市列表html---------------------------------------------
        createCityOption:function (provinceIndex) {
            var cityOptionHtml = "<option value='' selected='selected'>请选择</option>";
            for(var i in this.city[provinceIndex]) {
                cityOptionHtml += "<option value='" + this.city[provinceIndex][i] + "'>" + this.city[provinceIndex][i] + "</option>";
            }
            return cityOptionHtml;
        },
        //以下为封装的工具性函数(工具箱)--------------------------------
        //tips提示信息
        showMsg:function (msg, domObj, bgColor, times) {
            var bgColor = arguments[2] ? arguments[2] : 'red';
            var times = arguments[3] ? arguments[3] : 3000;
            layer.tips(msg,domObj, {
                tips: [1, bgColor],
                time: times
            });
        },

        //关闭窗口------------------------------------------------------
        closeWindow:function () {
            $(".common-tender-wrapper").hide();
        }
    };

    window.Quote = Quote;

})(window, document);