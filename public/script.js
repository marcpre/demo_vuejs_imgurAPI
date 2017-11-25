new Vue({
  el: '#app', // where Vue should be applied
  data: { //all properties here are available in the DOM
    total: 3,
    items: [{
        title: 'Item 1'
      },
      {
        title: 'Item 2'
      },
      {
        title: 'Item 3'
      }
    ]
  },
  methods: {
    addItem: function (index) {
      this.total += 10
    }
  }
})
