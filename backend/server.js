const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true}))          // parses data from forms
app.use(express.json());                                // parse json 


// ROUTES
app.get('/', (req,res) => {
  res.status(200).send('welcome to landing');
})


// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})