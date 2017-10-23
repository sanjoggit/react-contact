# Contact App [![npm (scoped)](https://img.shields.io/badge/npm-v.4.1.2-brightgreen.svg)]() [![node (scoped)](https://img.shields.io/badge/node-v.7.6.0-blue.svg)]()
A simple contact managing app where you can add, delete and edit contacts. This project was carried out using Java Script library React.




## Installation
This project was done in windows OS with node version 7.6.0

Here is the process of installation and creating a new app
```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```
Run the newly created app on localhost  http://localhost:3000/ 

## Deployment
This app is deployed on heroku.
Below is the process for deploying react app in heroku.
```
npm install -g create-react-app
create-react-app my-app
cd my-app
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "react-create-app on Heroku"
git push heroku master
heroku open
```

