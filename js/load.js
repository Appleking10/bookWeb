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
        var currentUrl = window.location.href.split('#')[0];  
        if (/\?/g.test(currentUrl)) {  
            if (/name=[-\w]{4,25}/g.test(currentUrl)) {  
                currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);  
            } else {  
                currentUrl += "&" + name + "=" + value;  
            }  
        } else {  
            currentUrl += "?" + name + "=" + value;  
        }  
        if (window.location.href.split('#')[1]) {  
            window.location.href = currentUrl + '#' + window.location.href.split('#')[1];  
        } else {  
            window.location.href = currentUrl;  
        }  
    } 


  