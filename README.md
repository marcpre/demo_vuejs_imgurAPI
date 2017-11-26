# learning_vuejs

## Install

### Basic
See this repo


### Advanced version
install vue-cli
```
# install vue-cli
$ npm install --global vue-cli
# create a new project using the "webpack" template
$ vue init webpack my-project
# install dependencies and go!
$ cd my-project
$ npm install
```
Run Project with:
```$ npm run dev```

## Start Out

Add the following to your `index.html`:

```
    <script src="/vue/dist/vue.js"></script>
    <script type="text/javascript" src="/script.js"></script>
``` 

## Show elements

Syntax: `{{item.title}}`

## Directives

[Vue Directives](https://012.vuejs.org/guide/directives.html)

## Resources

The plugin for Vue.js provides services for making web requests and handle responses using a XMLHttpRequest or JSONP.
Use in html `    <script src="/vue-resource/dist/vue-resource.js"></script>  `

Use in code:

```
 this.$http.get('/someUrl').then(response => {

    // get body data
    this.someData = response.body;

  }, response => {
    // error callback
  });
```

[Documentation](https://github.com/pagekit/vue-resource)

## v-bind

`v-bind:src` binds a javascript property to the src
