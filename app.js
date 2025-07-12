const form = document.querySelector('form')
const inputField= document.querySelector('#inputTodo')
const result= document.querySelector('.result')
const idSet = ["a","b","c","d","e","f","g","h"]

//get data when page load
window.addEventListener('load',()=>{
    if(localStorage.getItem('Todos')!=null){
        let todosStore=getDataLocalStorage();
        todosStore.forEach(todo=>{
            todosFunction(todo.id,todo.data)
        })
    }
    
})

//form action
form.addEventListener('submit',(e)=>{
e.preventDefault()
if(inputField.value===''){
alert('Please Enter Your Todos!')
}else{
let idMaker = idSet[Math.floor(Math.random()*7)]
let id = result.childElementCount+idMaker;
todosFunction(id,inputField.value)
storeDataLocalStorage(id,inputField.value)
inputField.value='';

}

})

//makeing structure
function todosFunction(id,data){
    let div= document.createElement('div')
    div.className='todoTaskContainer';
    div.setAttribute('data-id',id)
    div.innerHTML=`<div class="textContainer"><h2>${data}</h2></div>
            <div class="contorler">
                <span title="done" data-id=${id}  class="completeTodo"><i class="fa-solid fa-circle-check"></i></span>
                <span title="edit" data-id=${id}  class="editTodo"><i class="fa-solid fa-pen-to-square"></i></span>
                <span title="delete" data-id=${id} class="deleteTodo"><i class="fa-solid fa-trash"></i></span>
            </div>`

    result.appendChild(div)
    //complete todos mark
    doneTodo()
    //delete todos
    deleteTodo()
    
    
}

//done event
function doneTodo(){
        let done= document.querySelectorAll('.completeTodo');
        done.forEach(doneBtn=>{
            doneBtn.addEventListener('click',()=>{
                doneBtn.parentElement.previousElementSibling.classList.add('complete')
        })
        
      })
}

//delete event
function deleteTodo(){
        let deleteBtns= document.querySelectorAll('.deleteTodo');
        let deleteId;
        deleteBtns.forEach(deleteBtn=>{
            deleteBtn.addEventListener('click',()=>{
                deleteId=deleteBtn.getAttribute('data-id')
                deleteBtn.parentElement.parentElement.remove()
                deleteDataLocalStorage(deleteId)
            })
        
      })

      
}

//localhost setup
function getDataLocalStorage(){
    let storage;
    if(localStorage.getItem('Todos')==null){
        storage=[]
    }else{
        storage=JSON.parse(localStorage.getItem('Todos'))
    }
    return storage;
}

//store data in localstorage
function storeDataLocalStorage(id,data){
    let storage= getDataLocalStorage();
    let todo={
        id,
        data
    }
    storage.push(todo)
    localStorage.setItem('Todos',JSON.stringify(storage))
}

//delete data
function deleteDataLocalStorage(id){
    let storage= getDataLocalStorage()
    let updateStorge = storage.filter(ele=>{
        return ele.id!=id;
    })
    localStorage.setItem('Todos',JSON.stringify(updateStorge))

}

