
FROM node
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
COPY . /frontend
EXPOSE 8000
CMD ["npm", "run", "dev"]