# ChattyApp

Welcome to ChattyApp. This project is a web chat Single Page application, based on the likes of Slack, Facebook Messenger and Twitter. It is built with ReactJS, babel and Webpack. Webpack communicates with a server via WebSockets which enables the messages to be displayed in Real-Time. You will notice this app doesn't need to be reloaded in order to see the messages inputs in your chat. Many instances of the app can be loaded in your browser displaying messages synchronised with every page loaded. As such, Chatty will allow users to message each other without the need to register.

## Screenshots



### Instructions

Install all Dependencies and start the App

npm install
npm start

### Setting Up the Server

Access the chatty_server folder, install the dependencies and start the server:
(in ./chatty_server)
npm install
npm start

### Dependencies

* React
* React-dom
* Webpack
* Babel
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Express
* uuidv4
