import React, {Component, useEffect, useState} from "react";
import './order.css'
import BasicLaylout from "../../layouts/BasicLayout";
import axios from "axios";

function OrderPage() {

    const [orderItems, setOrderItems] = useState([]);

    // 조회
    useEffect(() => {
        const fetchOrderList = async () => {
          try {
            const response = await axios.get('/api/orders');
            setOrderItems(response.data);
          } catch (error) {
            console.error('Error fetching order list:', error);
          }
        };

        fetchOrderList();
      }, []);

    // 구매 취소
    const cancelHandler = async (orderId, lessonName) => {
        if(window.confirm(`'${lessonName}' 수업을 취소하시겠습니까?`)) {
            try{await axios.post(`/api/orders/${orderId}`);
            alert("수업이 취소되었습니다.");
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
              } else {
                console.error("Error during the request");
              }
              alert("취소 중 오류가 발생했습니다.");
            }
        } else {
            window.location.reload();
        }
    };


    // 구매 취소
    // const cancelHandler= async (orderId)=>{
    //     try{
    //         await axios.delete(`/api/order/${orderId}`,{status:"구매 취소"});
    //         setCancelledOrders(new Set([...cancelledOrders, orderId]));
    //     }catch (error) {
    //         console.error('Error canceling order:', error);
    //     }
    // }


        return (
            <div>
                <BasicLaylout>
                <div className="purchaseBox">
                    <h1 id="title"><b>구매내역</b></h1>
                    
                    {orderItems.map((orders) => (
                        <div key={orders.orderId} className="orderItem">
                        <div className="class-img class-info"></div>
                        <h3 className="class-name">{orders.lessonName}</h3>
                        <span className="class-date">{orders.lessonSchedule}</span>
                        <span className="class-count">결제 금액: {orders.orderPrice}</span>
                        <span className="class-count">구매 수량: {orders.count}</span>
                        <button className="class-status" onClick={() => cancelHandler(orders.orderId, orders.lessonName)}>
                            {orders.orderStatus === 'ORDER' ? '구매 취소 하기' : '구매 취소 완료'}</button>
                        </div>
                    ))}
                </div>
                </BasicLaylout>
            </div>
        )

}
export default OrderPage;