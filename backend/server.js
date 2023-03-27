const express = require('express');
const aguid = require('aguid');
const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors')


// mock data
const data = require('./mock_data.json');

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true}))      // parses data from forms
app.use(express.json());                            // parse json 

// ROUTES
app.get('/api/programs', (req,res) => {
  res.status(200).send(JSON.stringify(data));
})

app.post('/api/programs', (req, res) => {
  const guid = aguid()
  const newProgram = {productId : guid , ...req.body}
  data.push(newProgram);
  res.status(200).send(JSON.stringify(data));
})

// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})