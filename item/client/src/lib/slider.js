class Slider1{
    constructor(data){
        this.data = data;
        this.root = null;
        this.index = 0;
        this.sliderWidth = 650;
        this.timer = null;
    }
    init(){
        this.renderUI();
        this.autoPlay();
        this.addClick();
        this.currentStyle();
        this.onmouseevent();
    }
    renderUI(){
        this.root = $("<div></div>");
        // this.root.classList.add('sg-bigbox');
        let tp1 = this.data.map(ele=>{
            return `<a class="slider-item">
            <img src=${ele.src}>
            <span class=".banner-txt">${ele.title}</span>
        </a>`
        }).join('');
        this.root[0].innerHTML = `
                <div class="banner-title">
		    		<span class="txt f14 orange">活动推荐</span>
		    		<div class="ctrl">
		    			<li class="prev"></li>
		    			<li class="next"></li>
		    		</div>
		    	</div>
		    	<div class="nj-scroll">
                    <ul class="slider1">${tp1}</ul>
		    	</div>
        `
        $(".main-slide .banner-ads").append(this.root);
    }
    autoPlay(){
        this.timer = setInterval(() => {
            this.next();
        }, 3000);
    }
    onmouseevent() {
        this.root.mouseenter(() => {
            clearInterval(this.timer);
        });
        this.root.mouseleave(() => {
            this.autoPlay();
        });
    }
    addClick(){
        this.root.find(".prev")[0].onclick = ()=>{
            this.index--;
            if(this.index < 0){
                this.index = 1
            }
            let left = -this.index * this.sliderWidth + 'px';
            $(".slider1").css("left",left);
            this.currentStyle();

        }
        this.root.find(".next")[0].onclick = ()=>{
            this.next();
        }
    }
    next(){
        this.index++;
        if(this.index > 1){
            this.index = 0
        }
        let left = -this.index * this.sliderWidth + 'px';
        $(".slider1").css("left",left);
        this.currentStyle();
    }
    currentStyle(){
        this.root.find(".ctrl li").eq(this.index).addClass("current").siblings().removeClass("current")
    }
}

class Slider2{
    constructor(data,second,source){
        this.data = data;
        this.root = null;
        this.index = 0;
        this.sliderHeight = 705;
        this.timer = null;
        this.second = second;
    }
    init(){
        this.renderUI();
        this.autoPlay();
        this.currentStyle();
        this.onmouseevent();
        this.sliderClickEvent()
    }
    renderUI(){
        this.root = $("<div></div>");
        let tp1 = this.data.map(e=>{
            return `<li class="clearfix">
            <a target="_blank">
                <div class="pic fl">
                    <img src=${e.src}>
                </div>
                <div class="txt">
                    <div class="tit gray3">${e.title}</div>
                    <div class="price red">￥
                        ${e.price}</div>
                    <div class="gray9">${e.from}</div>
                </div>
            </a>
        </li>`
        }).join('');
        this.root.html(tp1);
        $(".slider2").append(this.root);
    }
    autoPlay(){
        this.timer = setInterval(() => {
            this.next();
        }, this.second);
    }
    onmouseevent() {
        $(".side-box").mouseenter(() => {
            clearInterval(this.timer);
        });
        $(".side-box").mouseleave(() => {
            this.autoPlay();
        });
    }
    sliderClickEvent() {
        $(".side-box .smallCycle span").each((idx, ele) => {
            $(ele).click(() => {
                this.index = idx;
                $(".slider2").animate({
                    "top":-this.index * this.sliderHeight + 'px'
                },500);
                this.currentStyle();
            })
        })
    }
    next(){
        this.index++;
        if(this.index > 4){
            this.index = 0
        }
        $(".slider2").animate({
            "top":-this.index * this.sliderHeight + 'px'
        },500);
        this.currentStyle();
    }
    currentStyle(){
        $(".side-box .smallCycle span").eq(this.index).addClass("currentBg").siblings().removeClass("currentBg")
    }
}

class Slider3{
    constructor(data,source){
        this.data = data;
        this.source = source;
        this.root = null;
        this.index = 0;
        this.sliderWidth = 296;
        this.timer = null;
    }
    init(){
        this.renderUI();
        this.addClick();
    }
    renderUI(){
        this.root = $("<div></div>");
        let tp1 = this.data.map(ele=>{
            return `<li class="item">
            <a target="_blank"><span class="pic"><img  src=${ele.src}></span>
                <span class="t gray3">${ele.title}</span>
            </a>
            <div class="clearfix f red">
                <span class="fl">${ele.price}</span>
            </div>
        </li>`
        }).join('');
        this.root[0].innerHTML = `
            <ul>${tp1}</ul>
            <div class="page">
                <span class="prev"><i class="f-icon icon-left"></i></span>
                <span class="next"><i class="f-icon icon-right"></i></span>
            </div>    
        `
        this.source.append(this.root);
    }

    addClick(){
        this.root.find(".prev")[0].onclick = ()=>{
            console.log(111);
            
            this.index--;
            if(this.index < 0){
                this.index = 4
            }
            let left = -this.index * this.sliderWidth + 'px';
            $(".side-baicai ul").css("left",left);
        }
        this.root.find(".next")[0].onclick = ()=>{
            this.next();
        }
    }
    next(){
        this.index++;
        if(this.index > 4){
            this.index = 0
        }
        let left = -this.index * this.sliderWidth + 'px';
        $(".side-baicai ul").css("left",left);
    }

}