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
