# Gym Routine Maker Backend

## A Node REST API written in Typescript and using DDD architecture, to be consumed by the Frontend 

This is a personal project that was built as the REST API of a personal page about a "Gym Routine Maker".

* Node with Typescript
* Express
* DDD Architecture
* Docker for the database and the API itself to work on the frontend in a simple way

## How to install this project

1. Install the dependencies
```
    npm install
```

2. Duplite 2 times .env.template and rename them to .env.dev, .env.production and .env.test, and fill them
   
3. Set up the docker container
```
    docker compose up -d
```

4. Fill up the database with seed data
```
    npm run seed
```