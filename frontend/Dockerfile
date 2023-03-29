FROM node:18.13.0.
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
COPY . /frontend
EXPOSE 8000
CMD ["npm", "run", "dev"]