# Bit Path :scissors: URL Shortener API 

### Table of contents
- [Shorten the links](#shorten-the-links)
- [Urls Route](#urls-route)
- [Redirect Route](#redirect-route)

## Shorten the links!
1. Requirements

    Make sure the following is installed on your operating system
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
4. <div id='configuration'>Configuration</div>

    Create an `.env` file in the project root path and put all the following items and variables in it. You can get help from the `.env.example` file.
   
    Variable | Value
    -|-
    SENTRY_DSN | `required` Client-Key Enter your project registered in sentry
    INSTANCE_NAME | `required` Enter your name
    NODE_ENV | `required` Enter The type of project execution environment (production or development)
    LOG_ROTATION_PATH | `required` File path, logs received from the project
    DB_PATH | The path to create the database file (use . for project root path)
    PORT | Listener port for project and program execution (default:3000)
    REDIRECT_PATH | The path to redirect the user to the full link. for example [/rediredt] (Do not finish the slash). by default is root [/]
    SHORT_URL_LENGTH | Random string length made as shortcode of each link. (Min:1 - Max:11~12) The longer the string length, the lower the error coefficient of uniqueness.

5. First Installation

    In the first step after receiving the project, use the `db-setup` flag to   create the required database and tables.
    ```
    npm start db-setup
    ```
    You can put your desired sql code to build and execute (such as creating    tables) in the `migrations.sql` file in `src/database/` folder. To execute     the sqli commands in the `migrations.sql` file, just insert the `db-setup`  flag after the project execution command.

6. Use Forever

    Use the following command each time you run the project.
    ```
    npm start
    ```
    Use the following command to run the program in developer mode. Run with nodemon (Automatically refresh the server with any changes to the project).
    ```
    npm run dev
    ```

## Urls Route
|End Point|Method|Action|
|-|-|-|
/api/urls|POST|Using this path, you can register a url to shorten it. Use [POST Request body structure](#post-request-body) in the body of your request to register the url.
/api/urls|GET|Using this path, you can get all the registered urls along with their shortening code.

### POST Request Body
All items available to post a url using this api.
- **url** : Enter a valid url. `bitpath.com - https://bitpath.com/redirect - info@bitpath.com ...`

#### Example
```json
{
    "url": "github.com"
}
```
After registering the url to shorten it, you will receive the registration result as follows:
#### Example
```json
{
  "id": 2,
  "full": "github.com",
  "short": "lh7h6",
  "views": 0,
  "created_at": "2021-10-05 20:19:56"
}
```
## Redirect Route
To be redirected to a registered url, just place the shortened code of that link after the end point of the root. Get the shortened link after registering the url.
Each time a redirect is made, it is added to the number of views of the shortened link.
#### Example
```json
/lh7h6
```
You can use the [.env config](#configuration) file to change the route and end point of the redirect.
