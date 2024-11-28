const express = require('express')
const app = express()
const cors = require('cors')

const homeRouter = require('./routes/homeRouter');
const moviesRouter = require('./routes/homeRouter');
const moviedetailRouter = require('./routes/movieDetailRouter');
const usersRouter = require('./routes/usersRouter');
const profileRouter = require('./routes/profileRouter');
const adminRouter = require("./routes/adminRouter")

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter)
app.use("/movies", moviesRouter)
app.use("/moviedetail", moviedetailRouter)
app.use("/signin", usersRouter)
app.use("/profile", profileRouter)
app.use("/admin", adminRouter)

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})