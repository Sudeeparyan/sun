// const { email } = require("glyphicons");

console.log(email)


function taskDetails(e){
    console.log("taskDetails");
    let taskid=Date.now();
    let task={taskid,email};
    ["taskheading","startDate","endDate"].forEach(id => {
        
        task[id]=document.querySelector("#"+id).value;
        
    });
    console.log(task);
    fetch("/taskDetails",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
    })
    .then(function(res){ console.log(res)
    location.reload();
    })
    .catch(function(res){ console.log(res) })
}


document.querySelector("#taskDetails").addEventListener("click",function(e){
    taskDetails(e)
})

document.querySelector("#taskText").addEventListener("input",()=>{
    document.querySelector("#taskText").minHeight=document.querySelector("#taskText").scrollHeight+"px";
    console.log(document.querySelector("#taskText").scrollHeight)
})


fetch("/showDetails",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"mailId":email})
    })
   .then((res)=>res.json())
   .then((data)=>{
    var array =[]
    var keys = Object.keys(data)
    for(var i=0;i<keys.length;i++)
    {
array.push(data[keys[i]])
    }
    let display=``;
    for(let i=0; i<array.length; i++){
        display+=`
        <div id="task-box" >
            <div class="left-button">
            ${array[i].taskheading}
            <button id="edit" onclick="edit(${array[i].taskid})" class="btn btn-success"><i class="fa fa-solid fa-pen"></i></button>&nbsp;
            <button id="delete" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="dates">
            Start Date ${array[i].startDate}
            </div>
            <div class="dates">
            End Date ${array[i].endDate}
            </div>
        </div>

        <div id="popup" class="c${array[i].taskid}">
    <label>Project Name</label>
    <div>

    
    <input type="text" name="" id="popUpheading${array[i].taskid}" value="${array[i].taskheading}">
    <div class="form-group">
      <label for="date">Start Date</label>
      <input class="form-control" placeholder="date" value="${array[i].startDate}"
      name="date" id="popstartDate${array[i].taskid}" type="date"/>
    </div>
    <div class="form-group">
      <label for="date">End Date</label>
      <input class="form-control" placeholder="date" value="${array[i].endDate}"
      name="date" id="popendDate${array[i].taskid}" type="date"/>
    </div>
    <button class="btn btn-success" onclick="edit(${array[i].taskid})" >Update</button>
  </div>
  </div>
        `
    }
    
    document.querySelector("#main-box").innerHTML=display;
    // window.location.reload()
   })

function edit(e){
    document.querySelectorAll("#popup").forEach(element=>{
        element.style.display="none"
    })
    document.querySelector(".c"+e).style.display="block";
   
    let popUpheading=document.getElementById("popUpheading"+e).value;
    let popstartDate=document.getElementById("popstartDate"+e).value
    let popendDate=document.getElementById("popendDate"+e).value;
    console.log(popUpheading);
    let updatetask={};
    updatetask.id=e;
    updatetask.taskheading=popUpheading;
    updatetask.startDate=popstartDate;
    updatetask.endDate=popendDate;
    console.log(updatetask);
        fetch("/editTask",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({updatetask,taskid:e,mail:email})
        })
    .then((res)=>res.json())
}



document.querySelectorAll(".btn-warning").forEach((button)=>{
 button.addEventListener("click",()=>{
        button.classList.toggle("filter-selected");
    })
})