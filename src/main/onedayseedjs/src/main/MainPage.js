import BasicLaylout from "../layouts/BasicLayout";
import { Link } from 'react-router-dom';
import '../main/video/cupcakes.mp4';
import './Main.css'

const MainPage = ()=>{
    return (

        <>
            <BasicLaylout>
                <div className="video-box">
                    <video muted autoPlay loop>
                        <source src={require('../main/video/cupcakes.mp4')} type="video/mp4"/>
                    </video>
                    <div className='logo'>

                        <h1 className="logo-title">OnedaySeed,<br/>일상에 '즐거움'의 <br/>씨앗을 심다</h1>
                    </div >
                </div>
                <div className="body-box">
                    <div className="body-wrap">
                    <div className="category-box">
                        <div className="wrap">
                        <button type="button" className="category-header">카테고리</button>
                        <br/>
                        <form className="category-btn">
                        <Link to="/lesson/list?q=요리">
                            <button type="button" className="btn btn-success " id="btn1">요리</button>
                        </Link>
                        <Link to="/lesson/list?q=미술">
                            <button type="button" className="btn btn-success " id="btn2">미술</button>
                        </Link>
                        <Link to="/lesson/list?q=음악">
                            <button type="button" className="btn btn-success " id="btn3">음악</button>
                        </Link>
                     
                        <br/>
                        <Link to="/lesson/list?q=베이킹">
                            <button type="button" className="btn btn-success" id="btn4">베이킹</button>
                        </Link>
                        <Link to="/lesson/list?q=운동">
                            <button type="button" className="btn btn-success " id="btn5">운동</button>
                        </Link>
                        <Link to="/lesson/list">
                            <button type="button" className="btn btn-success " id="btn6"><b>전체 보기</b></button>
                        </Link>
                        </form>
                        </div>
                    </div>

                    <div className="mbti-box">
                        <a href="https://eunyoung0305.github.io/hobby_mbti/"><div className="mbti mbti-img"></div></a>
                    </div>
                    </div>
                </div>
            </BasicLaylout>
        </>

    );
}

export default MainPage;
