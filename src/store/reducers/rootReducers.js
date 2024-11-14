import {combineReducers} from 'redux'
import productReducer from "./products";
import {cartReducer} from "./cart";
import compareListReducer from "./compare";


const rootReducer = combineReducers({
    data: productReducer,
    cartList: cartReducer,
    compareList: compareListReducer
});

export default rootReducer;