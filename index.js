const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()

dotenv.config();

const port = process.env.PORT || 3000;

// connect to db
mongoose
  .connect(
    process.env.DB_CONNECT,
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

app.get('/', (_, res) => {
  res.send('API running') // view
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
