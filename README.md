# sitemate-quiz

REST API Server is built using NodeJS, Express. 
REST API Client is built using NodeJS. 

A simple datastore has been added as the issues.js file. This is an array which can be modified at runtime. Data does not persist sessions.
The client is able to CREATE and UPDATE data that is entered via the CLI.
The client is able to read issues which are unique to the ID provided. One can retrieve issues which they have just created.
REST API Server is wrapped in Docker Container

{"id": 10, "title": "data leak", "description": "data leak in backend"}