$(() => {
    // let carInfo = JSON.parse( Cookie.getItem('carInfo')) ;
    let tempData;

    $.ajax({
        type: "get",
        url: "../../../server/getCatData.php",
        dataType: "json",
        success: function (res) {
            console.log(res);
            renderUI(res);

            add(); reduce(); remove();
            computedTotalPrice();
            // checkBox();
        }
    });

    function renderUI(res){
        tempData = res;
            let html = res.map((ele) => {
                return `
                <tr data-goodid=${ele.goodid}>
                    <th scope="row"><input ${ele.isActive==1 ? "checked" : ""} type="checkbox"></th>
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

    // function checkBox(){
    //     $("input[type='checkbox']").click(function(){

    //         let goodid = $(this).parent().data("goodid");

    //         let status;
    //         if($(this).is(':checked')){
    //             status = 1
    //         }else{
    //             status = 0
    //         }
    //         console.log(status);
            
            
    //         $.ajax({
    //             type: "get",
    //             url: "../../../server/checkBox.php",
    //             data: `goodid=${goodid}&status=${status}`,
    //             dataType: "json",
    //             success: function (res) {

    //                 renderUI(res);
                    
    //                 console.log(tempData);
                    
    //                 computedTotalPrice();
    //                 add(); reduce(); remove();checkBox();
    //             }
    //         });
    //     })
    // }

    function add() {
        $(".next").click(function () {
            
            let inp = $(this).prev()[0]
            inp.value++;

            // let price = $(this).parent().parent().parent().find('#price')[0].innerText;
            // let total = (price * (inp.value)).toFixed(2)

            let goodid = $(this).parent().parent().parent().data("goodid");

            $.ajax({
                type: "get",
                url: "../../../server/addClick.php",
                data: `goodid=${goodid}`,
                dataType: "json",
                success: function (res) {
                    console.log(res);

                    renderUI(res);
                    
                    computedTotalPrice();
                    add(); reduce(); remove();
                }
            });
        })
    }

    function reduce() {
        $(".prev").click(function () {
            if ($(this).next()[0].value == 1) {
                return
            }
            $(this).html('-')

            let inp = $(this).next()[0]
            inp.value--;

            // let price = $(this).parent().parent().parent().find('#price')[0].innerText;
            // let total = (price * (inp.value)).toFixed(2)

            let goodid = $(this).parent().parent().parent().data("goodid");
            
            $.ajax({
                type: "get",
                url: "../../../server/reduceClick.php",
                data: `goodid=${goodid}`,
                dataType: "json",
                success: function (res) {

                    renderUI(res);
                    
                    computedTotalPrice()
                    
                    add(); reduce(); remove();
                }
            });

        })
    }

    // 删除
    function remove(){
        $(".delete").click(function(){
            console.log(111);
            
            let goodid = $(this).parent().data("goodid");
    
            $.ajax({
                type: "get",
                url: "../../../server/removeCart.php",
                data: `goodid=${goodid}`,
                dataType: "json",
                success: function (res) {
    
                    renderUI(res);
                    
                    computedTotalPrice();
                    add(); reduce();
                    remove()
                }
            });
        })
    }

    $("#check").click(function () {
        if ($("#check").is(':checked')) {
            $("input[type='checkbox']").prop("checked", true)
        } else {
            $("input[type='checkbox']").prop("checked", false)

        }
    })
    $("#check2").click(function () {
        if ($("#check2").is(':checked')) {
            $("input[type='checkbox']").prop("checked", true)
        } else {
            $("input[type='checkbox']").prop("checked", false)
        }
    })

    // 计算总价
    function computedTotalPrice() {
        let totalPrice = 0
        tempData.forEach(ele => {
            if (ele.isActive == 1) {
                totalPrice += ele.total * 1;
            }
        });
        $(".money span").html(totalPrice);
    }



})