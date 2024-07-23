# NodeJs REST API Structure

This repository is used for the REST APIs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [NodeJs](https://nodejs.org/en/download/package-manager/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the git repository

```
git clone <URL>
```

Install all dependency packages

```
npm install
```

Create a .env file in the root directory as described on `.env.template` file

**NPM scripts and their usage**

To clear the build directory run

```
npm run clean
```

To copy assets to the build directory run

```
npm run copy-assets
```

To list down all listing error and fix auto fixable linting error run

```
npm run lint
```

To compile all the node project

```
npm run tsc
```

For creating a build run

```
npm run build
```

To start the NodeJs server with new build and without watch run

```
npm run dev:start
```

To start the NodeJs server with new build and watch run

```
npm run dev
```

To start the NodeJs server with the existing build and without a watch

```
npm run start
```

To attach debugger with nodemon use (See the `.vscode/launch.json` for debugger options)

```
npm run dev:debug
```
To create documentation run 

```
npm run doc
```

After a creating the .env file and executing a start script a nodejs server will be running on your defined port

**Swagger Documentation**
After starting the nodejs server the swagger documentation will be accessable via `http://localhost:<YOUR_DEFINED_PORT>/api-docs`

### Run Unit Test Cases

N/A

## Deployment

N/A
