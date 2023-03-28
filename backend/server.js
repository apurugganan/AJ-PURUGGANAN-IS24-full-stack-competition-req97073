const express = require('express');
const aguid = require('aguid');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const fs = require('fs');


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

app.get('/api/edit/:productId', (req, res) => {
  const productId = req.params.productId;
  const program = data.find( p => p.productId === productId)
  res.status(200).send(JSON.stringify(program))
})

app.post('/api/programs', async (req, res) => {
  const guid = aguid()
  const newProgram = {productId : guid , ...req.body}
  data.push(newProgram);
  fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));

  res.status(200).send(JSON.stringify(data));
})

app.patch('/api/edit/:productId', async (req, res) => {
  const productId = req.params.productId
  const editProgram = req.body;
  const findProgram = data.find(p => p.productId === productId);
  let index = data.findIndex( p => p.productId === productId);
  data[index] = {productId : findProgram.productId, ...editProgram};
  fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));

  res.status(200).send(JSON.stringify(data))
})

// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})