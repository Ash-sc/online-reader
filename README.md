# 在线小说阅读
在线小说阅读器，前端使用React框架，后端使用Node.js(爬取http://www.snwx8.com/ 的小说内容)。    
示例地址：http://ashshen.cc/online-reader/
    
### 运行方式:
    
````
    $ npm installl
    $ npm run build
    $ node ./app.js
````
浏览器输入：http://localhost:4396 查看
    
### 本地调试：
    
````
    $ npm install
    $ node ./webpack-dev-server.js
    $ node ./app.js
````
修改代码后自动编译
    
浏览器输入：http://localhost:8999 查看
    
### 运行效果：
    
[https://web-site-files.ashshen.cc/gitHub/online-reader-preview.gif](https://web-site-files.ashshen.cc/gitHub/online-reader-preview.gif)
    
### electron：
    
electron可以将web网页打包成可在PC端运行的软件，[关于electron。](https://electron.atom.io/)
    
在本地运行electron，你需要修改`./src/js/utils/api/api.js`中`API_ROOT`的值为`http://localhost:4396`。然后：
````
    $ npm install
    $ node ./app.js
    $ npm start
````
即可。
    
    
