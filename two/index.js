const express=require('express');
const fs=require('fs')
const path=require('path')

const app=express()
const port=3000

app.use(express.json())

const userDir=path.join(__dirname,'users')

if(!fs.existsSync(userDir)){
    fs.mkdirSync(userDir)
}

app.post('/create/:username',(req,res)=>{
    const {username}=req.params;
    const filePath=path.join(userDir,`${username}.txt`)
    const defaultContent=`welcome ${username}!\n`;

    try{
        fs.writeFileSync(filePath,defaultContent);
        res.send(`file created:${username}.txt`)
    }catch(err){
        res.status(500).send('error creating file')
    }
    
})

//read
app.get('/read/:username',(req,res)=>{
    const{username}=req.params;
    const filePath=path.join(userDir,`${username}.txt`)

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err) return res.status(500).send('error reading file')
            res.send(data)
    })
})

//append
app.post('/update/:username',(req,res)=>{
    const{username}=req.params
const{newContent}=req.body;
const filePath=path.join(userDir,`${username}.txt`)

fs.appendFile(filePath,`${newContent}\n`,(err)=>{
    if(err)return res.status(500).send('error appending to file')
        res.send(`content added to ${username}.txt`)
})
})

//dlt file
app.delete('/delete/:username',(req,res)=>{
    const{username}=req.params
    const filePath=path.join(userDir,`${username}.txt`)

    try{
        fs.unlinkSync(filePath)
        res.send(`file deleted:${username}.txt`)
    }catch(err){
        res.status(500).send('error deleting ifle')
    }
})

app.listen(port,()=>{
    console.log(`server runing at http://localhost:${port}`)
})