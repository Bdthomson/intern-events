# IBM Intern Events

## Local Development Instructions

Set Environment Variables

Backend
```shell
INTERN_EVENTS_DB_USER
INTERN_EVENTS_DB_PASS
INTERN_EVENTS_DB_HOST
INTERN_EVENTS_DB_PORT
INTERN_EVENTS_DB_NAME
```

Backend API Server

`cd Backend && mvn clean package && java -jar ./target/app.jar`

Frontend App

Set the `REACT_APP_INTERN_EVENTS_LOCAL_API` variable in the Frontend Projects `.env` file.
`cd Frontend && npm run dev` , which starts `webpack-dev-server`.

## Deploy Instructions

### Backend API Server

```shell
# Set the Backend App Target in Heroku
cd Backend/
heroku login
heroku create api-ibm-intern-events
cd Backend && git init
heroku git:remote -a api-ibm-intern-events

# Set environment variables for Mongo DB.
heroku config:set INTERN_EVENTS_DB_USER=
heroku config:set INTERN_EVENTS_DB_PASS=
heroku config:set INTERN_EVENTS_DB_HOST=
heroku config:set INTERN_EVENTS_DB_PORT=
heroku config:set INTERN_EVENTS_DB_NAME=

# Deploy the App
git add . && git commit -m "Build"
git push heroku master
```

### Frontend App

The frontend code needs to know the address of the API server, you must set it in heroku.
For example, `heroku config:set REACT_APP_INTERN_EVENTS_API=https://api-ibm-intern-events.herokuapp.com`

Note: This project is build with Facebook's 
[`create-react-app`](https://github.com/facebookincubator/create-react-app) 
repo, meaning that any environment variables you wish to set must be prefaced with REACT\_APP\_, and accessed
as such.

```shell
# Login and create the heroku app
cd Frontend
heroku login
heroku create app-ibm-intern-events

# Set environment variables
mkdir build && cd build/
git init && heroku git:remote -a app-ibm-intern-events
heroku config:set REACT_APP_INTERN_EVENTS_API=https://api-ibm-intern-events.herokuapp.com

# Deploy
npm run deploy
```

The deploy script first runs the build command which compiles the project into a static bundle of javascript that can be run anywhere. Because I am using `react-router`'s `BrowserRouter` for route navigation you must have an Express server that takes all url patterns and maps them to the single `index.html` file in the build directory.

_This is a limitation with the current state of React's client-side routing capabilities._
