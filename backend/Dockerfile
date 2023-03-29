FROM node:lts
WORKDIR /backend
COPY package.json /backend
RUN npm install
COPY . /backend
CMD ["npm", "run", "dev"]