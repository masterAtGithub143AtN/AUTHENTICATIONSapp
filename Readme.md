  # Welcome to Authentication Login Webapp

Hello everyone, In this project, I have create an authentication webapp using React and node js.


## For running smoothing please create .env file in frontend
*********************
REACT_APP_SERVER_DOMAIN='Example-http://localhost:8080 (your server )'
**************

## After that create config.js file in Backend to send the mail and to connect the MongoDB
**************
# config.js file name
export default {
    JWT_SECRET : "secret key",
    EMAIL: "Email of Sender", // testing email & password
    PASSWORD : "password",
    ATLAS_URI: "MongoDB connection string"
}

**************