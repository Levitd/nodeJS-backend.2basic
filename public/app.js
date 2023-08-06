document.addEventListener('click',(event)=>{
if (event.target.dataset.type==="remove"){
    const id=event.target.dataset.id
    remove(id).then(()=>{
        event.target.closest('li').remove()
    })
} else if (event.target.dataset.type==="edit"){
    const id=event.target.dataset.id
    event.target.closest('li').classList.add("active")
    const titleEl = event.target.closest('li').childNodes[1]
    const title = titleEl.innerText
    const titleInModal = document.querySelector('.title_in_modal')
    titleInModal.value=title
    titleInModal.dataset.id=id
    const modal = document.querySelector('.modal')
    modal.style.display="block"
} else if (event.target.dataset.type==="RemoveModal"){
    const modal = document.querySelector('.modal')
    modal.style.display=""
    const titleEl = document.querySelector('.active')
    titleEl.classList.remove("active")

} else if(event.target.dataset.type==="saveNewTitle"){
    const titleInModal = document.querySelector('.title_in_modal')
    const newTitle=titleInModal.value
    const id=titleInModal.dataset.id
    update(id,newTitle).then(()=>{
        const titleEl = document.querySelector('.active')
        titleEl.childNodes[1].innerText=newTitle
        titleEl.classList.remove("active")
        const modal = document.querySelector('.modal')
        modal.style.display=""
    })
}
})

async function remove(id){
    await fetch(`/${id}`,{
        method: 'DELETE'
    })
}
async function update(id,title){
    await fetch(`/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id: id, title: title})
    })
}
