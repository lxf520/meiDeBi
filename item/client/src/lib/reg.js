$(()=>{
    // $(".password,.repassword").val("123456");
    // $(".phone").val("18689429781");
    // 验证手机
    let phone1=0,yzm=0,psw1=0,psw2=0
    $(".phone").blur(function(){
        let val = $(this).val();
        let reg1 = /^1[3-9]\d{9}$/;
        
        if( reg1.test(val) ){
            phone1 = 1;
            $(".phone").nextAll().css("display","none")
        }
        else if( val == '' ){
            phone1 = 0;
            $("#verphone2").css("display","block").prev().css("display","none")
        }
        else{
            phone1 = 0;
            $("#verphone1").css("display","block").next().css("display","none")
        }
    })
    
    
    // 验证码
    let imgCodeTarget;
    let captcha = new Captcha({ lineNum: 10, dotNum: 3, fontSize: 40, length: 4, content: "012345432424542" });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
        // console.log(r, '验证码1');
        /* 当用户点击图形变化验证码的时候需要重新校验 */
        // $("#imageCode").trigger("blur");
        $(".verify").trigger("blur")
    });

    $(".verify").blur(function(){
        let val = $(this).val();
        if(val == imgCodeTarget){
            yzm = 1;
            $(".verify .verCode").css("display",'none');
            $(".yzm").css("border",'1px solid #ccc');
        }
        else{
            yzm = 0;
            $(".verify .verCode").css("display",'true');
            $(".yzm").css("border",'1px solid orangered');
        }
    })


    // 验证密码
    $(".password").blur(function(){
        let val = $(this).val();
        let reg = /^[a-zA-Z0-9]{6,15}$/;

        var hasNumber  = false; hasbig = false; hassmall = false;
        
        if(reg.test(val)){
            psw1 = 1;
            $("#verpass1,#verpass2").css("display","none")
            // 2.做判断，当密码大于六位，分三种情况，如果有数字或小写字母或大写字母的一种，强度低
            //有数字或小写字母或大写字母的两种，强度中，有数字或小写字母或大写字母的三种，强度高
            for(let i=0; i<val.length; i++){
                var code = val.charCodeAt(i);

                if (code >= 48 && code <= 57) {
                    /* 数字 */
                    hasNumber = true;
                }

                if (code >= 97 && code <= 122) {
                    /* 小写字母 */
                    hassmall = true;
                }

                if (code >= 65 && code <= 90) {
                    /* 大写字母 */
                    hasbig = true;
                }
            }

            // 3.添加样式
            if(hasNumber || hasbig || hassmall){
                $(".pass_bar .t1").css('backgroundColor','#195')
            }
            if(hasNumber & hasbig || hasbig & hassmall || hassmall & hasNumber ){
                $(".pass_bar .t2").css('backgroundColor','orange')
            }
            if(hasNumber & hasbig & hassmall){
                $(".pass_bar .t3").css('backgroundColor','red')
            }

        }
        else if( val == '' ){
            psw1=0;
            $("#verpass2").css("display","block").prev().css("display","none")
        }
        else{
            psw1=0;
            $("#verpass1").css("display","block").next().css("display","none")
        }
    })

    $(".repassword").blur(function(){
        let val = $(this).val();
        let psw = $('.password').val();
        if(val === psw){
            psw2=1;
            $("#pswTest").css("display","none")
            
        }else{
            psw2=0;
            $("#pswTest").css("display","block")
            
        }
    })

    
    $(".btn-submit").click(function() {
        /* 001-检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
        $(".phone,.verify,.password,.repassword").trigger("blur");
        console.log(phone1,yzm,psw1,psw2);
        if (!phone1|!yzm|!psw1|!psw2) {
            return;
        }

        /* 002-检查用户是否勾选了用户协议*/
        let status = $("#protocol").is(":checked");
        console.log(status);
        
        if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意用户协议！");
            return;
        }

        /* 003-发送网络请求把注册相关的信息提交给服务器 */
        let data = {
            phone: $.trim($(".phone").val()),
            password: md5($.trim($(".password").val())).substr(0, 10)
        }

        $.ajax({
            data,
            type: "get",
            dataType: "json",
            url: "../../../server/register.php",
            success(response) {
                // console.log(response);
                /* 如果注册成功，那么就先提示用户然后再跳转 */
                if (response.status == "success") {
                    alert(response.msg);
                    window.location.href = "../html/zhuye.html";
                    Cookie.setItem('username',$.trim($(".phone").val()) );
                    Cookie.setItem("password",md5($.trim($(".password").val())).substr(0, 10))
                } else {
                    alert(response.msg);
                }
            }
        })

    })

})