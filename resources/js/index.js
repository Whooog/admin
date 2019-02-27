
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