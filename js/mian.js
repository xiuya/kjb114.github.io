var isEv = /Mobile/.test(window.navigator.userAgent);
var touchstart = "";
var touchmove = "";
var touchend = "";

if(isEv){
	touchstart = "touchstart";
	touchmove = "touchmove";
	touchend = "touchend";
}else{
	touchstart = "mousedown";
	touchmove = "mousemove";
	touchend = "mouseup";
};

(function($){
	var $screenBtn = $(".list_screen_btn").find("span");
	var $termList = $(".list_screen").find("ul");

	//列表页，筛选功能切换
	$screenBtn.on(touchstart,function(){
		var index = $(this).index();

		$(this).addClass("list_screen_on").siblings("span").removeClass("list_screen_on");
		$(this).parent().parent().find("ul").eq(index).show().siblings("ul").hide();

		//异常处理
		try{
			callback&&callback(index);
		}catch(err){

		};
	});

	//首页与列表页 分类列表切换
	var wrapWidth = $(".list_box").find(".swiper-slide").length*105;
	$('.list_box .swiper-wrapper').width(wrapWidth+"%");

	var swiper = new Swiper('.list_box',{
	    pagination: '.pagination',
	    paginationClickable:true
	});
	
	
	//账户设置（头像设置）
	$(".setting_head_img").on(touchstart,function(){
		setHead_show();
	});
	$(".cancel_setHead").on(touchstart,function(){
		setHead_hide();
	});

	//设置头像弹出窗显示
	function setHead_show(){
		$(".setHead_mask").fadeIn(300,function(){
			$(this).find(".setHead_wrap").css({
				"transform":"translate3d(0,0,0)"
			});
		});
	};

	//设置头像弹出窗隐藏
	function setHead_hide(){
		$(".setHead_wrap").css({
			"transform":"translate3d(0,4rem,0)"
		});
		setTimeout(function(){
			$(".setHead_mask").fadeOut(300);
		},300);
	};

	//选择银行卡
	$(".bank_card_box").find("li").on(touchstart,function(){
		var index = $(this).index();
		$(this).addClass('select_active').siblings('li').removeClass('select_active');
		load("balance_withdrawal.html",$(this).find("img").attr("src"),$(this).find("p").text(),$(this).find("span").text(),index);
	});

	//记录选择银行卡信息
	function load(href,src,bankname,banknum,index){
		window.location.href = href+"?src="+src+"&bankname="+bankname+"&banknum="+banknum+"&index="+index;
	};

	try{var url = window.location.href.split("?")[1].split("&");
		//每次选择后跳回页面并更新信息
		var bankMs = [];
		for(var i = 0;i<url.length;i++){
			bankMs.push(decodeURI(url[i].split("=")[1]));
		};
		$(".select_bank img").attr("src",bankMs[0]);
		$(".select_bank p").text(bankMs[1]);
		$(".select_bank span").text(bankMs[2]);
		$(".select_bank").on(touchstart,function(){
			window.location.href = "Select_bank_card.html?index="+bankMs[3];
		});
		var index = window.location.href.split("?")[1].split("=")[1];
		$(".bank_card_box").find("li").eq(index).addClass('select_active').siblings('li').removeClass('select_active');
	}catch(e){
		//默认跳转
		jumpPage($(".select_bank"),"Select_bank_card.html");
	};
})(jQuery);

//左右滑动列表封装函数
function downMove($ul,$li){	
	var childL = 0;
	var childW = 0;
	var clientW = 0;

	if($li[0].offsetWidth*$li.length > $(window).width()){
		//当手指触摸屏幕触发事件
		$ul.on(touchstart,function(ev){
			var evs = ev.originalEvent?ev.originalEvent.changedTouches[0]:ev||window.event;
			var down = evs.clientX;
			var prentLeft = $ul.position().left;
			var downY = evs.clientY;

			//当手指在屏幕上滑动触发事件
			$(document).on(touchmove+".move",function(ev){
				var evs = ev.originalEvent?ev.originalEvent.changedTouches[0]:ev||window.event;

				//控制元素左右滑动
				$ul.css({
					"transition":"all 0s",
					"transform":"translate3d("+(evs.clientX - down + prentLeft)+"px,0,0)"
				});

				return false;
			});

			//当手指从屏幕抬起触发事件
			$(document).on(touchend+".move",function(){
				//取消滑动与抬起事件
				$(document).off(".move");
				
				clientW = $(window).width();
				childW = $ul[0].offsetWidth;
				childL = $ul.position().left;
				
				//超出归位
				if(childL > 0){
					$ul.css({
						"transition":"all .3s",
						"transform":"translate3d(0,0,0)"
					});
				}else if(childL <= (clientW-childW)){
					var jl = clientW-childW-10;

					$ul.css({
						"transition":"all 0.3s",
						"transform":"translate3d("+ (clientW-childW) +"px,0,0)"
					});
				};
			});
		});
	};
};
