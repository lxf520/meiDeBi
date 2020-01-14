$(() => {
    $("header").load("../../../server/header.html");
    $("footer").load("../../../server/footer.html");
    new Promise((resolve, reject) => {
        /*类别*/
        $.ajax({
            type: "get",
            url: "../../../server/class.json",
            dataType: "json",
            success: function (res) {

                let temp = res.map((ele, idx) => {
                    return `<a href=${idx <= 14 ? './list.html' : ''}>${ele.title}</a>`
                }).join("");

                let t1 = res[0].cont.map(e => {
                    let t = e.arr3.map(ele => {
                        return `<a>${ele}</a>`
                    }).join('');

                    return `<li class="clearfix">
							<h6><a>${e.title1}</a></h6>
							<div class="children">
								${t}															  
							</div>
						</li>`
                }).join('');

                let t2 = res.map(ele => {
                    return `<ul>${t1}</ul>`
                }).join('')
                let html = `<div class="dhxq">${t2}</div>`
                $(".daohang").append(temp);
                $(".hot-category dd").append(html);

                $(".daohang a").mouseenter(function () {
                    let left = $(this)[0].offsetLeft + 60;
                    let top = $(this)[0].offsetTop;
                    $(".dhxq ul").eq($(this).index()).css({
                        "display": 'block',
                        "left": left + 'px',
                        "top": top + 'px'
                    }).siblings().css("display", "none");
                })
                $(".hot-category dd").mouseleave(function () {
                    $(".dhxq ul").css("display", "none")
                })

                resolve()
            }
        });
    }).then(function (resolve, reject) {
        //  轮播图 
        $.ajax({
            type: "get",
            url: "../../../server/sy1.json",
            dataType: "json",
            success: function (res) {
                let temp = new Slider1(res[0].slider);
                temp.init();
            },
        });
    })

    let p1 = new Promise(function (resolve, reject) {
        //  海淘商品渲染 
        $.ajax({
            type: "get",
            url: "../../../server/sy1.json",
            dataType: "json",
            success: function (res) {
                let temp = res[1].seaShop.map((ele, idx) => {
                    return `
                <li>
                    <a>
                        <span class="img-area fl">
                            <img src=${ele.src}></span>
                        <div class="h1 fl">
                            <p class="txt">${ele.title}</p>
                            <p class="red">${ele.price}</p>
                            <p class="gray9">${ele.source}</p>
                        </div>
                    </a>
                </li>
            `
                }).join("");
                $(".banner-goods .foot").html(temp);
                resolve()
            },
        });
    })

    let p2 = new Promise(function (resolve, reject) {
        //  手风琴效果 
        $.ajax({
            type: "get",
            url: "../../../server/sy1.json",
            dataType: "json",
            success: function (res) {
                let temp = res[2].hot.map((ele, idx) => {
                    return `
                    <li class="${idx == 0 ? 'active' : ''}">
                        <a>
                            <div class="pic"><img src=${ele.src} alt=${ele.title}></div>
                            <div class="tit nowrap">${ele.title}</div>
                        </a>
                    </li>
                `
                }).join("");
                $(".grid-side .hot-subjects ul").html(temp);
                $(".hot-subjects ul > li").mouseenter(function () {
                    $(this).addClass("active").siblings().removeClass("active")
                })
                resolve()
            },
        });
    })

    let p3 = new Promise(function (resolve, reject) {
        //  第二个轮播图 
        $.ajax({
            type: "get",
            url: "../../../server/rank.json",
            dataType: "json",
            success: function (res) {
                (new Slider2(res, 10000)).init()
                resolve()
            },
        });
    })

    let p4 = new Promise(function (resolve, reject) {
        //  热门品牌 
        $.ajax({
            type: "get",
            url: "../../../server/sy1.json",
            dataType: "json",
            success: function (res) {
                let t = res[3].src.map(e => {
                    return `<li class="ct-img"><a><img src=${e}></a></li>`
                }).join('');
                $(".hot-sites ul").html(t)
                resolve()
            },

        });
    })

    Promise.all([p1, p2, p3, p4])
        .then(function () {
            //  商品列表   

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
                        html += `<a class="num">${i + 1}</a>`
                    }
                    $("#page").html(html);

                    // 顺便加载第一页的商品信息
                    getDataWithPage(1, type);
                }
            });

            $("#page").on("click","a",function(){
                let index = $(this).index();
                getDataWithPage(index+1,type);
            })
        })

    function getDataWithPage(index, type) {
        $.ajax({
            type: "get",
            url: "../../../server/list.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (res) {
                renderUI(res, index)
            }
        });
    }
    function renderUI(data, idx) {
        let temp = data.map(ele => {
            return `
            <li class="clearfix" >
                <div class="fl pic ct-img">
                    <a><img src=${ele.src}></a>
                </div>
                <div class="infos">
                    <div class="t">
                        <a class="site gray6"
                            target="_blank">${ele.sell}</a>
                        <i class="join">|</i>
                        <span class="tags">
                            <a  target="_blank">${ele.info}</a>
                    </div>
                    <div class="tit">
                        <h6><a target="_blank">${ele.title}</a></h6>
                        <span class="red price">
                            ¥<i class="num">${ele.price}</i>
                        </span>
                    </div>
                    <div class="desc">${ele.desc}<a href="//www.meidebi.com/g-3194409.html"
                            target="_blank">阅读全文</a></div>
                    <div class="foot clearfix">
                        <a  class="fr m-button button-primary" target="_blank" rel="nofollow">直达链接</a>
                        <span class="links">
                            <i class="f-icon icon-votesp" data-action="vote"
                                data-options="async:true,data:{id:3194409}">${ele.nice}</i>
                            <i class="f-icon icon-votesm" data-action="vote"
                                data-options="async:true,data:{id:3194409}">0</i>
                            <a target="_blank"    rel="nofollow" class="comment">
                                <span class="comment"><i
                                        class="f-icon icon-comment">0</i></span></a>
                            <i class="f-icon icon-fav" data-action="favorite"
                                data-options="async:true,data:{id:3194409}">0</i>
                        </span>
                        <span>爆料人：<a target="_blank">语过添情</a></span>
                        <span class="createtime">${ele.time}</span>
                    </div>
                </div>
            </li>
            `
        }).join('');
        $(".share-list>ul").html(temp)

        $("#page a").eq(idx-1).addClass("current").siblings().removeClass("current")
    }


})