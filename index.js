let globalTaskData = [];
taskContents = document.getElementById("table-body");

const addTask = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value 
    };

    taskContents.insertAdjacentHTML('beforeend', generateTask(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTask = ({id,title,description}) => {
    return (`<tr class="trow" id=${id} key=${id}>
              <td>${title}</td>
              <td>${description}</td>
              <td><i class="fas fa-edit btnedit" name=${id} onclick="editTask(this)"></i></td>
              <td><i class="fas fa-trash-alt btndelete" name=${id} onclick="deleteTask(this)"></i></td>
            </tr>`)
}


const saveToLocalStorage = () => {
    localStorage.setItem("task", JSON.stringify({tasks: globalTaskData}));            //store 
}


const reloadTask = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("task"));                      //to display
    console.log(localStorageCopy);
    if(localStorageCopy){
        globalTaskData = localStorageCopy["tasks"];
    }
    console.log(globalTaskData)
    globalTaskData.map((TaskData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTask(TaskData));
    });
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((TaskData) => TaskData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    console.log(targetID);
    var tr4 = document.getElementById(targetID)
    
	tr4.getElementsByTagName("td")[0].setAttribute("contenteditable", "true") 
	tr4.getElementsByTagName("td")[1].setAttribute("contenteditable", "true")
    var td= tr4.getElementsByTagName("td")[2]
    var btn = document.createElement("button");

   var textnode = document.createTextNode("Save");

   btn.appendChild(textnode);

   td.replaceChild(btn, td.childNodes[0]);  
   console.log(btn)

   btn.addEventListener("click", () => saveEditTask(targetID));
     
    
}

const saveEditTask = (targetID) => {
    console.log(targetID);
        var tr = document.getElementById(targetID)
        console.log(tr);
    const newTaskDetails = {
        id: targetID,
        title: tr.getElementsByTagName("td")[0].innerHTML,
        description: tr.getElementsByTagName("td")[1].innerHTML
    }
    console.log(newTaskDetails)
    const refid = targetID
    console.log(refid)
    objIndex = globalTaskData.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    globalTaskData[objIndex] = newTaskDetails
    
    saveToLocalStorage();
    window.location.reload();
}

const deleteall = () => {
    globalTaskData = [];
    saveToLocalStorage();
    window.location.reload();
}
var dt = document.getElementById("deleteall")
dt.addEventListener("click",deleteall)


const searchfun = () => {
    let filter = document.getElementById('searchtextbox').value.toUpperCase();

    let mytable = document.getElementById('table');
    let tr = mytable.getElementsByTagName('tr');

    for(var i=0; i<tr.length; i++){
        let td = tr[i].getElementsByTagName('td')[0];

        if(td){
            let textvalue = td.textContent || td.innerHTML;

            if(textvalue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
}



