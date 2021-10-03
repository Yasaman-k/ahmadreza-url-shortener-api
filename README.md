# Bit Path :scissors: URL Shortener API 

### Table of contents
- [Shorten the links](#shorten-the-links)
- [Urls Route](#urls-route)

## Shorten the links!
1. Make sure the following is installed on your operating system
   * NodeJS
   * Git

2. Clone the project
```
git clone https://github.com/Lo-Agency/ahmadreza-url-shortener-api.git
```

3. Install Packages
```
npm install
```

5. First Installation
```
npm start db-setup
node . db-setup
```

6. Use Forever
```
npm start
npm run dev
```

## Urls route
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
