const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000;

// connect to db
mongoose
  .connect(
    'mongodb+srv://truong:Truong123456@cluster0.ak1kznv.mongodb.net/?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('Connect to success'))
  .catch(err => console.log('Connect to error: ', err));

app.use(express.json({
  extend: true
}))
app.use(express.urlencoded({
  extend: true
}))

//route
const userRoute = require('./src/route/user.route');

app.get('/', (req, res) => {
  res.send('Hello World! 1321321312123') // view
})

// route
app.use('/api/user', userRoute);

// start the server`
app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
})

// user: truong; pass: Truong123456: cms-auction
// db: nhattruongniit; 4GSvxHcwA2TvxEfN

/*

table
 - user
 - product


 */
