const express = require('express')
const app = express()
const cors = require('cors')

const homeRouter = require('./routes/homeRouter');
const moviesRouter = require('./routes/homeRouter');
const moviedetailRouter = require('./routes/movieDetailRouter');

app.use(cors())

app.use("/", homeRouter)
app.use("/movies", moviesRouter)
app.use("/moviedetail", moviedetailRouter)

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})