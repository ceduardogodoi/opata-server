# Opata Server (backend)

Backend project of the Opata Project.

## Pre-requisites/Dependencies

1. [Install asdf runtime version manager](https://asdf-vm.com/guide/getting-started.html).
2. [Add asdf Node.js plugin to asdf](https://asdf-vm.com/guide/getting-started.html#_4-install-a-plugin).
3. [Install Node.js 20.18.0 using asdf runtime version manager](https://asdf-vm.com/guide/getting-started.html#_5-install-a-version): ```asdf install nodejs 20.18.0```.
4. Make sure if have `Node.js` correctly installed running ```node -v``` in your terminal.
5. [Install docker desktop](https://www.docker.com/products/docker-desktop/).
6. Clone the project from its [GitHub repository](https://github.com/ceduardogodoi/opata-server).

## Setting Up

1. Start **docker desktop** application and make sure it's in the running state in your system bar/tray - We are using **docker** for our local **PostgreSQL** instance.
2. Make a copy of `.env.example` renaming that to `.env` in this same directory.
3. Ask for <carloseduardoalvesgodoi@hotmail.com> for the environment variables.
4. Fill out the `.env` variables accordingly.
5. Run ```npm i``` to install all the project's dependencies.
6. Run ```docker compose up -d``` to spin up **docker compose** with the database container.

## Running the application for development

1. Run ```npx prisma migrate dev``` to create the database structure.
2. Run ```npm run dev``` to run it in development mode.

If everything went well, you should see the following in your terminal:

```bash
      - Server running on port 3333.
      - CTRL + C to stop it.
```
