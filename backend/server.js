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
    openapi: "3.0.0",
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
 * /api/products:
 *   get:
 *     summary: gets all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: the list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/api/products', (req, res, next) => {
  try{
    res.status(200).send(JSON.stringify(data));
  } catch (err){
    next(err);
  }
})

/**
 * @swagger
 * /api/edit/{productId}: 
 *  get:
 *    summary: get a product
 *    tags: [Products]
 *    description: used to request a product
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        description: String guid
 *        schema: 
 *          type: string
 *          example: 26d11b24-1486-47c6-96c0-8d61217d5922
 *    responses:
 *      '200' : 
 *        description : returns product
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 */
app.get('/api/edit/:productId', (req, res, next) => {
  try{
    const productId = req.params.productId;
    const product = data.find( p => p.productId === productId);
    if(!product) throw new ExpressError(400, 'no matching product')
    
    res.status(200).send(JSON.stringify(product));
  } catch(err){
    next(err)
  }
})

/**
 * @swagger
 * /api/products: 
 *  post:
 *    summary: add a product
 *    tags: [Products]
 *    description: used to create a product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productName : 
 *                type: string
 *                example: HelloWorld
 *              startDate : 
 *                type: string
 *                example: 2023-01-01
 *              methodology : 
 *                type: string
 *                example: agile
 *              productOwnerName : 
 *                type: string
 *                example: Bob Smith
 *              scrumMasterName : 
 *                type: string
 *                example: Jet Lane
 *              developers : 
 *                type: array
 *                items : 
 *                  type: string
 *                example: [John Doe,Jane Doe ]
 *    responses:
 *      '201' : 
 *        description : product was created
 */
app.post('/api/products', async (req, res, next) => {
  try{
    const {productName, startDate, methodology, productOwnerName, scrumMasterName, developers} = req.body;
    // validate body
    if(!productName || !startDate || !methodology || !productOwnerName || !scrumMasterName || !developers ){
      throw new ExpressError(400, 'required fields incomplete')
    }

    // generates id
    const guid = aguid();
    const newProduct = {
      productId : guid,
      productName, 
      startDate, 
      methodology, 
      productOwnerName, 
      scrumMasterName, 
      developers
    };
    
    data.push(newProduct);
    fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));
    
    res.status(201).send(JSON.stringify(data));
  } catch(err) {
    next(err)
  }
})

/**
 * @swagger
 * /api/edit/{productId}: 
 *  put:
 *    summary: edit a product
 *    tags: [Products]
 *    description: update a product by productId
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        description: id of the product to update
 *        schema: 
 *          type: string
 *          example: "26d11b24-1486-47c6-96c0-8d61217d5922"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      '200':
 *        description: product edited
 */
app.put('/api/edit/:productId', async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const {productName, startDate, methodology, productOwnerName, scrumMasterName, developers }= req.body;
    const body = {productName, startDate, methodology, productOwnerName, scrumMasterName, developers }; 
    // validate body
    if(!productName || !startDate || !methodology || !productOwnerName || !scrumMasterName || !developers ){
      throw new ExpressError(400, 'required fields incomplete')
    }

    const match = await data.find(p => p.productId === productId);
    if(!match) throw new ExpressError(400, 'no product matches');
    
    let index = await data.findIndex( p => p.productId === productId);
    data[index] = {productId : match.productId, ...body};

    fs.writeFileSync("./mock_data.json", JSON.stringify(data,null,4));

    res.status(200).send(JSON.stringify(data));
  } catch(err){
    next(err)
  }
})


// ERROR HANDLING
// 404 Route
app.all('*', (req, res, next)=> {
  next(new ExpressError(404, 'Resource not found.'));
})

// default error handler
app.use((error, req, res, next) => {
  if(!error.statusCode){
    error.statusCode = 500;
  }
  if(!error.message){
    error.message = "Whoops! Something went wrong.";
  }
  const obj = {message : error.message};
  res.status(error.statusCode).send(JSON.stringify(obj));
})


// LISTEN
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
})


// SWAGGER DEFINITIONS
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - startDate
 *       properties:
 *          productId:
 *            type: string
 *          productName:
 *            type: string
 *          startDate:
 *            type: string
 *          methodology:
 *            type: string
 *          productOwnerName: 
 *            type: string
 *          scrumMaster:
 *            type: string
 *          developers:
 *            type: array
 *            items:
 *              type: string
 *       example:
 *            productId : 26d11b24-1486-47c6-96c0-8d61217d5922,
 *            productName: Sub-Ex
 *            startDate: 2023-01-01
 *            methodology: agile
 *            productOwnerName : Rebecca Girling 
 *            scrumMasterName : Tom Smith 
 *            developers : [ John, Joe, Jane, Janet] 
 */

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: products of imb
 */




