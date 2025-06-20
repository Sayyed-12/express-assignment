const express=require('express')
const app=express();
const port=3000;

app.use(express.json()); //middleware

let users=[];

//middleware(validation)

function validateUser(req,res,next){
    const user=req.body;

    if(typeof user.name!=='string'||user.name.trim()===''||typeof user.age!=='number'){
        return res.status(400).json({
            error:"invalid input:name must be a nonempty string and age must be a number",
        })
    }
next(); //ie if valid goto next midleware
}

//add new user
app.post('/users',validateUser,(req,res)=>{
    const newUser=req.body
 
const duplicate=users.find(user=>user.name.toLowerCase()===newUser.name.toLowerCase())
if(duplicate){
    return res.status(409).json({error:'user with this name already exist'})
}

users.push(newUser)
res.status(201).json({message:'user added',user:newUser})
})
 //get users
app.get('/users',(req,res)=>{
    res.json(users)
})



app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
