//유저가 값을 입력한다
let taskInput = document.getElementById("task_input")
let addButton = document.getElementById("add_button")
let underLine=document.getElementById("under_line")//아래줄 따라오기
let taskList = []// + 버튼을 클릭하면 할일이 추가된다.
let tabs = document.querySelectorAll(".task_tabs div")
let mode="all"//처음 셋팅이 all이기 떄문에 설정
let filterList=[]//fitterList도 전역변수 설정

addButton.addEventListener("click",addTask)

// 유저가 input창에 입력시에 새로운 칸으로 노출시키기
// taskInput.addEventListener("focus",function(){taskInput.value=""})
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
});//enter키

for(let i = 1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function addTask(){
    if(taskInput.value ==""){
        return alert("할일을 추가해주세요")
    }//빈칸일시 -1 
//    let taskContent=taskInput.value
   let task = {
    id:randomIDGenerate(),//아이디 부여하고 / id값이 유니크해야함
    taskContent:taskInput.value,
    isComplete:false//끝났는지 안끝났는지 구분하기 - 아직 안됨false
   }
   taskList.push(task)
   taskInput.value=""//빈칸일시 -1 
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
    //1. 내가 선택한 탭에 따라서 : 정보는 mode: 지역변수를 글로벌 변수로 변화
    let list=[]
    if(mode === "all"){
        list=taskList//all - taskList     
    }else if(mode === "ongoing" || mode ==="done"){
        list=filterList//ongoing,done - filterList
    } //시작 - 
    //2. 리스트 달리 보여주기
    let resultHTML=""//html 다시 그리기(taskList) --> filter도 추가필요
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task_done">${list[i].taskContent}</div> 
            <div>
                <button class="check_btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square-check fa-2xl"></i></button>
                <button class="delete_btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-ban fa-2xl"></i></button>
            </div>
        </div>`
        }else{
            resultHTML+=`<div class="task">
            <div>${list[i].taskContent}</div> 
            <div>
                <button class="check_btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square-check fa-2xl"></i></button>
                <button class="delete_btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-ban fa-2xl"></i></button>
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
    filter()
    console.log(taskList)
}//id값을 불고 체크 누르면 true로 바꾸기


function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    filter()
}
//event - 내가 누구를 클릭했는지 알아보기
function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남 탭은 끝난 아이템만 / 진행중탭은 진행중인 아이템만 나온다
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

