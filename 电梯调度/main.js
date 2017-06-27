window.onload = function(){createElevator(); creatcontrol(); dealing();}//还差上行下行开门关门报警五种功能，打算使用inline来实现。上行下行只要有按钮就行，傻逼功能 

var elevators = new Array();

elevators[0] = new Object();
elevators[0].floor = 1;
elevators[0].status = 0;//0代表待命 1代表上 2代表下
elevators[0].value = 0;
elevators[0].goal = new Array();
elevators[1] = new Object();
elevators[1].floor = 1;
elevators[1].status = 0;
elevators[1].value = 1;
elevators[1].goal = new Array();
elevators[2] = new Object();
elevators[2].floor = 1;
elevators[2].status = 0;
elevators[2].value = 2;
elevators[2].goal = new Array();
elevators[3] = new Object();
elevators[3].floor = 1;
elevators[3].status = 0;
elevators[3].value = 3;
elevators[3].goal = new Array();
elevators[4] = new Object();
elevators[4].floor = 1;
elevators[4].status = 0;
elevators[4].value = 4;
elevators[4].goal = new Array();

function createElevator()                                               //开门关门使用两种颜色来解决，在到达的时候设置第四种状态开关门 ， 报警放一个音效就行
{                                                                       //明天下午再写 
    var buttons = document.getElementById("buttons");
    for(var i=0; i<5 ; i++)
    {
        createBuilding(i);
    }
}

function createBuilding(temp)
{
    var all = document.getElementById("buttons");
    var building = document.createElement("div");
    building.id="building"+temp;
    building.className = "building";
    all.appendChild(building);
    var Up = document.createElement("div");
    Up.id = "building" + temp + "Up";
    Up.className = "building"+"Up";
    building.appendChild(Up);
    var Middle = document.createElement("div");
    Middle.id = "building" +temp + "Middle";
    Middle.className = "buildingMiddle";
    building.appendChild(Middle);
    var Down=document.createElement("div");
    Down.id = "building" + temp + "Down";
    Down.className = "building" + "Down";
    building.appendChild(Down);
    createButtonUp(temp);
    createMiddle(temp);
    createButtonDown(temp);

}


function createButtonUp(temp)
{
    var  Up = document.getElementById("building"+temp+"Up");
    for(var i=20;i>=1;i--){
        var  button = document.createElement("div");
        button.id="building"+temp+"button" + i+"Up";
        button.className = "building" + temp ;
        button.className = "Up"
        button.value = i;
        button.addEventListener("click" , function(){
            var li = parseInt(this.id.slice(15))
            GoUp(li)});//增加事件监听UP
        var text = document.createElement("p");
        text.innerHTML = "Up";
        button.appendChild(text);
        Up.appendChild(button);
    }
}

function createMiddle(temp){
    var Middle = document.getElementById("building"  + temp + "Middle");
    for(var i=20;i>=1;i--){
        var  button = document.createElement("div");
        button.id="building"+temp+"button" + i+"Middle";
        button.className = "building" + temp ;
        button.className = "Middle"
        Middle.appendChild(button);
    }
}

function createButtonDown(temp)
{
    var  Down = document.getElementById("building"+temp+"Down");
    for(var i=20;i>=1;i--){
        var  button = document.createElement("div");
        button.id="building"+temp+"button" + i+"Down";
        button.className = "building" + temp ;
        button.className = "Down";
        button.addEventListener("click" , function(){
            var li = parseInt(this.id.slice(15))
            GoDown(li)});//事件监听down

         var text = document.createElement("p");
        text.innerHTML = "Down";
        button.appendChild(text);
        Down.appendChild(button);
    }
}

function creatcontrol()//下面五个框，表示电梯内部
{
    var elevator = document.getElementById("elevator");
    for(var i=0;i<5;i++){
        var con = document.createElement("div");
        con.id = "con"+i;
        con.className = "con";
        elevator.appendChild(con);
        createInner(i);
    }
}

function createInner(temp)//电梯里面的按键
{
    var con = document.getElementById("con"+temp);
    var floor = document.createElement("h4");
    floor.innerHTML = "1";
    floor.id = "floor"+temp;
    var hr = document.createElement("hr");
    var hr2 = document.createElement("hr");
    var buttons = document.createElement("div");
   buttons.className="control"; 
     //上下下行开门关门报警
    var goingup = document.createElement("p");
    goingup.innerHTML = "上行";
    goingup.className = "gongneng";
    var goingdown = document.createElement("p")
    goingdown.innerHTML = "下行";
    goingdown.className = "gongneng";
    var dooropen = document.createElement("p");
    dooropen.innerHTML = "开门";
    dooropen.className = "gongneng";
    var doorclose = document.createElement("p");
    doorclose.innerHTML = "关门";
    doorclose.className = "gongneng";
    var alert = document.createElement("p");
    alert.innerHTML = "报警";
    alert.className = "gongneng";
    alert.style.backgroundColor = "red"
    for(var i=1 ;i<=10;i++)
    {
        var div = document.createElement("div");
        div.className="conNum1";
        div.id=i;
        var num = document.createElement("p");
        num.innerHTML = i;
        buttons.appendChild(div);
        div.appendChild(num);
        div.addEventListener("click" , function(){
            var li = parseInt(this.id);
            number(li , temp);            
        });
        
    }
       for(var i=11 ;i<=20;i++)
    {
        var div = document.createElement("div");
        div.className="conNum2";
        div.id=i;
        var num = document.createElement("p");
        num.innerHTML = i;
        buttons.appendChild(div);
        div.appendChild(num);
        div.addEventListener("click" , function(){
            var li = parseInt(this.id);
            number(li , temp);
        });
    }
    con.appendChild(floor);
    con.appendChild(hr);
    var status = document.createElement("p");
    status.innerHTML = "Up";
    con.appendChild(status);
    con.appendChild(hr2);
    con.appendChild(buttons);
  
    con.appendChild(goingup);
    con.appendChild(goingdown);
    con.appendChild(dooropen);
    con.appendChild(doorclose);
    con.appendChild(alert);
    alert.addEventListener("click" ,baojing );
    //开门关门还没实现
    dooropen.addEventListener("click" , function(){
        opendoor(temp);
    });
    doorclose.addEventListener("click" , function()
    {
        closedoor(temp);
    });

}

function baojing()
{
    alert("助教太帅，已报警");
}

function opendoor(temp)
{
     if(elevators[temp].goal[0] == elevators[temp].floor||elevators[temp].goal.length == 0)
        {
            elevators[temp].status =0;
            elevators[temp].goal.shift();
            document.getElementById("building"+elevators[temp].value+"button"+elevators[temp].floor+"Middle").style.backgroundColor = "white";
            document.getElementById("building"+elevators[temp].value+"button"+elevators[temp].floor+"Middle").innerHTML = "门已开";
        }
}

function closedoor(temp)
{
            document.getElementById("building"+elevators[temp].value+"button"+elevators[temp].floor+"Middle").style.backgroundColor = "yellow";
            document.getElementById("building"+elevators[temp].value+"button"+elevators[temp].floor+"Middle").innerHTML = elevators[temp].floor;      
}

//写入html与增加监听器的问题在上方

function getNearestUp(li)
{
    var elevatorNum = -1;
    var min = 21;
    for(var i=0; i<5 ;i++)
    {
        if(elevators[i].floor<li && elevators[i].status <=1)//找到符合条件的电梯
        {
            var result = li-elevators[i].floor;
            if(result<min)
            {
                min = result;
                elevatorNum=i;
            }
        }
    }
    if(elevatorNum == -1)
    {
        return getNearest(li);//表示没找到符合要求的电梯
    }
    else{
  
        return elevatorNum;//表示找到了，下一步可以直接移动
    }
}

function getNearestDown(li)
{
    var elevatorNum = -1;
    var min = 21;
    for(var i=0; i<5 ;i++)
    {
        if(elevators[i].floor>li && (elevators[i].status==2||elevators[i].status==0))//找到符合条件的电梯
        {
            var result = elevators[i].floor-li;
            if(result<min)
            {
                min = result;
                elevatorNum=i;
            }
        }
    }
    if(elevatorNum == -1)
    {

        return getNearest(li);
        //表示没找到符合要求的电梯
    }
    else{
      
        return elevatorNum;//表示找到了，下一步可以直接移动
    }
}

function GoUp(li)
{
    var elevatorNum = -1;
    elevatorNum = getNearestUp(li);
    if(elevatorNum==-1)
    {

    }
    else//找到合适的电梯后直接向电梯分配任务
    {
        elevators[elevatorNum].status = 1;
        move(li , elevatorNum);
    }
}

function GoDown(li)
{
    var elevatorNum = -1;
    elevatorNum = getNearestDown(li);
     if(elevatorNum==-1)
    {

    }
    else//找到合适的电梯后直接向电梯分配任务
    {
        elevators[elevatorNum].status = 2;
        move(li , elevatorNum);
    }
}

function number(li , temp)
{
    move(li , temp);
}


function move(li,elevatorNum)
{
    elevators[elevatorNum].goal.push(li);
    console.log(elevatorNum , elevators[elevatorNum].goal);
}

function dealing()
{
    setInterval("working(elevators[0])" , 1000);
     setInterval("working(elevators[1])" , 1000);
      setInterval("working(elevators[2])" , 1000);
       setInterval("working(elevators[3])" , 1000);
        setInterval("working(elevators[4])" , 1000);
        console.log("1");
}

function working(temp)
{
    console.log("2");
    if(temp.goal.length!=0){
        if(temp.goal[0]<temp.floor)
        {
            temp.status = 2;
            document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").style.backgroundColor = "white";
             document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").innerHTML = " "
            temp.floor-=1;
            document.getElementById("floor"+temp.value).innerHTML = temp.floor;
            document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").style.backgroundColor = "red";
             document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").innerHTML = temp.floor;
        }
        else if(temp.goal[0]>temp.floor)
        {
            temp.status = 1;
            document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").style.backgroundColor = "white";
             document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").innerHTML = "  ";
            temp.floor+=1;
            document.getElementById("floor"+temp.value).innerHTML = temp.floor;
            document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").style.backgroundColor = "green";
             document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").innerHTML = temp.floor;
        }
        else if(temp.goal[0] == temp.floor)
        {
            temp.status =0;
            temp.goal.shift();
            document.getElementById("building"+temp.value+"button"+temp.floor+"Middle").style.backgroundColor = "yellow";
        }
    }
    else if(temp.goal.length==0)
    {
        temp.status = 0;

    }
}

function getNearest(li)
{
    var elevatorNum = -1;
    var min = 21;
    for(var i=0; i<5 ;i++)
    {
        if(elevators[i].status!=3)
        {
            var result = Math.abs(li-elevators[i].floor);
            if(result<min)
            {
                min = result;
                elevatorNum=i;
            }
        }
    } 
    return elevatorNum;

}