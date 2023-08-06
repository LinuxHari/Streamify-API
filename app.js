//Importing express to use middlewares
const express = require('express');

//Importing joi for input validation
const Joi = require('joi');

//Creating a middleware for routing 
const app = express();

//Checks for environment varialble named PORT or uses port 3000
const port= process.env.PORT || 3000;

//Below json method is used for parsing data from form
app.use(express.json());

//List of genres
const genres = [{id:1,genre:'action'},{id:2,genre:'comedy'},{id:3,genre:'horror'},{id:4,genre:'crime thriller'}]

//Middleware for get method
app.get('/api/genres/',(req,res)=>{
    res.send(genres);
})

//Middleware for post method
app.post('/api/genres/',(req,res)=>{
    result = validate(req.body.genre);
    if(result.error) return  res.send(result.error.details[0].message);
    else{
        genres.push({id:genres.length + 1,genre:req.body.genre})
        res.send(genres);
    }

})

//Middleware for put method
app.put('/api/genres/:id',(req,res)=>{
    const result = validate(req.body.genre);
    
    if(result.error) res.send(result.error.details[0].message);
    
    else{
        const id = req.params.id;
        const index = genres.findIndex(genre => id == genre.id);
        if(index != -1){
            genres[index].genre = req.body.genre;
            res.send(genres);
        }
        else res.send('Given id does not exist...')
}})

//Middleware for delete method
app.delete('/api/genres/:id/',(req,res)=>{
        const id = req.params.id;
        const index = genres.findIndex(genre => id == genre.id);
        if(index != -1){
            genres.splice(index,1);
            res.send(genres);
        }
        else res.send('Given id does not exist...')
})

//Validate function checks whether user input matches given input requirement
function validate(genre){
    const schema = Joi.object({genre:Joi.string().min(4).max(20).required()});
    const result = schema.validate({genre});
    return result;
}

//Starting a server
app.listen(port,()=>{
    console.log("Server is listening in port"+port);
})