# brickyard tutorial [![Build Status](https://travis-ci.org/dbjtech/brickyard-tutorial.svg?branch=master)](https://travis-ci.org/dbjtech/brickyard-tutorial)


This repo has several tutorial apps of brickyard.

Using [brickyard-cli](https://github.com/dbjtech/brickyard-cli) to build these software applications.

# Prepare

Install brickyard-cli
  ```bash
  npm i -g brickyard-cli
  ```

# Tutorial for Angular 2

  Angular2 tutorial is a copy of offical Heroes tutorial.
  It uses webpack-dev-server. And There is no other web container. 
  So we can use the brickyard watch mode to run the code.

  ```bash
  brickyard build tutorial-angular2-plan --dir build-angular2 --watch
  ```

  Then visit http://localhost:8080/

# Tutorial for React

  React tutorial is an app based on the [offical tutorial](https://facebook.github.io/react/docs/tutorial.html)([repo](https://github.com/reactjs/react-tutorial)).
  It has an api server. So we can use the brickyard build and run cmd.

  ```bash
  brickyard build tutorial-react-plan --dir build-react --run
  ```

  Then visit http://localhost:8080/

# Tutorial for React Native

  The React Native tutorial is an app based on this [tutorial](http://reactnative.cn/docs/0.42/sample-application-movies.html).
  It uses react-native-web to simulate the native env so that the code can run in browser.

  ```bash
  brickyard build tutorial-react-native-plan --dir build-react-native --watch
  ```

  Then visit http://localhost:8080/

  To run in mobile, we need to [setup the react-native environment](https://facebook.github.io/react-native/docs/getting-started.html) and do some manual copy job.

# Tutorial for vue

  This repo has several vue tutorials which is based on [vuex](https://github.com/vuejs/vuex).
  They use webpack-dev-server. And There is no other web container. 
  So we can use the brickyard watch mode to run the code.

  Use http://localhost:8080/ to visit what we built.

#### tutorial-vue-counter
  ```bash
  brickyard build tutorial-vue-counter --dir build-vue-counter --watch
  ```

#### tutorial-vue-counter-hot
  ```bash
  brickyard build tutorial-vue-counter-hot --dir build-vue-counter-hot --watch
  ```

#### tutorial-vue-shopping-cart
  ```bash
  brickyard build tutorial-vue-shopping-cart --dir build-vue-shopping-cart --watch
  ```

#### tutorial-vue-todo
  ```bash
  brickyard build tutorial-vue-todo --dir build-vue-todo --watch
  ```

#### tutorial-vue-chat
  ```bash
  brickyard build tutorial-vue-chat --dir build-vue-chat --watch
  ```
