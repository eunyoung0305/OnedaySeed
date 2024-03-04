import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import "bootstrap-icons/font/bootstrap-icons.css";
import './cartList.css';

import axios from "axios";

// Cart에서 넘긴 item
function CartList({ item, onItemDelete }) {

    // 가격
    const totalPrice = item.count * item.price;

    // 인원 변동
    const [personCount, setPersonCount] = useState(item.count);

    const handleIncrease = () => {
        setPersonCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (personCount > 1) {
        setPersonCount(prevCount => prevCount - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        try {
            const response = await axios.post('/api/cart', {
                cartItemId: item.cartItemId,
                lessonName: item.lessonName,
                lessonSchedule: item.lessonSchedule,
                count: personCount,
                price: item.price,
          });
    
            if (response.data.alertMessage) {
              // 에러 또는 성공 메시지가 있으면 alert 창 띄우기
              alert(response.data.alertMessage);
            }
        
            if (response.data.successMessage) {
              console.log('Form submitted successfully:', response.data.successMessage);
              window.location.reload();
            }
          } catch (error) {
              if (error.response) {
                // 서버 응답이 에러인 경우
                console.error('Error submitting form:', error.response.data);
                // 클라이언트에서 에러 메시지 처리 로직 추가
              } else if (error.request) {
                // 요청이 전혀 이루어지지 않은 경우
                console.error('Request error:', error.request);
              } else {
                // 기타 에러
                console.error('Unexpected error:', error.message);
              }
          }
      };

      // 삭제
      const handleDelete = async () => {
        try {
          // 서버에 삭제 요청 전송
          await axios.delete(`/api/cart/${item.cartItemId}`);
          // 삭제된 아이템을 부모 컴포넌트에서 처리
          onItemDelete(item.cartItemId);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };

      // 결제
      const handleOrder = async () => {
        if (window.confirm(`결제하려는 수업과 인원이 '${item.lessonName} ${item.count}명' 맞습니까?`)) {
          try {
            await axios.post(`/api/cart/order/${item.cartItemId}`);
            alert("결제되었습니다.");
            window.location.reload();
          } catch (error) {
            if (error.response) {
              console.error(error.response.data);
            } else {
              console.error("Error during the request");
            }
            alert("결제 중 오류가 발생했습니다.");
          }
        } else {
          window.location.reload();
        }
      };

    return (
        <div className='all'>
            <div className='thumb'>
                <img src="/thumb.jpg" width='300px' height='278px' />
            </div>
            <Form onSubmit={handleSubmit}>
                <CloseButton className='closeButton' onClick={handleDelete}/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupName">
                    <Form.Label column sm="3">클래스</Form.Label>
                    <Col sm="9"><Form.Control plaintext readOnly value={item.lessonName}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formGroupDate">
                    <Form.Label column sm="3">날짜</Form.Label>
                    <Col sm="9"><Form.Control plaintext readOnly value={item.lessonSchedule}/></Col>
                </Form.Group>
                <div className='caret'>
                    <i className="bi bi-caret-down-fill" onClick={handleDecrease} />
                    <i className="bi bi-caret-up-fill" onClick={handleIncrease} />
                </div>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPerson">
                    <Form.Label column sm="3">인원</Form.Label>
                    <Col sm="9"><Form.Control value={personCount}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPrice">
                    <Form.Label column sm="3">가격</Form.Label>
                    <Col sm="9"><Form.Control plaintext readOnly value={totalPrice}/></Col>
                </Form.Group>
                <Button id="modify" variant="primary" type="submit">수정</Button>
                <Button id="order" variant="success" onClick={handleOrder}>결제</Button>
            </Form>
        </div>
    );
}

export default CartList;