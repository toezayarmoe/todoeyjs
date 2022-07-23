let addButton = document.getElementById("add");
let toDoList = document.getElementById("list");
let inputText = document.getElementById("inputText");

var toDoListArr = [];
retrieveList();
addButton.addEventListener('click', function () {
    if (inputText.value == ''){
        let alert = document.getElementById("error_msg");
        alert.innerHTML = "Please Input Something";
    }else {
        let alert = document.getElementById("error_msg");
        alert.innerHTML = "";
        toDoListArr.push({task: inputText.value, isDone: 0}); // Add the task to the array
        inputText.value = ''; // reseting the value inside input
        window.localStorage.setItem("list", JSON.stringify(toDoListArr)); // adding item to localStrorage
        console.log("something you don't know is happening")
        retrieveList();
    }// Creating UI or Reterviving List
});


function retrieveList() {
    var tableBody = document.getElementById("showItem"); // Geting the Table tag with id naming showItem
    tableBody.innerHTML = '';   // resetingg the UI so that the table not overlap 
    var localStorage = window.localStorage.getItem("list"); // getting the localStroage item naming list
    if (localStorage == null) { //if list is null do set toDolistArr to []
        toDoListArr = [];
    } else {
        toDoListArr = JSON.parse(localStorage); // if not null set assign it to toDoListArr
    }    
    toDoListArr.forEach((item , index) => {
        var tableBody = document.getElementById("showItem");// Geting the Table tag with id naming showItem and assign it to tableBody
        
        var td1 = document.createElement("td"); // creating table data1 for user input
        var td2 = document.createElement("td"); // creating table data2 for remove key
        var row = document.createElement("tr");
        // console.log(item["task"])
        td1.innerHTML = item["task"];
        if (item['isDone'] == 1) {
            td1.style.textDecoration = 'line-through';
        } else {
            td1.style.textDecoration = '';
        }
        // add item which is from localStorage (i.e :  task ) to table data1
        td2.innerHTML = "remove"; // nothing special this is remove 
        
        // that is add styling
        td1.classList.add('item');  
        td2.classList.add('remove'); 
        //adding to tr element 
        row.appendChild(td1);
        row.appendChild(td2);
        //adding tr to table element 
        tableBody.appendChild(row);
        

        // this is what happen when you click the task 
        td1.addEventListener("click", function () {
            if (item['isDone'] == 0) {
                item['isDone'] = 1;
                td1.style.textDecoration = 'line-through';
                window.localStorage.setItem("list",JSON.stringify(toDoListArr));
            } else {
                item['isDone'] = 0;
                td1.style.textDecoration = '';
                window.localStorage.setItem("list",JSON.stringify(toDoListArr));
            }
        });

        // this is what happen when you click remove 
        
        td2.addEventListener("click", function () {
            tableBody.removeChild(row);
            toDoListArr.splice(index,1);
            console.log(index);
            window.localStorage.setItem("list",JSON.stringify(toDoListArr));
            retrieveList(); // in order not to overlap table I need to recreate table 
        });
    });
}
