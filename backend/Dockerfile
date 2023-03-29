FROM node:18.13.0.
WORKDIR /backend
COPY package.json /backend
RUN npm install
COPY . /backend
CMD ["npm", "run", "dev"]