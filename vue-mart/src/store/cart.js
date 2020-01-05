export default {
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        addCart(state, item) {
            const goods = state.cart.find(v => v.title == item.title);
            if (goods) {
                goods.cartCount += 1;
            } else {
                state.cart.push({
                    ...item,
                    cartCount: 1
                });
            }
        },
        cartremove(state, index) {
            if (state.cart[index.cartCount] > 1) {
                state.cart[index.cartCount] -= 1;
            }
        },
        cartadd(state, index) {
            state.cart[index].cartCount += 1;
        }
    },
    getters: {
        cartTotal: state => {
            let num = 0;
            state.cart.forEach(v => {
                num += v.cartCount;
            });
            return num;
        },
        total: state => {
            return state.cart.reduce(
                (total, item) => total + item.cartCount * item.price,
                0
            );
        }
    }
}