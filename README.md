# Build a REST API with Node.js, Express & PostgreSQL

This is an example of a REST API using Node.js, Express & PostgreSQL. From my week 4 school of code project. It has a simple 
html static frontend that allows users to signup, login and post on a board.  

## Getting Started

1. You will need a postgres database set up e.g (hosted on heroku, elephantSQL or locally on your computer).

2. create a .env file based on the env.example one
3. nmp i to install dependencies
4. npm run db:createUsersTable
5. npm run db:createPostTable
6. npm run dev start

In the files you will see a REST API server with routes to manage requests and serve responses. The models pattern to allow easy interaction with the database.
The front end which allows you to view, create, edit and delete data

## Dependencies

The following packages have already been added to your package.json file as dependencies/devDependencies:

- [express](https://expressjs.com/)
- [pg](https://node-postgres.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)


The project is already set up to use ECMAScript modules. You'll see the following line in your package.json file:

```json
{
  "type": "module"
}
```

## Features

Password is hashed before being sent to the database via bcrypt. Some Api routes are protected by JWT web tokens and can only be visited by logged in users. The authentication is a bit crudely implemented due to my limited knowledge right now but does function. The email and password are verified on login attempt and a basic error message is shown when incorrectly entered.

## Todo

There are currently a number of unused routes that haven't been implemented in the frontend and were just implemented for the future.

ALOT!!!! I really reached the limit of using a static html page for a frontend. There are things that would be a lot easier using something that allows dynamic manipulation. This will be a future project.

