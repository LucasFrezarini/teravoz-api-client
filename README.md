# Teravoz API Client

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Teravoz Client created using [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/), [GraphQL](https://graphql.org/) and [Typescript](https://www.typescriptlang.org/).

# Instalation

The easiest way to build this project is using [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).The Docker environment provides a reverse proxy using a [NGINX](https://www.nginx.com/) container. This container allows you to make https requests on the local environment. By default, the proxy will run on port 3000. If you ever need to connect directly to the node container or, for some reason, you don't want to use https, you can access the server from port 3080.

If you are on a environment that supports Bash, you can simply install the dependencies and run the project using the `run.sh` provided on the root of the project. This shell script uses Docker and Docker Compose commands to provide the project's full ecosystem.

```bash
./run.sh install
./run.sh dev

# OR

sh run.sh install
sh run.sh dev
```

> Maybe you'll have to give the execution permission from the sh, with the command `chmod +x run.sh`

The `run.sh` script also gives to you an shortcut to execute commands inside the node container. For example, to install a new package on the project, you can simply run:

```bash
./run.sh npm install --save <package name>
```

If you environment doesn't support bash, you should run the docker commands manually:

```bash
# Installing dependencies
docker run --rm -v $(pwd):/app -w /app -it node:10.15.3-alpine npm install

# Building and running the development containers
docker-compose up -d --build

```

# Project Structure

The project make use of GraphQL, to expose the data via Query and Subscriptions. Because Teravoz webhook send the data using a RESTful design, there is a default POST HTTP endpoint configurated to receive the data on the `/api/call/webhook`. You can simulate the webhook requests importing the [Postman](https://www.getpostman.com/) collection on the root of the project or testing with another method. There's a example of the body that is sended for the webhook:

```json
{
  "type": "call.new",
  "call_id": "1236545732.95403",
  "code": "1",
  "direction": "inbound",
  "our_number": "0800000000",
  "their_number": "11951753654",
  "their_number_type": "mobile",
  "timestamp": "2019-04-10T01:16:00Z"
}
```

The lifecycle of a call is defined by her type, in the following order: `call.new`, `call.standby`, `call.waiting`, `actor.entered`, `call.ongoing`, `actor.left`, `call.finished`.

When a call enters on the state of `standby`, a new enter for the delegate logs is created with the POST body that should be sended from the `/delegate` endpoint on the Teravoz API. If the call is from a new contact, it creates the object with the destination `900`, and `901` if the contact already exists. How this is a simply mock of the requisition, no event is fired to a external endpoint at all.

You can test the GraphQL queries and subscription on the GraphQL Playground, that can be accessed on the `/playground`.

Here's a example of a query that can be executed on the GraphQL Playground. It simply brings the ocurring calls, the delegated calls log and the contacts list from the backend:

```graphql
query {
  calls {
    type
    call_id
    code
    direction
    our_number
    their_number
    their_number_type
    timestamp
  }
  delegates {
    type
    call_id
    destination
  }
  contacts
}
```

> You can view the full docs with all the avaliable Queries, Mutations and Subscriptions on the "Docs" tab in the GraphQL Playground

# Code Structure and Formatting

The project make use of Prettier and [ESLint](https://eslint.org/), along with [Typescript](https://www.typescriptlang.org/), to format the application code. This is enforced by the use of [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged), that fix the code formatting and errors from ESLint that can be automatically resolved on the moment of code commit. In the case of a error that cannot be fixed by the linters, the developer will be prevented from making the commit and should fix the problems manually.
