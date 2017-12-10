//判断是否是PC
    function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    //向链接追加参数
    function addUrlPara(name, value) {  
        var currentUrl = window.location.href.split('?')[0];  
        console.log('1:'+currentUrl);
        if (/\?/g.test(currentUrl)) {  
            if (/name=[-\w]{4,25}/g.test(currentUrl)) {  
                currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value); 
                console.log('2:'+currentUrl); 
            } else {  
                currentUrl += "&" + name + "=" + value;  
                console.log('3:'+currentUrl);
            }  
        } else {  
            currentUrl += "?" + name + "=" + value;  
            console.log('4:'+currentUrl);
        }  
        // if (window.location.href.split('?')[1]) {  
        //     window.location.href = currentUrl + '#' + window.location.href.split('?')[1];  
        // } else {  
        //     window.location.href = currentUrl;  
        // }  
        window.location.href = currentUrl; 
    } 
// 隐藏banner
    function hideBanner(animatedName){
        $('.banner').addClass('animated fadeOutUp').hide();
        $('.searchWrapper').addClass('animated '+animatedName);
        setTimeout(function(){
            $('.banner').removeClass('fadeOutUp');
            $('.searchWrapper').removeClass(animatedName);
        }, 1000);    
    }
    //获取id参数
	function UrlSearch() {
		var name, value;
		var str = location.href; //获取到整个地址
		var num = str.indexOf("?")
		str = str.substr(num + 1); //取得num+1后所有参数，这里的num+1是下标 str.substr(start [, length ]
		var arr = str.split("&"); //以&分割各个参数放到数组里
		for (var i = 0; i < arr.length; i++) {
			num = arr[i].indexOf("=");
			if (num > 0) {
				name = arr[i].substring(0, num);
				value = arr[i].substr(num + 1);
				this[name] = value;
				return this[name];
			}
		}		
    } 

  