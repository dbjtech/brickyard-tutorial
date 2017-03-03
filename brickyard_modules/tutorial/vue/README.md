# 目录说明

## 本目录下有5个vue的例子

这些例子来自于[vuex](https://github.com/vuejs/vuex)的example，略作改动
* 每个example目录添加一个package.json，使之成为brickyard插件
* 每个example，删掉index.html。使用brickyard的webpack-index-template插件
* 为每个example编写了plan插件
* 把原有的公共依赖模块logger封装为brickyard插件。

## 要运行代码，执行以下指令即可

#### counter
```
brickyard --debug build tutorial-vue-counter
```
#### counter-hot
```
brickyard --debug build tutorial-vue-counter-hot
```
#### shopping-cart
```
brickyard --debug build tutorial-vue-shopping-cart
```

#### todo
```
brickyard --debug build tutorial-vue-todo
```

#### chat
```
brickyard --debug build tutorial-vue-chat
```

执行后，打开http://localhost:8080即可看到效果
