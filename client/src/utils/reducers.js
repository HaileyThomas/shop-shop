import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of the UPDATE_PRODUCTS return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // if action type value is the value of UPDATE_CATEGORIES, return a new state object with an updated array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    // same as above for UPDATE_CURRENT_CATEGORY
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // ADD_TO_CART
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    // ADD_MULTIPLE_TO_CART
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // REMOVE_FROM_CART
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    // UPDATE_CART_QUANTITY
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // CLEAR_CART
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    // TOGGLE_CART
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    // if its none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
