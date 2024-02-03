import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import './cartList.css';
import axios from "axios";
import BasicLayout from "../../layouts/BasicLayout"

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart details:', error);
        }
    };
    
      useEffect(() => {
        fetchData();
      }, []);

      const onItemDelete = (deletedItemId) => {
        // 기존의 아이템 리스트에서 삭제된 아이템을 제거하는 로직
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.cartItemId !== deletedItemId)
        );
      };
      // filter 메소드는 JavaScript 배열 메소드 중 하나 /
      // 원본 배열을 변경하지 않고, 주어진 함수의 조건을 만족하는 요소들로 이루어진 새로운 배열을 반환
      
      // (item) => item.cartItemId !== deletedItemId는 콜백 함수 /
      // cartItemId가 deletedItemId와 다른 경우 true를 반환 > 새로운 배열에 포함

    return (
        <div>
            <BasicLayout>
            <h1 id="title">장바구니</h1>
            {/* key에는 고유값 */}
            {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <hr />
                <CartList onItemDelete={onItemDelete} item={item} />
                  <br />
                </React.Fragment>
            ))}
            </BasicLayout>
        </div>
    );
}

export default Cart;