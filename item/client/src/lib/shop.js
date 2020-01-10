class ShopList{
    constructor(data,root){
        this.data = data
        this.root = root
    }
    renderUI(){
        let temp = this.data.map(ele=>{
            return  `
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
        this.root.html(temp)
    }
}