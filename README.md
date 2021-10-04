# Bit Path :scissors: URL Shortener API 

### Table of contents
- [Shorten the links](#shorten-the-links)
- [Urls Route](#urls-route)
- [Redirect Route](#redirect-route)

## Shorten the links!
1. Make sure the following is installed on your operating system
   * [NodeJS](https://nodejs.org/) | [Installation on WSL](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
   * [Git](https://git-scm.com/)

2. Clone the project
```
git clone https://github.com/Lo-Agency/ahmadreza-url-shortener-api.git
```

3. Install Dependencies & Packages
```
npm install
```
4. Configuration
Create an `.env` file in the project root path and put all the following items and variables in it. You can get help from the `.env.example` file.
```
SENTRY_DSN = Client-Key Enter your project registered in sentry
INSTANCE_NAME = Enter your name
NODE_ENV = Enter The type of project execution environment (production or development)
LOG_ROTATION_PATH = File path, logs received from the project
DB_PATH = The path to create the database file (use . for project root path)
PORT = Listener port for project and program execution (default:3000)
```

5. First Installation

In the first step after receiving the project, use the `db-setup` flag to create the required database and tables.
```
npm start db-setup
```
You can put your desired sql code to build and execute (such as creating tables) in the `migrations.sql` file in `src/database/` folder. To execute the sqli commands in the `migrations.sql` file, just insert the `db-setup` flag after the project execution command.

6. Use Forever

Use the following command each time you run the project.
```
npm start
```
Use the following command to run the program in developer mode
```
npm run dev
```

## Urls Route
|End Point|Method|Action|
|-|-|-|
/api/urls|POST| [POST Request body structure](#post-request-body)
/api/urls|GET|get all data.

## POST Request Body
All items available to post a url using this api.
- **url**

#### Example
```
{
    "url": "github.com"
}
```
## Redirect Route
redirect
