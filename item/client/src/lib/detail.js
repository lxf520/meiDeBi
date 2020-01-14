$(() => {
    $("header").load("../../../server/header.html");
    $("footer").load("../../../server/footer.html");

    let id = decodeURI(  window.location.search.slice(1) );

    $.ajax({
        type: "get",
        url: "../../../server/detail.php",
        data: id,
        dataType: "json",
        success: function (res) {
            renderUI(res)
            fangdajing()
        }
    })

    function renderUI(res){
        let ele = res[0];
        let html = `
    <div class="outbox clearfix">
        <div class="imgbox">
            <span>精</span>
            <img  src=${ele.src} alt="">
            <p class="mask"></p>
            <p class="fdj"><img src=${ele.src} alt=""></p>
            
        </div>
        <a href="">收藏</a>
        <a href="">评论</a>
        <a href="">分享佣金</a>
        <a href="">关注</a>
    </div>
    <div class="info">
        <h2>${ele.title}</h2>
        <h3>￥${ele.price}</h3><span>近期好价</span>
        <div class="line"></div>
        <p class="baoliao">爆料人
            <a href="">雨过天晴</a>
            <span>${ele.time}</span>
        </p>
        <p class="brand">标签
            <span>连衣裙</span>
            <span>考拉海狗</span>
        </p>
        <div class="go">
            直达链接
        </div>
    </div>
        `
        $(".detail").html(html)
    }

    function fangdajing(){
        let smallBox = $(".imgbox")[0];
        let mask = $(".mask")[0];      
        let bigBox = $(".fdj")[0];
        let bigImg = $(".fdj img")[0];  
        $(".imgbox").mouseenter(function(){
            $(".mask,.fdj").css("display","block")
        })

        $(".imgbox").mouseleave(function(){
            $(".mask,.fdj").css("display","none")
        })

        $(".imgbox").mousemove(function(e){
            var mouseX = e.pageX - smallBox.offsetLeft - (mask.offsetWidth/2) ;
                        //鼠标距离可视区的宽度 - 小盒子距离左边的宽度 - 遮罩一半的宽度
            var mouseY = e.pageY - smallBox.offsetTop - (mask.offsetHeight/2) ;

            // 边界判断，超出则为鼠标最大值，小于则为0
            mouseX = mouseX < 0 ? 0 : mouseX;
            mouseY = mouseY < 0 ? 0 : mouseY;
            //允许的最大宽度，为小盒子的宽度 - 遮罩的宽度
            var maxX = smallBox.offsetWidth - mask.offsetWidth;
            var maxY = smallBox.offsetHeight - mask.offsetHeight;
            mouseX = mouseX > maxX ? maxX : mouseX;
            mouseY = mouseY > maxY ? maxY : mouseY;

            //遮罩跟着鼠标移动
            mask.style.left = mouseX +'px';
            mask.style.top = mouseY + 'px';

            //大小盒子的比例
            var biliX = (bigImg.offsetWidth - bigBox.offsetWidth) / maxX;
            var biliY = (bigImg.offsetHeight - bigBox.offsetHeight) / maxY;
            // 大盒子的图片按比例移动
            bigImg.style.left = -mouseX * biliX + 'px';
            bigImg.style.top  = -mouseY * biliY + 'px';

            
        })
    }

    $.ajax({
        type: "get",
        url: "../../../server/sy1.json",
        dataType: "json",
        success: function (res) {
            // 热门商品
            let temp = res[5].热门商品.map((ele)=>{
                return `
                        <li>
                            <img src=${ele.src} alt="">
                            <div class="box-r">
                                <div class="title">${ele.title}</div>
                                <div class="price">￥${ele.price}</div>
                                <div class="site">${ele.from}</div>
                            </div>
                        </li>
                        `
            })

            $(".like .box").html(temp);
            $(".hot .box").html(temp);
        },
    });
})