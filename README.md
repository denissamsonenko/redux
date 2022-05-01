## Simple todo app using create-react-app without any styles

### Simple run 
npm start

### Run with docker in two steps:

#### Build image
* docker build -t redux:latest .

#### Run image
* docker run --rm --name react-redux -d -p 3000:3000 redux:latest

#### To delete image
* docker stop react-redux
* docker rmi redux


