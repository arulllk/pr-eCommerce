import React, { useEffect, useState } from "react";


export const ShopContext = React.createContext();

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
 

const ShopContextProvider = ({children}) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    const [all_product,setAllProducts] = useState([])        
    
    useEffect(()=> {        
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)})
    },[])

    const addToCart= (itemId) => {    
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));                                
    }
     


    const removeFromCart= (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        console.log({cartItems});
        let totalAmount  = 0;
        for (const item in cartItems) {
             if (cartItems[item]>0) {
                let itemInfo = all_product.find((product)=>product.id === Number(item));
                totalAmount += itemInfo.new_price*cartItems[item]
             }
             console.log({totalAmount});
             return totalAmount;
        }
    }


    const getTotalCartItems  = () => {
        let totalItem = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart}

    return(
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;