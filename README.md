# Research Square Test Bundle

## Running
Run frontend and backend at once with ``yarn serve`` after installing with ``yarn``

Host: Frontend (http://localhost:3000), Backend (http://localhost:3001)

## Tech Stacks

- React
- TypeScript
- Node.js
- Express
- Chakra UI
- Sqlite

## APIs

### Get articles for all
```
curl 'http://localhost:3001/api/search' \
  --request GET \
  --header 'Content-Type: application/json' \
```
### Get articles for user, admin
```
curl 'http://localhost:3001/api/articles' \
  --request GET \
  --header 'Content-Type: application/json' \
```
### Get article for user
```
curl 'http://localhost:3001/api/articles/1' \
  --request GET \
  --header 'Content-Type: application/json' \
```
### Create article for user
```
curl 'http://localhost:3001/api/articles' \
  --request POST \
  --header 'Content-Type: application/json' \
  --location \
  --data-raw '{
    "title": "Super fun article",
    "authors": "Jane Doe,John Doe",
    "abstract": "Articles are meant to be fun.",
    "article": "Articles are meant to be fun. \n That is why this one is so fun."
  }'
```
### Update article for user
```
curl 'http://localhost:3001/api/articles/1' \
  --request PATCH \
  --header 'Content-Type: application/json' \
  --location \
  --data-raw '{
    "title": "Super fun article",
    "authors": "Jane Doe,John Doe",
    "abstract": "Articles are meant to be fun.",
    "article": "Articles are meant to be fun. \n That is why this one is so fun."
  }'
```
### Delete article for user
```
curl 'http://localhost:3001/api/articles/1' \
  --request DELTE \
  --header 'Content-Type: application/json' \
```
### Agree article for admin
```
curl 'http://localhost:3001/api/agree/1' \
  --request PATCH \
  --header 'Content-Type: application/json' \
  --location \
  --data-raw '{
    "active": true
  }'
```