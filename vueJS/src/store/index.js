import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}



export default new Vuex.Store({
  state: {
    items: [],
    categories: [],
    productIds: [],
    cartItems: [],
    openItem: null,
    token: '',
    userId: '',
    cartId: ''
  },

  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },

    addCartItem(state,item){
      state.cartItems.push(item);
    },

    addCategories(state, cats) {
      state.categories = cats;
    },

    setproductIds(state, ids) {
      state.productIds = ids;
    },

    addIDsToCategories(state, obj) {
      const category = state.categories.filter(cat => cat.id == obj.id)[0];
      category['productIds'] = obj.productIds;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    setUserID(state, id) {
      state.userId = id;
    },

    removeUserID(state) {
      state.userId = '';
    },

    setCartID(state, id) {
      state.cartId = id;
    },

    removeCartID(state) {
      state.cartId = '';
    },

    addComment(state, obj) {
      const poduct = state.items.filter(item => item.id == obj.productId)[0];
      if (poduct) {
        poduct.comments.push(obj.comment);
      }
    },


  getCart(state, id) {
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8500/cart/add/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${state.token}`
      }}).then(obj => obj.json())
          .then(res =>{
            var data = JSON.parse(JSON.stringify(res));
            state.cartId = data.id;
            console.log(data.id);
          });

    })
  },
},
  actions: {

    fetchCategories({ commit ,state}) {
      fetch('http://127.0.0.1:8500/category',{
        method: 'GET',
        headers: { 'Authorization': `Bearer ${state.token}`}}
      )
          .then( obj => obj.json() )
          .then( res => commit('addCategories', res) );
    },

    async fetchIDsByCategories({ commit, state }, catID) {

      const category = state.categories.filter( cat => cat.id === catID )[0];
      if (category && category['productIds']) {
        console.log("---------------------");
        console.log(category['productIds']);
        commit('setproductIds', category['productIds']);
      } else {
        const obj = await fetch(`http://127.0.0.1:8500/product/category/${catID}`,{
          method: 'GET',
          headers: { 'Authorization': `Bearer ${state.token}`}});
        const res = await obj.json();

        var data = JSON.parse(JSON.stringify(res));

        var prodids = [];
        data.forEach(ob => {
          prodids.push(ob.id);
        })

        commit('addIDsToCategories', {
          id: catID,
          productIds: prodids
        });

        commit('setproductIds', prodids);
      }
    },

    search({ commit ,state  }, q) {
      return new Promise( (resolve, reject) => {
        console.log(`http://localhost:8500/product/q=${q}`,{
          method: 'GET',
          headers: { 'Authorization': `Bearer ${state.token}`}});
        fetch(`http://localhost:8500/product/q=${q}`)
          .then( obj => obj.json())
          .then( res => {
            var data = JSON.parse(JSON.stringify(res));
            console.log(data);
            var ids = [];
            data.forEach(product =>{
              ids.push(product.id)
            })
            commit('setproductIds',ids)
            resolve(data.total);
          });
      });
    },



    addToCart({commit,state},id){
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8500/cartitem/add/${state.cartId}/${id}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${state.token}`
          }}).then(obj => obj.json())
            .then(res =>{

            commit("addCartItem",res);
            });

      })
    },


    getItem({ commit, state }, id){
      console.log(this.token);
      return new Promise( (resolve, reject) => {
        const item = state.items.filter( item => item.id == id )[0];
        
        if (item) {
          resolve(item);
        } else {
          fetch(`http://127.0.0.1:8500/product/${id}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${state.token}`}})
            .then( obj => obj.json())
            .then( res => {
              /*
                var data = JSON.parse(JSON.stringify(res));
                var ids = [];
                console.log(data);
                data.forEach( myid => {
                        ids.push(myid.id);
                    })

               */
              console.log(res);
              commit('addItem',res);
              resolve(res);

              fetch(`http://127.0.0.1:8500/rating/${res.id}`, {
                method:'GET',
                mode: 'no-cors',
                headers: { 'Authorization': `Bearer ${state.token}` }
              }).then( resp => resp.json() )
                .then( comments => {
                  res['comments'] = comments;
                  commit('addItem', res);
                  resolve(res);
                });


            });
        }
      });
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          commit('setToken', tkn.token);

          var parsed = parseJwt(tkn.token);
          var data = JSON.parse(JSON.stringify(parsed));
          commit('setUserID', data.userID);
          commit('getCart',data.userID);
        });
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          console.log(tkn.token)
          commit('setToken', tkn.token)

          var parsed = parseJwt(tkn.token);
          var data = JSON.parse(JSON.stringify(parsed));
          commit('setUserID', data.userID);
          commit('getCart',data.userID);
        }
      });
    },

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { artId: comment.artId, comment: comment });
    }
  }
})
