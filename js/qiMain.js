
$(function () {
    zyHeight()
    // 首页tab样式切换 与 图片hover效果
    $('.info_class_tab li a').click(function () {
        $(this).addClass('active').parent('').siblings().children('a').removeClass('active')
    })
    $('.tabbody_list').hover(function () {
        $(this).children('a').fadeIn()
    }, function () {
        $(this).children('a').fadeOut()
    })
    $(".nav_Div .navbar-light .navbar-nav .nav-link").click(function () {
        $(this).addClass("active").parent().siblings().children("a").removeClass("active");
        $('.nav_item_span').removeClass('active');
    })
    // 首页导航加背景底色
    $('button.navbar-toggler').click(function () {
        $(".show_bg").fadeToggle();
    })
    $('.show_bg').click(function () {
        $(this).fadeOut();
        $('.header_Div .nav_Div .navbar-collapse').removeClass('show')
    })
    $(".nav_Div .nav_link1_ul li a").click(function () {
        $(this).addClass('active').siblings("active");
    })




})

// 首页信息分类右侧图片获取动态高度给绝对定位top值方法
function zyHeight() {
    var nowwidth = $(window).width();
    var yesNo = nowwidth < 767
    var topH = $('.info_class_tab').height();
    var tabbodyH = $('.info_class_tabbody').height();
    var sunH = topH + tabbodyH
    if (!yesNo) {
        $(".info_class_tabbody").css("top", topH)
        $('.info_class div.container').css('height', sunH)
    } else {
        $(".info_class_tabbody").css("top", "0");
    }
}


