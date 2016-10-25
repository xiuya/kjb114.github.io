 var baseUrl="http://www.yjrp2c.com/";
 /*将电话号码中间替换成**/
var format_phone=function(phone){
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
/*将字符串中间替换成* str 字符串, frontLen前面几位 , endLen后面几位,*/
function plusXing (str,frontLen,endLen) { 
    var len = str.length-frontLen-endLen;
    var xing = '';
    for (var i=0;i<len;i++) {
        xing+='*';
    }
    return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
}
$('.goback').click(function(){
	history.go(-1);
});
//将数字转化成金额
function changePrice2money(s)
        {
            if (/[^0-9\.]/.test(s)) return "invalid value";
            s = s.replace(/^(\d*)$/, "$1.");
            s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            s = s.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(s))
                s = s.replace(re, "$1,$2");
            s = s.replace(/,(\d\d)$/, ".$1");
            return s.replace(/^\./, "0.")
        }

 /*判断属于那个银行图标*/
 var checkPic=function(name){
        if(name.indexOf('工商')>=0){
            return 'gs';
        }
        if(name.indexOf('建设')>=0){
            return 'js';
        }
        if(name.indexOf('农业')>=0){
            return 'ly';
        }
        if(name.indexOf('招商')>=0){
            return 'zs';
        }
        if(name.indexOf('邮政')>=0){
            return 'yz';
        }
        if(name.indexOf('中国银行')>=0){
            return 'zg';
        }
        if(name.indexOf('浦发')>=0){
            return 'pf';
        }
        if(name.indexOf('民生')>=0){
            return 'ms';
        }
        if(name.indexOf('光大')>=0){
            return 'gd';
        }
        if(name.indexOf('中信')>=0){
            return 'zx';
        }
        if(name.indexOf('兴业')>=0){
            return 'xy';
        }
        if(name.indexOf('平安')>=0){
            return 'pa';
        }
        if(name.indexOf('广发')>=0){
            return 'gf';
        }
        if(name.indexOf('华夏')>=0){
            return 'hx';
        }
 	return 'undefined';
    }
 /*判断属于那个银行*/
 var checkBank=function(name){
        if(name.indexOf('工商')>=0){
            return 'ICBC_D_B2C';
        }
        if(name.indexOf('建设')>=0){
            return 'CCB_D_B2C';
        }
        if(name.indexOf('农业')>=0){
            return 'ABC_D_B2C';
        }
        if(name.indexOf('邮政')>=0){
            return 'POSTGC_D_B2C';
        }
        if(name.indexOf('中国银行')>=0){
            return 'BOCSH_D_B2C';
        }
        if(name.indexOf('民生')>=0){
            return 'CMBCD_D_B2C';
        }
        if(name.indexOf('光大')>=0){
            return 'CEB_D_B2C';
        }
        if(name.indexOf('中信')>=0){
            return 'CNCB_D_B2C';
        }
        if(name.indexOf('兴业')>=0){
            return 'CIB_D_B2C';
        }
        if(name.indexOf('平安')>=0){
            return 'PINGAN_D_B2C';
        }
        if(name.indexOf('交通')>=0){
            return 'COMM_D_B2C';
        }

    }
 //判断身份证是否合法
function checkCardId(socialNo){

	  if(socialNo == "")
	  {
	    alert("身份证号码不能为空!");
	    return (false);
	  }

	  if (socialNo.length != 15 && socialNo.length != 18)
	  {
	    alert("身份证号码格式不正确!");
	    return (false);
	  }
		
	 var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}; 
	   
	   if(area[parseInt(socialNo.substr(0,2))]==null) {
	   	alert("身份证号码不正确(地区非法)!");
	    	return (false);
	   } 
	    	
	  if (socialNo.length == 15)
	  {
	     pattern= /^\d{15}$/;
	     if (pattern.exec(socialNo)==null){
			alert("15位身份证号码必须为数字！");
			return (false);
	    }
		var birth = parseInt("19" + socialNo.substr(6,2));
		var month = socialNo.substr(8,2);
		var day = parseInt(socialNo.substr(10,2));
		switch(month) {
			case '01':
			case '03':
			case '05':
			case '07':
			case '08':
			case '10':
			case '12':
				if(day>31) {
					alert('身份证号码不格式正确!');
					return false;
				}
				break;
			case '04':
			case '06':
			case '09':
			case '11':
				if(day>30) {
					alert('身份证号码不格式正确!');
					return false;
				}
				break;
			case '02':
				if((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {
					if(day>29) {
						alert('身份证号码不格式正确!');
						return false;
					}
				} else {
					if(day>28) {
						alert('身份证号码不格式正确!');
						return false;
					}
				}
				break;
			default:
				alert('身份证号码不格式正确!');
				return false;
		}
		var nowYear = new Date().getYear();
		if(nowYear - parseInt(birth)<15 || nowYear - parseInt(birth)>100) {
			alert('身份证号码不格式正确!');
			return false;
		}
	    return (true);
	  }
	  
	  var Wi = new Array(
	            7,9,10,5,8,4,2,1,6,
	            3,7,9,10,5,8,4,2,1
	            );
	  var   lSum        = 0;
	  var   nNum        = 0;
	  var   nCheckSum   = 0;
	  
	    for (i = 0; i < 17; ++i)
	    {
	        

	        if ( socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9' )
	        {
	            alert("身份证号码格式不正确!");
	            return (false);
	        }
	        else
	        {
	            nNum = socialNo.charAt(i) - '0';
	        }
	         lSum += nNum * Wi[i];
	    }

	  
	    if( socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x')
	    {
	        lSum += 10*Wi[17];
	    }
	    else if ( socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9' )
	    {
	        alert("身份证号码格式不正确!");
	        return (false);
	    }
	    else
	    {
	        lSum += ( socialNo.charAt(17) - '0' ) * Wi[17];
	    }

	    
	    
	    if ( (lSum % 11) == 1 )
	    {
	        return true;
	    }
	    else
	    {
	        alert("身份证号码格式不正确!");
	        return (false);
	    }
		
}

