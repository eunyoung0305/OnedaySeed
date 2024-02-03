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
                    <div className="category-box">
                        <button type="button" className="category-header">카테고리</button>
                        <br/>
                        <Link to="/lesson/list?q=요리">
                            <button type="button" className="btn btn-success">요리</button>
                        </Link>
                        <Link to="/lesson/list?q=미술">
                            <button type="button" className="btn btn-success">미술</button>
                        </Link>
                        <Link to="/lesson/list?q=음악">
                            <button type="button" className="btn btn-success">음악</button>
                        </Link>
                        <br/>
                        <Link to="/lesson/list?q=베이킹">
                            <button type="button" className="btn btn-success">베이킹</button>
                        </Link>
                        <Link to="/lesson/list?q=운동">
                            <button type="button" className="btn btn-success">운동</button>
                        </Link>
                        <Link to="/lesson/list">
                            <button type="button" className="btn btn-success"><b>전체 보기</b></button>
                        </Link>

                    </div>

                    <div className="mbti-box">
                        <a href="https://eunyoung0305.github.io/hobby_mbti/"><div className="mbti mbti-img"></div></a>
                    </div>
                </div>
            </BasicLaylout>
        </>

    );
}

export default MainPage;