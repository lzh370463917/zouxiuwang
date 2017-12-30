var myIscroll;

$(function(){
	loadScroll();
	getData(1);
	reload();
	swiper();
}())


function loadScroll(){
	myIscroll=new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	})
}

function getData(classId){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"jsonp",
		data:{
			classID:classId
		},
		success:function(data){
			$(data).each(function(index,current){
				
				$("#page").val(classId)
				var orignPrice=Number(current.price*10/current.discount).toFixed(2)
				var html=`<dl>
					<dt><a href="#"><img src="${current.goodsListImg}"/></a></dt>
					<dd>
						<p>${current.goodsName}</p>
						<div class="price"><span>￥${current.price}</span><i>￥${orignPrice}</i></div>
						<span class="zhekou">${current.discount}折</span>
						<em><img src="../images/cart.gif"/></em>
					</dd>
				</dl>`;
				$("#content").append(html);
				myIscroll.refresh();
			})
		}
	});
}


function reload(){
	document.addEventListener("touchend",function(){
		//下拉刷新
		if(myIscroll.y>0){
			$("#content").empty();
			getData(1);
		}
		//上啦加载
		if(myIscroll.y<myIscroll.maxScrollY-50){
			var _page=$("#page").val();
			getData(parseInt(_page)+1);
		}
	})
}
function swiper(){
	var swiper=new Swiper(".swiper-container",{
		autoplay:2000,
		pagination:".swiper-pagination",
		loop:true,
		paginationBulletRender:function(index,className){
			return `<span class=${className}></span>`
		}
	})
}
