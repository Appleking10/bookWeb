$(document).ready(function () {
    // if(isPC()){
    //     $('#a').text("pc");
    // }else{
    //     $('#a').text("moblie");
    // }
    
    // 侧边栏的展示
    $('.sideBarShowBtn').click(function () {
        // 分类的数据
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

// 加载搜索页
    function loadResultPage(data) {
        hideBanner('fadeInUpBig');
        var bookLi = '';
        var datas = data.bookclass[0].bookInfo;
        var length = data.bookclass[0].bookInfo.length;
        console.log(datas)
        for (var i = 0; i < length; i++) {
            bookLi += "<li class='reslutBook'><div class='bookCoverBox'></div><div class='bookInfoBox'><div class='bookInfo'><span class='bookname'>" + datas[i].title + "</span>" + "<span class='author'>" + datas[i].author + "</span>" + "<span class='pulic'>" + datas[i].publish + "</span></div>" + "<span class='price'>参考价格：<a href=''>jingd</a>|<a href=''>dangdang</a>" + "</span></div></li>";
        }
           console.log(bookLi)
        $('.reslutWrapper ul').html(bookLi);
        $('.reslutWrapper').show();
    }
    // 分类条目的请求
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
                        bookAjax(ids);
                    });
                });
            }, //请求成功时处理    
            complete: function () {}, //请求完成的处理    
            error: function () {} //请求出错处理 
        });
    }

// 书本分类具体页面的请求
    function bookAjax(ids) {
        $.ajax({
            url: "http://book.evankoo.cn/book",
            dataType: "json", //返回格式为json    
            data: {
                'category-id': ids, //哪个分类
                'pn':0, //起始条目
                'rn':15 //页面个数
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性 
            type: "GET", //请求方式    
            beforeSend: function () {}, //请求前的处理
            success: function (data) {
                console.log(data);
                hideBanner('fadeInUpBig');
                var bookLi = '';
                var datas = data.data.data;
                console.log(datas);
                var length = data.data.data.length;
                for (var i = 0; i < length; i++) {
                    bookLi += "<li class='reslutBook'><div class='bookCoverBox'></div><div class='bookInfoBox'><div class='bookInfo'><span class='bookname'>" + datas[i].title + "</span>" + "<span class='author'>" + datas[i].author + "</span>" + "<span class='pulic'>" + datas[i].catalog + "</span></div>" + "<span class='price'>购买链接：<a href=''>京东</a>|<a href=''>当当</a>" + "</span></div></li>";
                }
                $('.reslutWrapper ul').html(bookLi);
 
                $.each($('.bookCoverBox'),function(i){
                    $(this).css('background-image','url('+datas[i].img+')');
                    if(datas[i].buyLink){
                        $('.jingdong').attr('href',datas[i].buyLink[0].toString().split(':')[1]);
                        $('.dangdang').attr('href',datas[i].buyLink[1].toString().split(':')[1]);
                    } else {

                    }
                })
                $('.reslutWrapper').show();

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
                console.log('s');
            }
        });
    }
    $('.searchBtn').click(function () {
        let searchContnet = $('.searchInput').val();
        //如果有搜索内容
        if (searchContnet) {
            // searchAjax(searchContnet);
            addUrlPara('search', searchContnet);
        } else {
            alert("请输入关键词");
        }

    });

    var ids = UrlSearch();
    // 如果已经搜索了，直接展示结果页
    if (ids) {
        hideBanner('fadeIn');
        searchAjax(ids);
    } else {
        $('.banner').show();
        $('.reslutWrapper').hide();
    }


});