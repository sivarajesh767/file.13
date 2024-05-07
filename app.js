const express = require("express")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const app = express()

const databasePath = path.join(__dirname, 'movieData.db')
app.use(express.json())

let database = null
const initlizeDbReverse = async()=>{
    try {
        database = await open({
            filename : databasePath,
            driver : sqlite3,
        })
        app.listen(3000, ()=>(console.log('Server Running at http://localhost:3000/')))
        process.exit(1)
        
    }catch(error){
        console.log(`DB Error: ${error.message}`)

    }
}

initlizeDbReverse()

const convertDbObjectToReverseDbObject = (dbObject) =>{
    return {
        movie_id : dbObject.movieId,
        director_id : dbObject.directorId,
        movie_name : dbObject.movieName,
        lead_actor : dbObject.leadActor,
    }
}

app.get('/movies/', async(request, response)=>{
    const getMoviesQuery = `
    SELECT
    *
    FROM
    movie;`

    const movieArray = await database.all(getMoviesQuery)
    response.send(`MovieName: "Captain America: The First Avenger"`)
})

module.exports = app