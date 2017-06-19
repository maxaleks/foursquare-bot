## Foursquare bot project

### Development env

#### Setup node js dependencies.

Integrations setup

    $ npm install

Setup application config. You can run the command below for development env:

    $ cp ./src/config.json.example ./src/config.json
    $ cp ./config/config.js ./config/config.js.example

#### Setup Database

Install postgresql. You can install it with our system package manager. OSX example with brew

    $ brew install postgresql

Create database in postgresql.

    $ psql -U postgres -h localhost -c 'CREATE DATABASE foursquare_bot_development'

Run migrations.

    $ ./node_modules/.bin/sequelize db:migrate
