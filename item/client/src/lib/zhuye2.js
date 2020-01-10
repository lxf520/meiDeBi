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
                console.log(111);

                let temp = res.map((ele, idx) => {
                    return `<a>${ele.title}</a>`
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

    Promise.all([p1, p2, p3,p4])
        .then(function () {
            //  商品列表   
            $.ajax({
                type: "get",
                url: "../../../server/shopinfo.json",
                dataType: "json",
                success: function (res) {
                    let list = new ShopList(res, $(".share-list>ul"));
                    list.renderUI()

                },
            });
        })


})