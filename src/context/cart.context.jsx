import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find( cartItem => cartItem.id === productToAdd.id )

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map(
      cartItem => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  }

  // return new array with modified cartItems / new cart item
  return [...cartItems, {...productToAdd, quantity: 1}]

}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item to remove
  const existingCartItem = cartItems.find( 
    cartItem => cartItem.id === cartItemToRemove.id
  )
  
  // check if quantity is equal to 1, remove
if (existingCartItem.quantity === 1) {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
} 

  // return retained cartItems
  return cartItems.map(
    cartItem => cartItem.id === cartItemToRemove.id 
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
   // return retained cartItems
  return cartItems.filter( cartItem => cartItem.id !== cartItemToClear.id );
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => 
      total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  }

  const value = {
                  isCartOpen, 
                  setIsCartOpen, 
                  addItemToCart, 
                  cartItems, 
                  cartCount, 
                  removeItemFromCart, 
                  clearItemFromCart,
                  cartTotal
                };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

