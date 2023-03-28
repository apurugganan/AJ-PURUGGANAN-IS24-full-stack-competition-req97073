const express = require('express');
const aguid = require('aguid');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// mock data
const data = require('./mock_data.json');

// utilities
const ExpressError = require('./utilities/ExpressError');

// swagger
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info : {
      title: 'Products API',
      descrtiption : "Product API information",
      contact: {
        name : "AJ"
      },
      servers : ["http://localhost:3000"]
      
    }
  },
  apis: ["server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MIDDLEWARE
app.use(cors());                                    // allow cors
app.use(express.urlencoded({ extended: true}))      // parses data from forms
app.use(express.json());                            // parse json 

// ROUTES
/**
 * @swagger
 * /api/programs: 
 *  get:
 *    description: Used to request list of products
 *    responses:
 *      '200' : 
 *        description : a successful response
 */
app.get('/api/programs', (req,res) => {
  res.status(200).send(JSON.stringify(data));
})

/**
 * @swagger
 * /api/edit/:productId: 
 *  get:
 *    description: Used to request a product
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        description: String guid
 *        schema: 
 *          type: string
 *    responses:
 *      '200' : 
 *        description : a successful response
 */
app.get('/api/edit/:productId', (req, res, next) => {
  try{
    const productId = req.params.productId;
    const program = data.find( p => p.productId === productId);
    if(!program) throw new ExpressError(400, 'no matching product')
    
    res.status(200).send(JSON.stringify(program));
  } catch(err){
    next(err)
  }
})

/**
 * @swagger
 * /api/programs: 
 *  post:
 *    description: Used to create a product
 *    parameters:
 *      - in: body
 *        name: product
 *        required: true
 *        content:
 *          application/json:
 *          schema:
 *            type : object
 *            properties:
 *              productId : string
 *              productOwnerName : string
 *              scrumMasterName : string
 *              productName : string
 *              startDate : string
 *              methodology : string
 *              developers :
 *                type: array
 *                items:  
 *                  type: string
 *    responses:
 *      '201' : 
 *        description : successful added product 
 */
app.post('/api/programs', async (req, res, next) => {
  try{
    const {productName, startDate, methodology, productOwnerName, scrumMasterName, developers} = req.body;
    // validate body
    if(!productName || !startDate || !methodology || !productOwnerName || !scrumMasterName || !developers ){
      throw new ExpressError(400, 'required fields incomplete')
    }

    // generates id
    const guid = aguid();
    const newProgram = {
      productId : guid,
      productName, 
      startDate, 
      methodology, 
      productOwnerName, 
      scrumMasterName, 
      developers
    };
    
    data.push(newProgram);
    fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));
    
    res.status(201).send(JSON.stringify(data));

  } catch(err) {
    next(err)
  }
})


app.put('/api/edit/:productId', async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const editProgram = req.body;
    const findProgram = await data.find(p => p.productId === productId);

    if(!findProgram) throw new ExpressError(400, 'no product matches')
    let index = await data.findIndex( p => p.productId === productId);
    data[index] = {productId : findProgram.productId, ...editProgram};

    fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));

    res.status(200).send(JSON.stringify(data))
  } catch(err){
    next(err)
  }
})


// 404 Route
app.all('*', (req, res, next)=> {
  next(new ExpressError(404, 'Resource not found.'));
})

// default errorhandler
app.use((error, req, res, next) => {
  if(!error.statusCode){
    error.statusCode = 500
  }
  if(!error.message){
    error.message = "Whoops! Something went wrong."
  }
  const obj = {message : error.message}
  res.status(error.statusCode).send(JSON.stringify(obj))
})



// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})