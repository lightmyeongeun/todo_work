//유저가 값을 입력한다
let taskInput = document.getElementById("task_input")
let addButton = document.getElementById("add_button")


addButton.addEventListener("click",addTask)

// + 버튼을 클릭하면 할일이 추가된다.
let taskList = []

function addTask(){
   let taskContent=taskInput.value
   taskList.push(taskContent)
   console.log(taskList)
   render();
}

function render(){
    let resultHTML=""
    for(let i=0;i<taskList.length;i++){
        resultHTML+=`<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.getElementById("task_board").innerHTML=resultHTML
}

// delete버튼을 누르면 할일이 리스트에서 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남 탭은 끝난 아이템만 / 진행중탭은 진행중인 아이템만 나온다
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴