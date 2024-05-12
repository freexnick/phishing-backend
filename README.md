To run application rename `.env.example` to `.env` and provide necessary variables

For convenience project utilizes `docker-compose` so you can launch all 3 services with a single command, you have to replace `.env` in command with your `.env` file if it's named differently:

-   `docker-compose build && docker-compose --env-file=.env up -d --force-recreate --remove-orphans`

services are named as:

-   `server` - node application, by default on port `5000`
-   `mongo_express` - mongo-express web based UI to interfere with MongoDB by default on port `8888`
-   `mongo_db` - mongodb by default on port `27017`
