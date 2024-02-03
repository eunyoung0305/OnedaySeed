import React from 'react';
import { useLocation } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';

function LessonList3() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q'); // 'q'는 검색 쿼리 파라미터의 이름

    const lessonData = [
        {
            id: 1,
            title: '여우와 함께 즐거운 시간',
            image: './images/fox.JPG',
            description: '클래스 상세 내역을 확인하세요.',
        },
        // 다른 레슨 데이터들 추가
    ];

    const filteredLessons = lessonData.filter((lesson) =>
        lesson.title.includes(searchQuery)
    );

    return (
        <BasicLayout>
            <div className="container text-center">
                <h2>Lesson List</h2>
                {searchQuery && (
                    <div>
                        <h3>Search Results:</h3>
                        <p>You searched for: {searchQuery}</p>
                        {filteredLessons.length > 0 ? (
                            <div className="row">
                                {filteredLessons.map((lesson) => (
                                    <div key={lesson.id} className="col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <img
                                                    src={lesson.image}
                                                    className="card-img-top"
                                                    alt="이미지"
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {lesson.title}
                                                    </h5>
                                                    <a
                                                        href="#"
                                                        className="btn btn-primary"
                                                    >
                                                        {lesson.description}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1>검색 결과가 없습니다.</h1>
                        )}
                    </div>
                )}
            </div>
        </BasicLayout>
    );
}

export default LessonList3;
