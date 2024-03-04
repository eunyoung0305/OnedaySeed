import { Button, Form } from 'react-bootstrap';
import BasicLayout from '../../layouts/BasicLayout';

import './userProfile.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HostMyPage = ()=>{

    const isHostLoggedIn = useSelector((state) => state.hostLogin.isHostLoggedIn);
    const hostNum = useSelector((state) => state.hostLogin.hostNum);
    const hostName = useSelector((state) => state.hostLogin.hostName);

    const navigate = useNavigate();

    const handleClickHost = () => {

        navigate('/host');
    };


    const handleClickLessons = () => {

        navigate('/lesson/main');
    };
    const handleClickNewLesson = () => {

        navigate('/lesson/new');
    };



    return (

        <>
            <BasicLayout>

                        <h1 id="title">프로필 관리</h1>

                        <Form >
                            <img src="/profile.jpg" width="200px" height="200px" alt="프로필 이미지" />
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className='name'>{hostNum}님, 반가워요!</Form.Label>
                                {/* <Form.Control type="text" name="userId" value={users.userId} disabled /> */}
                            </Form.Group>
                            <Button id="modify" variant="primary" type="submit" onClick={handleClickHost}>
                                프로필 수정
                            </Button>
                            <Button id="modify" variant="primary" type="submit" onClick={handleClickLessons}>
                                클래스 조회
                            </Button>
                            <Button id="modify" variant="primary" type="submit" onClick={handleClickNewLesson}>
                                클래스 등록
                            </Button>
                        </Form>


            </BasicLayout>
        </>

    );
}

export default HostMyPage;