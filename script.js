//유저가 값을 입력한다
let taskInput = document.getElementById("task_input")
let addButton = document.getElementById("add_button")

addButton.addEventListener("click",addTask)

// + 버튼을 클릭하면 할일이 추가된다.
let taskList = []

// 유저가 input창에 입력시에 새로운 칸으로 노출시키기
taskInput.addEventListener("focus",function(){taskInput.value=""})

function addTask(){
//    let taskContent=taskInput.value
   let task = {
    id:randomIDGenerate(),//아이디 부여하고 / id값이 유니크해야함
    taskContent:taskInput.value,
    isComplete:false//끝났는지 안끝났는지 구분하기 - 아직 안됨false
   }
   taskList.push(task)
   console.log(taskList)
   render();
}

//id값은 랜덤으로 생성시켜주는 함수 
function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
} 


// delete버튼을 누르면 할일이 리스트에서 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 1. check버튼을 클릭하는 순간  false을 true로 바꾸기
// 2. true 이면 끝난걸로 간주하고 밀줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로
// delete버튼을 누르면 할일이 리스트에서 삭제된다.
function render(){
    let resultHTML=""
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task_done">${taskList[i].taskContent}</div> 
            <div>
                <button class="check_btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-square-check fa-2xl"></i></button>
                <button class="delete_btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-ban fa-2xl"></i></button>
            </div>
        </div>`
        }else{
            resultHTML+=`<div class="task">
            <div>${taskList[i].taskContent}</div> 
            <div>
                <button class="check_btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-square-check fa-2xl"></i></button>
                <button class="delete_btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-ban fa-2xl"></i></button>
            </div>
        </div>`
        }
    }

    document.getElementById("task_board").innerHTML=resultHTML
}


function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete;
            // false 값 = false값이 아니다(true)
            break
        }
    }
    render()
    console.log(taskList)
}//id값을 불고 체크 누르면 true로 바꾸기


function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남 탭은 끝난 아이템만 / 진행중탭은 진행중인 아이템만 나온다
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

