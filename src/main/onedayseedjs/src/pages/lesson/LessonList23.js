import React, { useEffect, useState } from 'react';
import BasicLayout from "../../layouts/BasicLayout"
import axios from 'axios';

function LessonList2() {

  const [lessonList, setLessonList] = useState([]);

  const showLessonList = async () => {
    try {
      const response = await axios.get('/host/lesson/list');
      setLessonList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showLessonList();
  }, []);



  return (
    <div>
      <BasicLayout>
        <section>
          <div className="container text-center">
            <div className="row">

            <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/waffle.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">와플 만들기</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/boonga.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">붕어빵 만들기</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>
              
              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/baekcook.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">백종원의 요리교실</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/kimsumi.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">김수미 간장게장</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/joseok.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">조석 웹툰교실</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/somyo.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">소묘 심화과정IV</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/girlsgen.jpeg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">소녀시대의 노래교실</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/iu.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">아이유의 스케치북</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/pila.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">필라테스</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>

              <div className="col-lg-6" >
                <div className="card" style={{ width: '30rem' }}>
                  <img style={{ width: '25rem', height: '25rem', margin: '0 auto' }} src="/images/kimjongguk.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">김종국 발라드헬스</h5>
                    <a href={`/lesson/detail/`} className="btn btn-primary">
                      구매 상세 보기
                    </a>
                  </div>
                </div><br/>
              </div>
              
            </div>
          </div>
        </section>
      </BasicLayout>
    </div>
  );
}

export default LessonList2;