import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //this is a middleware
import { composeWithDevTools } from "redux-devtools-extension"; //to use redux dev tools
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

/*
The combineReducers helper function 
turns an object whose values are different reducing functions 
into a single reducing function you can pass to createStore.
*/
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

//check if there any cart items in local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
