import {Link, useNavigate} from "react-router-dom";
import "./BasicLayout.css"

import {useDispatch, useSelector} from "react-redux";
import {logout} from "../slices/loginSlice";
import { hostLogout }from "../slices/hostLoginSlice";
import {useState} from "react";

const BasicLayout = ({children}) => {

        const navigate = useNavigate();
        const dispatch = useDispatch()

        const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
        const userId = useSelector((state) => state.login.userId);
        const userName = useSelector((state) => state.login.userName);
        // const userName22 = localStorage.getItem("userName");

        const isHostLoggedIn = useSelector((state) => state.hostLogin.isHostLoggedIn);
        const hostNum = useSelector((state) => state.hostLogin.hostNum);
        const hostName = useSelector((state) => state.hostLogin.hostName);

        const [searchValue, setSearchValue] = useState("");

        const handleClickLogout =()=>{
             localStorage.removeItem("isLoggedIn");
             dispatch(logout());
             navigate("/");
         }

    const handleClickHostLogout =()=>{
        localStorage.removeItem("isHostLoggedIn");
        dispatch(hostLogout());
        navigate("/");
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        navigate(`/lesson/list?q=${searchValue.trim()}`);
    };

    return(
    <>
    
    <header>
    <nav className="navbar navbar-expand-lg" id="nav" >
    <div className="container-fluid" id="nav-form">
      <a href={'/'} className="navbar-brand" id='logo'>OnedaySeed</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      < ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a href={'/about'} className="nav-link active" aria-current="page" >About Us</a>
        </li>



          {/*   !가 붙어있어야 로그인전 화면에 노출 ! */}



          {/* User */}

          {/*로그인한 사용자에게만 보이게*/}
          { isLoggedIn ?
          <>
        <li className="nav-item">
          <a href={'/myPage'} className="nav-link">My Page</a>
        </li>
       </>
        :<></>}

          {/*로그인한 사용자에게만 보이게*/}
          { isLoggedIn ?
              <>
                  <li className="nav-item">
                      <a href="/" className="nav-link" onClick={handleClickLogout}>Logout</a>
                  </li>
               </>
              :<></>}
          {/*로그인한 사용자에게만 보이게*/}
          { isLoggedIn ?
              <>
          <li className="nav-item">
              <a className="nav-link active" aria-current="page" >
                  {userId}님, 반가워요!
              </a>
          </li>
              </>
              :<></>}

        {/* 로그인 전 사용자에게 '로그인' 보이게 */}
          {( !isLoggedIn  &&  !isHostLoggedIn )?
              <>
        <li className="nav-item">
          <a href="/user/login" className="nav-link" >Login</a>
        </li>
              </>: <></>}


          {/* Host */}



          {/*로그인한 호스트에게만 보이게*/}
          { isHostLoggedIn ?
              <>
                  <li className="nav-item">
                      <a href={'/host/myPage'} className="nav-link">My Page</a>
                  {/*    레슨 파일보고 페이지 맞게 연결*/}
                  </li>
              </>
              :<></>}

          {/*로그인한 호스트에게만 보이게*/}
          {/*{ isHostLoggedIn ?*/}
          {/*    <>*/}
          {/*        <li className="nav-item">*/}
          {/*            <a href={'/lesson/main'} className="nav-link">My Class</a>*/}
          {/*            /!*    레슨 파일보고 페이지 맞게 연결*!/*/}
          {/*        </li>*/}
          {/*    </>*/}
          {/*    :<></>}*/}

          {/*로그인한 호스트에게만 보이게*/}
          { isHostLoggedIn ?
              <>
                  <li className="nav-item">
                      <a href="/" className="nav-link" onClick={handleClickHostLogout}>Logout</a>
                  </li>
              </>
              :<></>}
          {/*로그인한 호스트에게만 보이게*/}
          { isHostLoggedIn ?
              <>
                  <li className="nav-item">
                      <a className="nav-link active" aria-current="page" >{hostNum}님, 반가워요!</a>
                  </li>
           </>
              :<></>}


      </ul>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input className="form-control me-2 " id="search-input" type="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="btn btn-outline-success " id='search-btn' type="submit">Search</button>
      </form>
    </div>
  </div>
 </nav>
 <hr/>
    </header>


          <main>
            {children}
          </main>

    <footer>
    <hr/>
      <div className="footer-body">
        <span><b>(주)원데이씨드</b> <br/>
        <span className="our-info">서울시 종로구 인사동길 12 15층 <br/>
         사업자등록번호 : 135-87-***** | 통신판매업 : 신고번호 제2024-서울종로-987**호  <br/>
         </span> <br/>
         <span className="not-host">(주)원데이씨드는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</span>
        </span>
        <br/><br/><br/><br/>
      </div>   
    </footer>


    </>

  )
}
export default BasicLayout;