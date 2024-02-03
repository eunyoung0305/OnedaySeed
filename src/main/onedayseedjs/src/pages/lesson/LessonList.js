import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from "../../layouts/BasicLayout"
import axios from 'axios';
import "./Lesson.css";

function LessonList() {

  const [lessonList, setLessonList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q'); // 'q'는 검색 쿼리 파라미터의 이름

  const showLessonList = async () => {
    try {
      const response = await axios.get('/user/lesson/list');
      setLessonList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showLessonList();
  }, []);

  const handleLessonClick = (lessonId) => {
    // 각 레슨의 상세 페이지로 이동
    navigate('/lesson/detail', { state: { lessonId: lessonId } });
  };

  if (lessonList.length === 0 || (searchQuery && lessonList.filter((lesson) =>
      lesson.lessonName.includes(searchQuery) || lesson.lessonCategory.includes(searchQuery)).length === 0)) {
    return (
        <div>
          <BasicLayout>
            <section>
              <div className="container text-center">
                <div className="row">
                  <div className="col-12" >
                    <h1>검색 결과가 없습니다.<br/> 이런 강의는 어떠세요?</h1>
                    <button className="allLesson" onClick={() => navigate('/lesson/list')}>
                      모든 강의 보기
                    </button>
                  </div>

                </div>
              </div>
            </section>
          </BasicLayout>
        </div>
    );
  } else if (searchQuery && lessonList.length > 0) {
    return (
        <div>
          <BasicLayout>
            <section>
              <div className="container text-center">
                <div className="row">
                  {lessonList
                      .filter(
                          (lesson) =>
                              lesson.lessonName.includes(searchQuery) || lesson.lessonCategory.includes(searchQuery)
                      )
                      .map((lesson) => (
                          <div className="col-lg-6" key={lesson.lessonId}>
                            <div className="card" style={{ width: '35rem' , marginRight:"15px"}}>
                              <img src="/boonga.jpg" className="card-img-top" alt="..." />
                              <div className="card-body">
                                <h5 className="card-title">{lesson.lessonName}</h5>
                                <h5 className="card-title">{lesson.lessonCategory}</h5>
                                <button className='detailBtn' onClick={() => handleLessonClick(lesson.lessonId)}>상세 보기</button>
                              </div>
                            </div>
                            <br />
                          </div>
                      ))}
                </div>
              </div>
            </section>
          </BasicLayout>
        </div>
    );
  } else {
    return (
        <div>
          <BasicLayout>
            <section>
              <div className="container text-center" >
                <div className="row">
                  {lessonList.map((lesson) => (
                      <div className="col-lg-6" key={lesson.lessonId}>
                        <div className="card" style={{ width: '35rem' , marginRight:"15px"}}>
                          <img src="/boonga.jpg" className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{lesson.lessonName}</h5>
                            <h5 className="card-title">{lesson.lessonCategory}</h5>
                            <button className='detailBtn' onClick={() => handleLessonClick(lesson.lessonId)}>상세 보기</button>
                          </div>
                        </div>
                        <br />
                      </div>
                  ))}
                </div>
              </div>
            </section>
          </BasicLayout>
        </div>
    );
  }
}

export default LessonList;