
window.onload=function(){
    function myFn(param1,param2){
        var myli = document.getElementById(param1);
        var myul = document.getElementById(param2);
        myli.onclick = function(){
            myul.style.display = myul.style.display=="block"?"none":"block"; 
            }
        }
        myFn('div05','ul05');
        myFn('a01','ul01');
        myFn('a02','ul02');
        myFn('a03','ul03');
        myFn('a04','ul04');
        
        $(".content-menu").mCustomScrollbar({
            theme: 'minimal-dark',      // 滚动条的主题
            scrollInertia: 100,         // 滚动条的滚动动量，值越高，滚动条越平滑 0可以禁止动画
            axis: 'yx',                 // 水平和垂直滚动条
            mouseWheel: {               // 垂直方向滚动页面事出发这个事件
                enable: true,   
                axis: 'y',
                preventDefault: true
            }
        })

        // 选项卡对象
       
}

// 窗口发生变化时
window.onresize = function () {
    resizeFrameHeight();
    initScrollShow();
    initScrollState();
}
function resizeFrameHeight(){
    $('.tab_iframe').css('height',document.documentElement.clientHeight - 118);
    $('md-tab-content').css('left','0');
}

// iframe高度自适应
function changeFrameHeight(ifm) {
	ifm.height = document.documentElement.clientHeight - 118;
}


$(function() {
	// 选项卡点击
	$(document).on('click', '.content_tab li', function() {
		// 切换选项卡
		$('.content_tab li').removeClass('cur');
		$(this).addClass('cur');
		// 切换iframe
		$('.iframe').removeClass('cur');
		$('#iframe_' + $(this).data('index')).addClass('cur');
		var marginLeft = ($('#tabs').css('marginLeft').replace('px', ''));
		// 滚动到可视区域:在左侧
		if ($(this).position().left < marginLeft) {
			var left = $('.content_tab>ul').scrollLeft() + $(this).position().left - marginLeft;
			$('.content_tab>ul').animate({scrollLeft: left}, 200, function() {
				initScrollState();
			});
		}
		// 滚动到可视区域:在右侧
		if(($(this).position().left + $(this).width() - marginLeft) > document.getElementById('tabs').clientWidth) {
			var left = $('.content_tab>ul').scrollLeft() + (($(this).position().left + $(this).width() - marginLeft) - document.getElementById('tabs').clientWidth);
			$('.content_tab>ul').animate({scrollLeft: left}, 200, function() {
				initScrollState();
			});
		}
	});
	// 控制选项卡滚动位置 
	$(document).on('click', '.tab_left>a', function() {
		$('.content_tab>ul').animate({scrollLeft: $('.content_tab>ul').scrollLeft() - 300}, 200, function() {
			initScrollState();
		});
	});
	// 向右箭头
	$(document).on('click', '.tab_right>a', function() {
		$('.content_tab>ul').animate({scrollLeft: $('.content_tab>ul').scrollLeft() + 300}, 200, function() {
			initScrollState();
		});
    });
})


// 选项卡对象
var Tab = {
	addTab: function(title, url) {
        console.log('执行');
		var index = url.replace(/\./g, '_').replace(/\//g, '_').replace(/:/g, '_').replace(/\?/g, '_').replace(/,/g, '_').replace(/=/g, '_').replace(/&/g, '_')+title;
		// 如果存在选项卡，则激活，否则创建新选项卡
		if ($('#tab_' + index).length == 0) {
	 		// 添加选项卡
			$('.content_tab li').removeClass('cur');
            var tab = '<li id="tab_' + index +'" data-index="' + index + '" class="cur"><span class="waves-effect waves-light">' + title + '</span><i class="waves-effect waves-light zmdi zmdi-close" onclick="Tab.closeTab($(\'#tab_' + index +'\'));"></i></li>';
			$('.content_tab>ul').append(tab);
			// 添加iframe
			$('.iframe').removeClass('cur');
			var iframe = '<div id="iframe_' + index + '" class="iframe cur"><iframe class="tab_iframe" src="' + url + '" width="100%" frameborder="0" scrolling="auto" onload="changeFrameHeight(this)"></iframe></div>';
			$('.content_main').append(iframe);
			initScrollShow();
			$('.content_tab>ul').animate({scrollLeft: document.getElementById('tabs').scrollWidth - document.getElementById('tabs').clientWidth}, 200, function() {
				initScrollState();
			});
		} else {
			$('#tab_' + index).trigger('click');
		}
		// 关闭侧边栏
		$('#guide').trigger('click');
	},
	closeTab: function($item) {
		var closeable = $item.data('closeable');
		if (closeable != false) {
			// 如果当前时激活状态则关闭后激活左边选项卡
			if($item.hasClass('cur')) {
				$item.prev().trigger('click');
			}
			// 关闭当前选项卡
			var index = $item.data('index');
			$('#iframe_' + index).remove();
			$item.remove();
		}
		initScrollShow();
	}
}

function initScrollShow (){
    if(document.getElementById('tabs').scrollWidth > document.getElementById('tabs').clientWidth) {
        $('content_tab').addClass('srcoll');
    }else{
        $('.content_tab').removeClass('srcoll');
    }
}

function initScrollState(){
    if($('content_tab>ul').scrollLeft() == 0){
        $('.tab_left>a').removeClass('active');
    }else{
        $('.tab_left>a').addClass('active');
    }
    if (($('.content_tab>ul').scrollLeft() + document.getElementById('tabs').clientWidth) >= document.getElementById('tabs').scrollWidth) {
		$('.tab_right>a').removeClass('active');
	} else {
		$('.tab_right>a').addClass('active');
	}
}