	$(function(){
		var isEv = /Mobile/.test(window.navigator.userAgent);
    	var Ev = isEv?"touchstart":"click";
    	$(".serv-item-title>span").on(Ev,function(){
    		$(this).addClass("serv-selected").siblings().removeClass("serv-selected");
    		var title_num=$(this).index()+1;var a;
    		$(".serv-content"+title_num).removeClass("dis").siblings().addClass("dis");
    	});
	});