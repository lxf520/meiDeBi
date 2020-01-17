$(() => {

    $.ajax({
        type: "get",
        url: "../../../server/getCatData.php",
        dataType: "json",
        success: function (res) {
            console.log(res);
            renderUI(res);
            check()
            computedTotalPrice();
        }
    });

    function renderUI(res) {
        let html = res.map((ele) => {
            // ${ele.isActive == 1 ? "checked" : ""}
            return `
                <tr data-goodid=${ele.goodid}>
                    <th scope="row"><input ${ele.isActive == 1 ? "checked" : ""} type="checkbox"></th>
                    <td>
                        <div class="shop">
                            <img src=${ele.src} alt="">
                            <p>${ele.title}</p>
                        </div>
                    </td>
                    <td class="price">￥ <span id="price"> ${ele.price}</span> </td>
                    <td>
                        <div class="num">
                            <a class="prev">-</a>
                            <input type="text" value="${ele.num}">
                            <a class="next">+</a>
                        </div>
                    </td>
                    <td class="total">￥ <span id="money">${ele.total}</span></td>
                    <td class="delete">删除</td>
                </tr>
                    `
        }).join('');

        $("tbody").html(html);
    }

    // 点击增加
    $(".table").on('click', ".next", function () {

        let inp = $(this).parent().find('input')[0];
        inp.value++;
        let goodid = $(this).parents('tr').data("goodid");

        $.ajax({
            type: "get",
            url: "../../../server/addClick.php",
            data: `goodid=${goodid}`,
            dataType: "json",
            success: function (res) {
                renderUI(res);

                computedTotalPrice();
            }
        })
    })

    // 点击减少
    $(".table").on('click', ".prev", function () {
        if ($(this).parent().find('input').val() == 1) {
            return
        }
        $(this).html('-')

        let inp = $(this).parent().find('input').val()
        inp.value--;
        let goodid = $(this).parents('tr').data("goodid");

        $.ajax({
            type: "get",
            url: "../../../server/reduceClick.php",
            data: `goodid=${goodid}`,
            dataType: "json",
            success: function (res) {
                renderUI(res);
                computedTotalPrice()
            }
        });

    })

    // 删除
    $(".table").on('click', ".delete", function () {
        let goodid = $(this).parent().data("goodid");
        $.ajax({
            type: "get",
            url: "../../../server/removeCart.php",
            data: `goodid=${goodid}`,
            dataType: "json",
            success: function (res) {
                renderUI(res);
                computedTotalPrice();
            }
        });
    })

    $("#check").click(function () {
        if ($("#check").is(':checked')) {
            $("input[type='checkbox']").prop("checked", true)
        } else {
            $("input[type='checkbox']").prop("checked", false)
        }
        computedTotalPrice()
    })
    $("#check2").click(function () {
        if ($("#check2").is(':checked')) {
            $("input[type='checkbox']").prop("checked", true)
        } else {
            $("input[type='checkbox']").prop("checked", false)
        }
        computedTotalPrice()
    })


    $("tbody").on('click', "input[type='checkbox']", function () {
        let isCheck = $(this).is(":checked");
        console.log(this);
        computedTotalPrice()
    })

    // 被动
    $("tbody").on('click', "input[type='checkbox']", function () {
        // 检查当前店铺中是否所有的商品都有被勾选
        let all = $(this).parents("tbody").find("input[type='checkbox']");

        /* 如果每个都被选中，那么返回的就是true */
        let flag = all.toArray().every(function (ele) {
            return $(ele).is(":checked") == true;
        });

        $("#check").prop("checked", flag);
        $("#check2").prop("checked", flag);
        computedTotalPrice();
    });

    function check(){
        let all = $("tbody").find("input[type='checkbox']");

        /* 如果每个都被选中，那么返回的就是true */
        let flag = all.toArray().every(function (ele) {
            return $(ele).is(":checked") == true;
        });

        $("#check").prop("checked", flag);
        $("#check2").prop("checked", flag);
    }


    /* 封装提供一个函数(计算总数量和总价格) */
    /* 逻辑：先获取所有商品标签，遍历这些标签，每循环一次就检查当前标签是否被勾选如果被勾选那么就累加数量和价格 */
    function computedTotalPrice() {
        let totalCount = 0;
        let totalPrice = 0;
        $("tbody").find("tr").each(function () {
            let isCheck = $(this).find("input[type='checkbox']").is(":checked");
            if (isCheck) {
                let currentNum = $(this).find(".num input").val() * 1;
                let currentPrice = $(this).find("#price").text() * 1;

                totalCount += currentNum;
                totalPrice += currentNum * currentPrice;
            }
        })

        $(".choose span").text(totalCount);
        $(".money span").text(totalPrice + "元");
    }


})