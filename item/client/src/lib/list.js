$(()=>{
    $("header").load("../../../server/header.html");
    $("footer").load("../../../server/footer.html");

    $.ajax({
        type: "get",
        url: "../../../server/shopInfo.json",
        dataType: "json",
        success: function (res) {
            (new ShopList2(res,$(".share-list-grid ul"))).renderUI()
            
        }
    });


    $.ajax({
        type: "get",
        url: "../../../server/sy1.json",
        dataType: "json",
        success: function (res) {
            // 热门商城
            let t = res[3].src.map(e => {
                return `<li class="ct-img"><a><img src=${e}></a></li>`
            }).join('');
            $(".hot-sites ul").html(t);

            // 小轮播图
            let temp1 = new Slider3(res[4].baicai, $(".side-baicai nj-scroll"));
            temp1.init();

            // 热门商品
            let temp = res[5].热门商品.map((ele)=>{
                return `<li class="clearfix">
                <a>
                    <div class="pic fl"><img
                            src= ${ele.src}></div>
                    <div class="txt">
                        <div class="tit gray3">${ele.title}</div>
                        <div class="price red"> ¥<i class="num">${ele.price}</i></div>
                        <div class="gray9">${ele.from}</div>
                    </div>
                </a>
            </li>`
            })

            $(".hot-actives").html(temp);
        },
    });


})