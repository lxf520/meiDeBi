$(() => {

    if(Cookie.hasItem("username") & Cookie.hasItem("password")){
        let username = Cookie.getItem("username");
        let password = Cookie.getItem("password");

        $.ajax({
            type: "post",
            url: "../../../server/login.php",
            data: {username,password},
            dataType: "json",
            success: function (res) {
                if(res.status == 'success'){

                    if( $(".check").is(':checked') ){
                        Cookie.setItem('username',username,15);
                        Cookie.setItem('password',password,15);
                    }
                    window.location.href = '../html/zhuye.html'
                }
            },
        });

    }


    $("footer").load("../../../server/footer.html");

    // 先处理tab切换
    $(".tabTitle").children().click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.boxs').children().eq($(this).index()).addClass('block').siblings().removeClass('block')
    })

    $(".btn-submit").click(function(){
        let username = $(".username").val().trim();
        let password = $(".password").val().trim();

        if(username.length == 0){
            alert("请输入用户名");
        }        
        if(password.length == 0){
            alert("请输入密码");
        }
        $.ajax({
            type: "post",
            url: "../../../server/login.php",
            data: {username,password : md5(password).substr(0, 10)},
            dataType: "json",
            success: function (res) {
                console.log(res);
                
                if(res.status == 'error'){
                    $(".error").css("display","block");
                    setTimeout(() => {
                        $(".error").css("display","none");
                    }, 2000);
                }
                if(res.status == 'success'){
                    $(".success").css("display","block");
                    setTimeout(() => {
                        $(".success").css("display","none");
                        window.location.href = '../html/zhuye.html'
                    }, 2000);

                    if( $(".check").is(':checked') ){
                        Cookie.setItem('username',username,15);
                        Cookie.setItem('password',md5(password).substr(0, 10),15);
                    }
                }
            },
            error: function(res){
                console.log(res);
            }
        });

    })
})