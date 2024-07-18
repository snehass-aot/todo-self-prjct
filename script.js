document.addEventListener("DOMContentLoaded",function(){

const input=document.getElementById("text");
const btn=document.getElementById("addBtn");
const task=document.getElementById("adTask");
const clr=document.getElementById("clrBtn");
const sort=document.getElementById("sort");
const search=document.getElementById("text1");


let arr = JSON.parse(localStorage.getItem("savedTasks")) || [];
let orgnlArr = JSON.parse(localStorage.getItem("savedTask")) || [];
displayTasks();

btn.addEventListener("click",()=>{
    const tasks = input.value.trim();
    const taskObj = {
      id: Date.now(),
      text:tasks
    }
    if(tasks==""){
        alert("please fill the fields");
        input.value="";
        return;
    }
    arr.push(taskObj);
    console.log(arr)
    orgnlArr.push(taskObj);
    saveTasks();
    displayTasks();
})
function displayTasks(){
    task.innerHTML = "";
    arr.forEach(element => {
     const elmt = document.createElement("li");
     elmt.className = "myTasks";
     elmt.innerHTML = element.text;
     task.appendChild(elmt);
     input.value="";
    });
    
}
clr.addEventListener("click",()=>{
    arr=[];
    orgnlArr=[];
    saveTasks();
    displayTasks();
})

sort.addEventListener('change',()=>{
    const sortType= sort.value.trim().toLowerCase();
    if(sortType==="asc"){
      //   const arr1=arr;
        arr.sort();
        displayTasks();
    }
    if(sortType=="desc"){
      //   const arr1=arr;
        arr.sort();
        arr.reverse()
        displayTasks();
    }
    if(sortType=="orgnl"){
         arr=orgnlArr;
         displayTasks();
    }
})

search.addEventListener('input',() => {
    const srValue = search.value.trim().toLowerCase();
    if(!srValue){
        displayTasks();
        return
    }

    const filterTask = arr.filter(element => element.text.includes(srValue))
    arr = filterTask;
    displayTasks();
    arr=orgnlArr
})


function saveTasks(){
    localStorage.setItem("savedTasks", JSON.stringify(arr));
    localStorage.setItem("savedTask",JSON.stringify(orgnlArr));
}
})


