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
    yarn install
    ```
4. <div id='configuration'>Configuration</div>

    Create an `.env` file in the project root path and put all the following items and variables in it. You can get help from the `.env.example` file.
   
    Variable | Value
    -|-
    IGNORE_VALIDATION | ignore all validations and keys and requierd variables below (default: false) [More information about lo logger (Lo-Agency)](https://github.com/Lo-Agency/lo-logger)
    SENTRY_DSN | `required` Client-Key Enter your project registered in sentry (lo-logger)
    INSTANCE_NAME | `required` Enter your name (lo-logger)
    NODE_ENV | `required` Enter The type of project execution environment (production or development) (lo-logger)
    LOG_ROTATION_PATH | `required` File path, logs received from the project
    DB_PATH | The path to create the database file (use . for project root path)
    PORT | Listener port for project and program execution (default:3000)
    REDIRECT_PATH | The path to redirect the user to the full link. for example [/rediredt]. by default is root [/]
    SHORT_URL_LENGTH | Random string length made as shortcode of each link. (Min:1 - Max:11~12) The longer the string length, the lower the error coefficient of uniqueness.

5. First Installation

    In the first step after receiving the project, use the `db-setup` flag to   create the required database and tables.
    ```
    yarn start db-setup
    ```
    You can put your desired sql code to build and execute (such as creating    tables) in the `migrations.sql` file in `src/database/` folder. To execute     the sqli commands in the `migrations.sql` file, just insert the `db-setup`  flag after the project execution command.

6. Use Forever

    Use the following command each time you run the project.
    ```
    yarn start
    ```
    Use the following command to run the program in developer mode. Run with nodemon (Automatically refresh the server with any changes to the project).
    ```
    yarn dev
    ```

## Urls Route
|End Point|Method|Action|
|-|-|-|
/api/urls|POST|Using this path, you can register a url to shorten it. Use [POST Request body structure](#post-request-body) in the body of your request to register the url.
/api/urls|GET|Using this path, you can get all the registered urls along with their shortening code. Using the [Query Structure](#query-structure), all data and urls can be received in a filtered way. (Filtering, searching, restricting, ordering and sorting data)
/api/urls/code-or-id|GET|Using this route, you can receive a shortened record or ural, and view items such as registration date or number of visits, etc. Using the ID or shortened code of a database record, you can access the information of url. `/api/urls/15` or `/api/urls/f6opj`

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
### Query Structure
Using the `/api/urls` path you can get all the registered urls. You can use any of the following parameters as desired and receive the data as filtered and personalized. If you leave them blank, they will not be considered. If the value entered by the parameter contradicts the rules of each parameter, you will encounter an error related to that parameter. Control the values!
|Parameters | Value|
|- | -|
| filter | This parameter can only be the value of `most-sites`. Using the value of `most-sites`, you can get links that have been shortened several times based on their number. |
| search | Using this parameter, you can search for full registered links. The data whose full link matches your searched string is returned |
| order | Sort results by one of 3 values `views`, `created_at`, `full` [default=id] |
| sort | Get results using 2 values `asc`, `desc` based on ascending or descending |
| limit | You can limit your results to a specified numeric value. For example, get only 10 of the total data. |
| part | If you use the limit parameter, you can use this parameter to move between your limited results and get the next sections or part of data. For example, if you have limited all data to 10, you can get the next 10 data using part 1. `The parts start from 0`. Part 0 is equal to the first limited number of data. |

#### Example
```url
http://localhost:3000/api/urls?filter=views&search=google.com&order=full&sort=desc&limit=20&part=0
http://localhost:3000/api/urls?search=github&order=views&sort=desc
```
The route for receiving all the data always returns a result with the following structure
```js
{
  "urls": [],     // All filtered urls data
  "total": 0,     // Total number of data found
  "limit": null,  // Limited number of total data
  "parts": 0      // Maximum number of parts that can be used for pagination. This number starts from 1, unlike the limit. To access the last page or part, you must place the part in a query equal to parts-1. The partition parameter in query starts from 0.
}
```
## Redirect Route
To be redirected to a registered url, just place the shortened code of that link after the end point of the root. Get the shortened link after registering the url.
Each time a redirect is made, it is added to the number of views of the shortened link.
#### Example
```json
http://localhost:3000/lh7h6
```
You can use the [.env config](#configuration) file to change the route and end point of the redirect.
```json
http://localhost:3000/me/redirect/lh7h6
```
