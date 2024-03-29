﻿/*将根元素字号大小设置为：屏宽与图宽的比；  
由于chrom对10px以下的字不再缩小，而且手机屏  
都比较小，所以作为默认字体大小又乘了100，这样  
计算其他元素大小时，量出图上大小再除以100就可以了*/  
function defaultfont() {  
    var sw = $(window).width();  
    var pw = 750;
    var f = parseInt(100*sw/pw);
    var isMObile = /Mobile/.test(window.navigator.userAgent);
    $('html').css('font-size', f+'px');  
};


/*之所以要延时100ms再调用这个函数是因为  
如果不这样屏幕宽度加载会有误差*/   
setTimeout(function(){  
    defaultfont();  
}, 30); 

var w_height=$(window).width();

 $(window).resize(function(){//当浏览器窗口尺寸改变时触发事件
	//此判断只要窗口发生了改变，条件必走true ，也就是只要用户改变了窗口大小就会重新加载整个页面，用意是获得新的rem值来适配当前设备
	if($(window).width() != w_height){ window.location.reload(); }
 });

function jumpPage(obj,href){
    var i = 0;
    var Ev = isEv?"touchstart":"click";
    var isEv = /Mobile/.test(window.navigator.userAgent);
    obj.on(Ev,function(){
        window.location.href = href;
    });
};



