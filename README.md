
# Province of BC: Coding Challenge
#### Entry: AJ-PURUGGANAN-IS24-full-stack-competition-req97073.git

## Description
Build a Web Application that tracks and manages Web Applications developed by the Province of BC as outlined in git repository: https://github.com/bcgov/citz-imb-full-stack-code-challenge-req97073 as of March 27,2023.

## Frameworks
### Backend
- ExpressJS

### Frontend
- ReactJS

## Installation

### Option 1
1. Clone repository on terminal:
```
git clone https://github.com/apurugganan/AJ-PURUGGANAN-IS24-full-stack-competition-req97073.git
```

2. Navigate to project folder
```
cd AJ-PURUGGANAN-IS24-full-stack-competition-req97073 
```

3. Navigate to backend folder and install node modules
```
cd backend
npm install
```

4. After the install, run the server
```
npm run dev
```

5. Open a new terminal. Navigate back to the project folder then to the frontend folder. Then install node modules
```
cd {path-to-projectfolder}/frontend
npm install
```

6. After the install, run frontend app
```
npm run dev
```

### Option 2
1. Clone repository on terminal:
```
git clone https://github.com/apurugganan/AJ-PURUGGANAN-IS24-full-stack-competition-req97073.git
```

2. Navigate to project folder
```
cd AJ-PURUGGANAN-IS24-full-stack-competition-req97073 
```
3. Have your docker desktop or docker engine running, then run the app on the teminal:
```
docker-compose up --build
```
## Endpoints
### Server API
```
http://localhost:3000/api

// GET products
http://localhost:3000/api/products

// POST product
http://localhost:3000/api/products

// Get product
http://localhost:3000/api/edit/{productId}

// PUT product
http://localhost:3000/api/edit/{productId}

// SWAGGER Documentation
http://localhost:3000/api/api-docs
```
### Frontend App
```
http://localhost:8000/
```

## Features of Application
1. landing page has list of all products within IMB with relevent inofrmation:
- Product Number
- Product Name
- Scrum Master
- Product Owner
- Developer Names (up to 5)
- Start Date
- Methodology (Agile or Waterfall)

2. All columns fit on the page
3. Has title for each column
4. Total number of all products
