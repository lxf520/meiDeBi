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
            let temp = `
            <span id="prev" class="prev nj-icon nj-icon-left"  >上一页</span>
            ${html}
            <span id="next" class="next nj-icon nj-icon-right" >下一页</span>`
            $("#page").html(temp);

            // 顺便加载第一页的商品信息
            getDataWithPage(1,type);
        }
    });

    let currentPage = 1;

    // 没办法拿到a标签的长度，计算不了最大页面的数值
    // Array.prototype.slice.call(arr , $("#page")[0].children)
    
    // 页面点击事件
    $("#page").on("click","a",function(){
        let index = $(this).index();

        currentPage = index;
        getDataWithPage(index,type)
    })

    // 上一页和下一页
    $("#page").on("click","span",function(e){

        if( e.target.id == "next"){
            getDataWithPage(currentPage+1,type);
            currentPage++;
        }else if(  e.target.id == "prev" ){
            getDataWithPage(currentPage-1,type);
            currentPage--;
        }
    })

    // 排序类型
    $("#items").on("click","a",function(){
        type = $(this).data("type");
        $(this).addClass("active").siblings().removeClass("active");
        getDataWithPage(1,type);
    })

    // 获取某一页的信息
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

    // 渲染商品
    function renderUI(data,idx){
        let temp = data.map(ele=>{
            return  `
            <li data-id="${ele.id}">
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
				<a id="directlink" 
					class="go m-button button-primary" target="_blank" rel="nofollow">直达链接</a>
			</li>
            `
        }).join('');
        $(".share-list-grid ul").html(temp);

        // 页码的选中状态
        $("#page").children("a").eq(idx-1).addClass("current").siblings().removeClass("current")
    }

    // 侧边渲染
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

    $(".share-list-grid ul").on("click","li",function(){
        let id = $(this).data('id');
        window.location.href = "./detail.html?id=" + id
    })

    window.onload = function(){
        var menu = document.querySelector(".m-nav");
        var mTop = menu.offsetTop;

        window.onscroll = function () {
            if (window.scrollY >= mTop) {
                menu.classList.add("fix")

            } else {
                menu.classList.remove("fix")
            }
        }
    }

})