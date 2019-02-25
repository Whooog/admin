
window.onload=function(){
    function myFn(param1,param2){
        var myli = document.getElementById(param1);
        var myul = document.getElementById(param2);
        console.log(myul);
        myli.onclick = function(){
            myul.style.display = myul.style.display=="block"?"none":"block"; 
            }
        }
        myFn('a01','ul01');
        myFn('a02','ul02');
        myFn('a03','ul03');
        myFn('a04','ul04');
        
}
