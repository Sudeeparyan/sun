console.log(email)

function taskDetails(){
    let taskid=Date.now();
    let task={taskid,email};
    ["taskheading","startDate","endDate"].forEach(id=>{
        task[id]=document.querySelector("#"+id).value;
    });
    // console.log(task);
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

document.querySelector("#taskDetails").addEventListener("click", function(){
    taskDetails()
})