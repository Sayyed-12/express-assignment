const express=require('express')
const app=express();
const port=3000;

app.use(express.json()); //middleware

let users=[];

function isValidUser(user){
    return (
        typeof user.name=== 'string' &&
        user.name.trim()!==''&&
        typeof user.age === 'number'
    )
}

//add new user
app.post('/users',(req,res)=>{
    const newUser=req.body

    if(!isValidUser(newUser)){
        return res.status(400).json({error:'invalid input, name must e string age must be number'})
    }
 
const duplicate=users.find(user=>user.name.toLowerCase()===newUser.name.toLowerCase())
if(duplicate){
    return res.status(409).json({error:'user with this name already exist'})
}

users.push(newUser)
res.status(201).json({message:'user added',user:newUser})
})

app.get('/users',(req,res)=>{
    res.json(users)
})



app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})