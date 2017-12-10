$(document).ready(function () {
    // if(isPC()){
    //     $('#a').text("pc");
    // }else{
    //     $('#a').text("moblie");
    // }
    $('.sideBarShowBtn').click(function () {
        categoryAjax();
        $('.sideBar').show().addClass('animated fadeInLeft');
        setTimeout(function () {
            $('.sideBar').removeClass('fadeInLeft');
        }, 1000);
        console.log('ok');
    });
    $('.sideBarHideBtn').click(function () {
        $('.sideBar').addClass('fadeOutLeft');
        setTimeout(function () {
            $('.sideBar').removeClass('fadeOutLeft').hide();
        }, 1000);
        console.log('ok');
    });

    function loadResultPage(data) {
        hideBanner('fadeInUpBig');
        var bookLi = '';
        var datas = data.bookclass[0].bookInfo;
        var length = data.length;
        for (var i = 0; i < length; i++) {
            bookLi += "<li class='reslutBook'><div class='bookCoverBox'></div><div class='bookInfoBox'><div class='bookInfo'><span class='bookname'>" + datas[i].title + "</span>" + "<span class='author'>" + datas[i].author + "</span>" + "<span class='pulic'>" + datas[i].publish + "</span></div>" + "<span class='price'>参考价格：<a href=''>jingd</a>|<a href=''>dangdang</a>" + "</span></div></li>";
        }
        //    console.log(bookLi)
        $('.reslutWrapper ul').html(bookLi);
        $('.reslutWrapper').show();
    }
    function categoryAjax() {
        $.ajax({
            url: "http://book.evankoo.cn/category",
            dataType: "json", //返回格式为json    
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性 
            type: "GET", //请求方式    
            beforeSend: function () {}, //请求前的处理
            success: function (data) {

                console.log(data);
                var categoryLi = '';
                for (var i = 0; i < data.data.length; i++) {
                    categoryLi += '<li category-id=' + data.data[i].id + '>' + data.data[i].catalog + '</li>'
                }
                $('.sideBar .category').html(categoryLi);
                $.each($('[category-id]'), function () {
                    var ids = $(this).attr("category-id");
                    $(this).on('click', function () {
                        console.log(ids);
                    });
                });
            }, //请求成功时处理    
            complete: function () {}, //请求完成的处理    
            error: function () {} //请求出错处理 
        });
    }

    function bookAjax(ids) {
        $.ajax({
            url: "http://book.evankoo.cn/book",
            dataType: "json", //返回格式为json    
            data: {
                'id': ids
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性 
            type: "GET", //请求方式    
            beforeSend: function () {}, //请求前的处理
            success: function (data) {
                console.log(data);
            }, //请求成功时处理    
            complete: function () {}, //请求完成的处理    
            error: function () {} //请求出错处理 
        });
    }


    // bookAjax()
    //搜索接口
    function searchAjax(searchContnet) {
        $.ajax({
            url: 'http://vtmer.cn/search',
            dataType: 'json'
        }).done(function (data, status, xhr) {
            // console.log(data.bookclass[0].bookInfo);
            if (status === "success") {
                loadResultPage(data)
            }
        });
    }
    $('.searchBtn').click(function () {
        let searchContnet = $('.searchInput').val();
        //如果有搜索内容
        if (searchContnet) {
            searchAjax(searchContnet);
            addUrlPara('search', searchContnet);
        } else {
            alert("请输入关键词");
        }

    });

    var ids = UrlSearch();
    if (ids) {
        hideBanner('fadeIn');
        searchAjax(ids);

    } else {
        $('.banner').show();
        $('.reslutWrapper').hide();
    }


});