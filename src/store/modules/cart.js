const state = {
  items: [],
};

const getters = {
  cartTotalPrice: state => {
    return state.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },
};

const mutations = {
  pushProductToCart(state, { id, name, ingredients, price }) {
    state.items.push({
      id,
      name,
      ingredients,
      price,
      quantity: 1,
    });
  },

  setItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity = quantity;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
