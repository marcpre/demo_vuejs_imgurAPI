const PRICE = 9.99

new Vue({
  el: '#app', // where Vue should be applied
  data: { // all properties here are available in the DOM
    total: 0,
    items: [],
    cart: [],
    search: ''
  },
  methods: {
    onSubmit: function() {
      this.$http
      .get('/search/'.concat('90s'))
      .then(function(res) {
        this.items = res.data
      })
    },
    addItem: function (index) {
      let item = this.items[index];
      let found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;          
          this.cart[i].qty++;
          break
        }
      }
      if (!found) {
        this.cart = this.cart.concat({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      }
      this.total += PRICE;
    },
    inc: function (item) {
      item.qty++
        this.total += PRICE
    },
    dec: function (item) {
      item.qty--
      this.total -= PRICE      
        if (item.qty <= 0) {
          for (let y = 0; y < this.cart.length; y++) {
            if (this.cart[y].id === item.id) {
              this.cart.splice(y, 1)
              break
            }
          }
        }
      this.total -= PRICE
    },
  },
  filters: {
    currency: function (price) {
      return `$`.concat(price.toFixed(2))
    }
  }
})
