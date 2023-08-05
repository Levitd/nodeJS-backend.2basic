// const person ={
//     name: "Dmitry",
//     age: 51
// }
//
// function getName (p){
//     return p.name
// }
//
// console.log(getName(person))
//
// console.log(__filename)
// console.log(__dirname)
// console.log(process.argv)

const yargs = require("yargs")
const {addNotes,printNotes, removeNote} =require('./notes.controller')
const  prg = require('./package.json')

yargs.version()

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title:{
            type: 'string',
            describe: 'Note title',
            demandOption:true
        }
    },
    handler({title}) {
        addNotes(title)
    }
})

yargs.command({
    command: "list",
    describe: "Prints all notes ",
    async handler() {
        await printNotes()
    }
})
yargs.command({
    command: "remove",
    describe: "Remove note",
    builder: {
        id:{
            type: 'string',
            describe: 'Note id',
            demandOption:true
        }
    },
    async handler({id}) {
            await removeNote(id)
    }
})

yargs.parse()