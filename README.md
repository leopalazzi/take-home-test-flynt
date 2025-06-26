## Shopping List Helper

Welcome to Shopping List Helper application

You can pilot the project using `make` commands

They are categorized as follow :

## Before all don't forget to:

- Check you have installed `npm` (8.5) `node` (16.14) `docker` (20.10)
- copy `.env.dist` into a `.env` file
- use the command `make vendor` to download all dependencies
- use the command `make up` to start the project

## Docker

- `ps`: Display the status of docker containers, eg: `make ps`
- `up`: Start the docker containers, eg: `make up` (optional svc param)
- `logs` Display logs of containers, eg: `make logs` (optional svc param)
- `stop`: Stop the containers, eg: `make stop` (optional svc param)
- `rm`: Remove the containers, eg: `make rm` (optional svc param)
- `rmup`: Remove then start the SaaS containers, eg: `make rmup`
- `exec`: Open an sh into specified container, eg: `make exec svc=web`
- `restart`: Restarts a specific container, eg: `make restart` (optional svc param)

**Note:** All commands accept, except `ps`, a parameter named `svc=` to specify a target container for the command. You can give one service `svc=web-dev` or several `svc="api-dev web-dev"`
**Note:** all services: `web-dev` / `api-dev` / `db-dev`


## Project

- `config`: Copy '.env.dist' files to '.env' files, eg: `make config`
- `vendor-web`: Install web's vendors, eg: `make vendor-web`
- `vendor-api`: Install api's vendors, eg: `make vendor-api`
- `vendor`: Install all repositories' vendors, eg: `make vendor`
- `migration-run`: Run pending migrations, eg: `make migration-run`
- `migration-revert`: Run pending migrations, eg: `make migration-revert`
- `migration-generate`: Create a new migration, eg: `make migration-generate name="maMigration"`
- `clean-db`: Clean database data; eg: `make clean-db`

## MISC

- `help`: Display commands help

You're good to go 🦄
