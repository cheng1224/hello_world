/* 获取url后的某一个query的值 */
function getQueryString( name ) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
    context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

/* 格式化时间 */
function timeFormat( timestamp, string ){
    var time = "";
    var dateTime = new Date(timestamp);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var date = dateTime.getDate();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var seconds = dateTime.getSeconds();

    month   = month<10   ? "0"+month   : month;
    date    = date<10    ? "0"+date    : date;
    seconds = seconds<10 ? "0"+seconds : seconds;
    hours   = hours<10   ? "0"+hours   : hours;
    minutes = minutes<10 ? "0"+minutes : minutes;
    seconds = seconds<10 ? "0"+seconds : seconds;

    switch (string) {
        case "yyyy-mm-dd":
            time = year + "-" + month + "-" + date;
            break;
        case "yyyy-mm-dd hh:mm":
            time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
            break;
        case "yyyy-mm-dd hh:mm:ss":
            time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            break;
        case "yyyy/mm/dd":
            time = year + "/" + month + "/" + date;
            break;
        default:
            time = year + "-" + month + "-" + date;
    }

    return time;
}


//强制给数字补全小数点
function toDecimal2(x) {
	var f = parseFloat(x);
	if(isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if(rs < 0) {
		rs = s.length;
		s += '.';
	}
	while(s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

//获取Url中中文参数的方法
function getQueryUrlString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2]);
	}
	return "请选择";
}

/* 设置cookie */
function setCookie( c_name, value, expiredays ){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";path=/";
}

//取回cookie
function getCookie(c_name){
    if ( document.cookie.length > 0 ){
      c_start = document.cookie.indexOf(c_name + "=")
        if ( c_start != -1 ){
        	c_start = c_start + c_name.length + 1;
        	c_end = document.cookie.indexOf(";", c_start);
        	if ( c_end == -1 ) c_end = document.cookie.length;
        	return unescape(document.cookie.substring(c_start, c_end));
    	};
    };
    return "";
}

