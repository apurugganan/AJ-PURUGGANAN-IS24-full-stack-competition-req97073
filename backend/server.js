const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// mock data
const data = require('./mock_data.json');

app.use(express.urlencoded({ extended: true}))          // parses data from forms
app.use(express.json());                                // parse json 


// ROUTES
app.get('/', (req,res) => {
  res.status(200).send(JSON.stringify(data));
})


// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})