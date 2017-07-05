now = new Object();
now.value = 0;//指令
now.page = 0;//页数
now.status = 2 //0代表取小的值不+1 ， 1代表取小的值+1，2代表取大的值不+1 ， 3代表取大的值+1 
now.temp = 0;//定时的标记值
now.count = 1;//缺页数
now.xuhao = 1;
var four = new Array(4);
for(var te=0;te<4;te++){
    four[te]=0;
}
var lose = new Number();
var pageNum = new Number();
pageNum = 0;
$(document).ready(function(){
    $("#start").click(function(){
        deal(now);
    });

    $("#auto").click(function(){
        now.temp = setInterval("deal(now)" , 500);
    });

    $("#end").click(function(){
        clearInterval(now.temp);
    });
});

function deal(now){
    //;    
    if(now.status==0){
        now.value = Math.floor(Math.random()*(now.value-1));
        now.status+=1;
    }
    else if(now.status==1){
        now.value+=1;
        now.status+=1;
    }
    else if(now.status==2){
        now.value =now.value + Math.floor(Math.random()*(319-now.value));
        now.status+=1;
    }
    else if(now.status==3){
        now.value+=1;
        now.status=0;
    }
    $("#xuhao").text(now.count);
    $("#zhiling").text(now.value);
    now.page = parseInt(now.value/10);
    $("#suozaiye").text(now.page);
    $("#xuhao").text(now.xuhao++);
    //console.log(now.page);
    loopPages();
    if(now.xuhao == 321){
        alert("缺页数为"+now.count);
        clearInterval(now.temp);
    }
}

function loopPages(){
    for(var i=0;i<4;i++){
        if(now.page==four[i]){
            $("#queye").text("否")
            $("#huanchuye").text("-");
            $("#huanruye").text("-");
            break;
        }
        else if(now.page!=four[i]&&i==3){
            $("#huanchuye").text(four[pageNum]);
            $("#huanruye").text(now.page);
            $("#queye").text("是")
            four[pageNum] = now.page;
            document.getElementById("b"+pageNum).innerHTML = four[pageNum];
            pageNum+=1;
            now.count+=1;
            if(pageNum==4){
                pageNum=0;
            }
        }    
    }
}

