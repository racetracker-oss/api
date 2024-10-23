# RaceTracker API

## Development

Run `npm install` and then the `npm run dev` command to start the database and development server.

If you are developing the front-end application, you must apply migrations first. Start the local compose file with `docker compose -f docker/docker-compose.local.yml up` command, and SSH into the container with `docker exec -it racetracker-api sh` command and run `npx prisma migrate dev` command.

## docker/\*

`docker-compose.dev.yml` - for local API development (only includes a database)

`docker-compose.local.yml` - it uses the latest API version, required for front-end development

`docker-compose.prod.yml` - production

`Dockerfile` - API docker image
