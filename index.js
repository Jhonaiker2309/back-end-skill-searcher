import express from "express"
const app = express()
import cors from "cors"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/users",  (req,res) => {
   
    fetch(`${process.env.TORRE_PEOPLE_SEARCH}`, {    method: 'POST',
    headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
    const data = json.results.map(user => {
      return {name: user.name, username: user.username, skills: user.skills, picture: user.picture, headline: user.professionalHeadline}
    })
    
    res.status(200).send({data})
    }).catch(err => console.log(err))  
})

app.get('/user/:username', function (req, res) {
    const username = req.params.username;
    
    fetch(`${process.env.TORRE_USER_SEARCH}/${username}`).then(res => res.json()).then(data => {
      res.status(200).send({data})
    }).catch(err => {
      console.log(err)
    })
})    

app.listen(process.env.PORT || 5000, function(){
    console.log("Server running")
    })