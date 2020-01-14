$(()=>{
    $("header").load("../../../server/header.html");
    $("footer").load("../../../server/footer.html");

    let type = "default";
    // 先根据数据总量/页面商品数量确定多少个页面
    $.ajax({
        type: "get",
        url: "../../../server/getPage.php",
        dataType: "json",
        success: function (res) {
            let count = res.count;
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `<a class="num">${i+1}</a>`                
            }
            $("#page").html(html);

            // 顺便加载第一页的商品信息
            getDataWithPage(1,type);
        }
    });

    // 页面点击事件
    $("#page").on("click","a",function(){
        let index = $(this).index();
        getDataWithPage(index+1,type)
    })

    // 排序类型
    $("#items").on("click","a",function(){
        type = $(this).data("type");
        $(this).addClass("active").siblings().removeClass("active");
        getDataWithPage(1,type);
    })

    function getDataWithPage(index,type){
        $.ajax({
            type: "get",
            url: "../../../server/list.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (res) {
                renderUI(res,index)
            }
        });
    }

    function renderUI(data,idx){
        let temp = data.map(ele=>{
            return  `
            <li>
				<a class="inner" target="_blank">
					<div class="ct-img">
						<span>
                            <img src=${ele.src}>
                        </span>
					</div>
					<div class="tit f14">${ele.title}</div>
					<div class="price">
						<span class="red f14">¥<i class="num">${ele.price}</i></span>
						<span class="old">¥${ele.price}</span> </div>
				</a>
				<div class="foot clearfix">
					<a href="//www.meidebi.com/company/2.html" class="gray9 fr site" target="_blank">${ele.sell}</a>
					<span class="fl">
						<i class="f-icon icon-votesp">${ele.nice}</i>
						<a href="//www.meidebi.com/g-3204922.html#comment" target="_blank" rel="nofollow"
							class="f-icon icon-comment">0</a>
					</span>
				</div>
				<a href="//www.meidebi.com/out/3204922.html" id="directlink" 
					class="go m-button button-primary" target="_blank" rel="nofollow">直达链接</a>
			</li>
            `
        }).join('');
        $(".share-list-grid ul").html(temp);

        // 页码的选中状态
        $("#page").children("a").eq(idx-1).addClass("current").siblings().removeClass("current")
    }

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