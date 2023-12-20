# Books Application

Simple CRUD application for Managing Books

## Setup

### Requirements

- NodeJS (https://nodejs.org/en/download/) Any version above 18.0.0 should work (18 includes the node:test module)
- MySQL Database (https://dev.mysql.com/downloads/) Any version above 8.0.0 should work
- Create an empty database and remember the name and connection details (you will need to set them up in the .env file later)
- Open the terminal and clone the repository

```bash
cd /path/to/your/projects/folder
git clone git@github.com:Cmacu/books-application.git
cd books-application
```

### Configuration

- Copy the `sample.env` file to `.env` file in the root directory and update the variables as per the instructions
- Optional: Install the prisma VSCode extension to get syntax highlighting for the `schema.prisma` file (https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

### Installation

- Run `npm install` to install all the dependencies
- To run the migrations open your terminal in the project directory and execute:

```bash
npm run migrate # runs the DB migrations with prisma
```

## Running the application

- Start the dev server by open your terminal in the project directory and execute:

```bash
npm run dev # runs the dev server, any changes will trigger restart
```

- you should be able to see the application running on http://localhost:3000 or the port you have set in the .env file

## Testing

> **_NOTE:_** The dev server needs to be running for the tests to pass

- To run the tests open your terminal in the project directory and execute:

```bash
npm run test # runs the tests
```

- Alternatively you can execute the following command to run the tests in watch mode:

```bash
npm run test:dev # runs the tests in watch mode
```

## Deployment

> **_NOTE:_** Depending on the hosting environment it could require some additional configuration

- Build the application by running the following command in the project directory:

```bash
npm run build # builds the application
```

- The above command will create a `dist` folder in the project directory (this folder can be configured in the `tsconfig.json` file)
- Copy the `dist` folder to the hosting environment
