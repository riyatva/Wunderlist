let  addButn = document.getElementById("addButn");
let cont = document.querySelector(".cont");
let input = document.querySelector("#inp");

let tasksArray = []; 
// 3) Refresh karne par local Storage se data udta nhi hai , UI se bhi nhi udna chahiye .

let olderTask = localStorage.getItem("Tasks");// Mujhe local Storage se chahiye ..
if(olderTask){
   
  let parsedArray = JSON.parse(olderTask);
  tasksArray = [...parsedArray];
  ticketAdderToUI(tasksArray);
}
addButn.addEventListener("click",function(){
     let value = input.value; 
     input.value = "";
     if(value.length == 0){
        return;
     }
      //LS 1)Add Task: 
      // Hum har task ko ek unique id dena chahtein hain.
      let taskObj = {
         id : Date.now(),
         task : value
      } 
      tasksArray.push(taskObj);
      ticketAdderToUI(tasksArray); // ek function hai jo tickets add karta hai and double click hone pe delete kar deta hai.
      localStorage.setItem("Tasks",JSON.stringify(tasksArray)); 
});

function ticketAdderToUI(arr){
  
 
 // Mujhe har element pe iterate karna hai tasksArray.
  cont.innerHTML = "";
 

 tasksArray.forEach(function(taskObj){
  let id = taskObj.id;
  
  let taskEle = document.createElement("div");
  taskEle.classList.add(".task");
      taskEle.innerHTML = ` <p>${taskObj.task}</p>
       <div class="dlt"> &nbsp&nbsp
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" ><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg>
      </div> `;

       // Delete Functionality :
      let delButn = taskEle.querySelector(".dlt");

      delButn.addEventListener("dblclick",function(){
        cont.removeChild(taskEle);
      
        //LS 2) Delete Task:
      //  console.log(tasksArray);
       let filtered_Array = tasksArray.filter(function(taskObj){
          return taskObj.id != id ; 
       })
       tasksArray = filtered_Array;
       localStorage.setItem("Tasks",JSON.stringify(tasksArray)); // local Storage mein bhi tasks update kar diya.
      });
     
     cont.appendChild(taskEle); 
 })
};




