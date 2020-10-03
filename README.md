# floodlight

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## Environment
No Dockers or Vagrants - use local machine resources. 
The following should go into a `.env.local` file at the project root:
```
NODE_ENV=development
VUE_APP_API_URL=http://localhost:3000/
VUE_APP_AUTH0_DOMAIN=dev-floodlight.auth0.com
VUE_APP_AUTH0_CLIENT_ID=123456
```