# Northcoders News API

## Hosted version

The API can be accessed using the following link (https://nc-news24-app.herokuapp.com/)

## Background

I built a news API for the purpose of accessing application data programatically. This mimics the building of a real world backend service (such as reddit) which provides this information to the front end architecture.

The database used was PSQL, and [node-postgres] (https://node-postgres.com/) was used to interact with this database.

## Cloning the repository

You will need to fork the repository in github so that you have your own copy to work on.

You will then need to clone the repository, firstly copy the url from your forked repository on github by clicking the green Code button.

Now access your terminal on your computer and cd into the folder where you want the repository to be placed and use the following command : git clone <repository URL from github>

The repository will now be cloned and can be accessed from your computer.

## Installing dependencies and required minimum versions

You will also need to install jest for testing by using the command : npm install jest -D

You will also need to seed the database and therefore use the command : npm run seed

You can run the app and utils tests by using the command : npm test

You will need to create _two_ `.env` files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these `.env` files are .gitignored.

The minimum node version required is 4.17.1
The minimum postgress version required is 8.6.0
