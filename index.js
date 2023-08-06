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

// добавить в package.json -> "type":"modile"

/* для import
import path from "path";
import {fileURLToPath} from 'url'

const __filename = fileURLToPath((import.meta.url);
const __dirname = path.dirname((__filename))
*/
/*
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
*/

const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNotes,getNotes,removeNote,updateNote} = require('./notes.controller')

const port = 3000

// const basePath = path.join(__dirname,'pages')
const app=express()
app.set('view engine', 'ejs')
app.set('views','pages')
app.use(express.static(path.resolve(__dirname,'public') ))
app.use(express.urlencoded({
        extended: true
}))
app.use(express.json())

/*
const server= http.createServer(async (req, res )=>{
if (req.method==='GET'){
 const content = await fs.readFile(path.join(basePath,'index.ejs'))
    // res.setHeader('Content-Type','text/html')
    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    res.end(content)
} else if(req.method==='POST'){
    const body =[]
    res.writeHead(200,{
        'Content-Type':'text/plain; charset=utf-8'
    })
    req.on('data', data=>{
        body.push(Buffer.from(data))
    })
    req.on('end',()=>{
       const title= body.toString().split('=')[1].replaceAll('+',' ')
       addNotes(title)
       res.end(`Post Success: Title = ${title}`)
    })

}
})
*/
app.get('/', async (req, res)=>{
    // res.sendFile(path.join(basePath,'index.ejs'))
    res.render('index',{
        title:"Express app",
        notes: await getNotes(),
        created: false
    })
})
app.post('/', async (req, res)=>{
    if (req.headers['content-type']==="application/json;charset=utf-8"){
        console.log(req.body)
        await updateNote(req.body.id, req.body.title)
    } else {
        await addNotes(req.body.title)
    }
    res.render('index',{
        title:"Express app",
        notes: await getNotes(),
        created: true
    })
})
app.delete('/:id', async (req, res)=>{
    await removeNote(req.params.id)
    res.render('index',{
        title:"Express app",
        notes: await getNotes(),
        created: false
    })
})
app.listen(port,()=>{
console.log(chalk.green(`Server has been started on port ${port}`))
})