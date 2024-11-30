const express = require('express')
const app = express()
const cors = require('cors')

const homeRouter = require('./routes/homeRouter');
const moviesRouter = require('./routes/homeRouter');
const moviedetailRouter = require('./routes/movieDetailRouter');
const usersRouter = require('./routes/usersRouter');
const profileRouter = require('./routes/profileRouter');
const adminRouter = require("./routes/adminRouter")
const scheduleRouter = require("./routes/scheduleRouter")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional for cookies
    next();
});

app.use(cors({ origin: true, credentials: true, optionSuccessStatus:200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter)
app.use("/movies", moviesRouter)
app.use("/moviedetail", moviedetailRouter)
app.use("/signin", usersRouter)
app.use("/profile", profileRouter)
app.use("/admin", adminRouter)
app.use("/schedules", scheduleRouter)


const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})