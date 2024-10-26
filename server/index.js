const express = require('express')
const app = express()
const cors = require('cors')

const homeRouter = require('./routes/homeRouter');

app.use(cors())

app.use("/", homeRouter)

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})