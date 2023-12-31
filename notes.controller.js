const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath=path.join(__dirname,'db.json')
async function addNotes(title){
    const notes= await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath,  JSON.stringify((notes)))
    console.log(chalk.bgGreen('Note was added'))
}
async function getNotes(){
    const notes = await fs.readFile(notesPath,{encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
const notes = await getNotes()
    console.log(chalk.bgBlue('List Notes'))
    notes.forEach(note=>{
        console.log(chalk.blue(note.id,note.title ))
    })
}

async function removeNote(id){
    const notes=getNotes()
    const newNotes=(await notes).filter((note)=>note.id!==id)
    await fs.writeFile(notesPath,  JSON.stringify((newNotes)))
    console.log(chalk.bgGreen('Note removed'))
}
async function updateNote(id,title){
    const notes=getNotes()
    const newNotes=(await notes).map((note)=>{
        if (note.id===id) {
            return {id,title}
        } else {
            return note
        }
    })
    await fs.writeFile(notesPath,  JSON.stringify((newNotes)))
    console.log(chalk.bgGreen('Note update'))
}

module.exports ={
    addNotes,
    getNotes,
    removeNote,
    updateNote
}