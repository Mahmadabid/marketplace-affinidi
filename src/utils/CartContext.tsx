import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
}

interface CartContextProps {
  cartItems: ItemProps[];
  addToCart: (item: ItemProps, openModal: () => void) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    const storedCartItems: ItemProps[] = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (item: ItemProps, openModal: () => void) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCart);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
    openModal();
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem
    );

    const finalCart = updatedCart.filter((cartItem) => cartItem.quantity > 0)    
    setCartItems(finalCart);
    sessionStorage.setItem('cartItems', JSON.stringify(finalCart));
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
