$(document).ready(function(){
    // if(isPC()){
    //     $('#a').text("pc");
    // }else{
    //     $('#a').text("moblie");
    // }
    $('.sideBarShowBtn').click(function() {
        $('.sideBar').show().addClass('animated fadeInLeft');
        setTimeout(function(){
            $('.sideBar').removeClass('fadeInLeft');
        }, 1000);
        console.log('ok');
    });
    $('.sideBarHideBtn').click(function() {
        $('.sideBar').addClass('fadeOutLeft');
        setTimeout(function(){
            $('.sideBar').removeClass('fadeOutLeft').hide();

        }, 1000);    
        console.log('ok');
    });
    $('.searchBtn').click(function() {
        let searchContnet = $('.searchInput').val();
        // console.log(domain);
        //拿到数据
        if(searchContnet) {
            $.ajax({
                url: 'http://vtmer.cn/search',
                dataType:'json'
                }).done(function( data, status, xhr) {
                    // console.log(status);
                    if(status === "success") {
                        // localStorage.setItem('search',searchContnet);
                        // localStorage.setItem('SearchDate',data);
                        $('.banner').addClass('animated fadeOutUp').hide();
                        $('.searchWrapper').addClass('animated fadeInUpBig');
                        setTimeout(function(){
                            $('.banner').removeClass('fadeOutUp');
                            $('.searchWrapper').removeClass('fadeInUpBig');
                            
                        }, 1000);    
                        // history.go(0);
                        // $('.homeWrapper').hide();
                        addUrlPara('search', searchContnet);
                    }
                    
                    });
        
        }else {
            alert("请输入关键词");
        }
    });
    
       
});