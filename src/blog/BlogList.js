/*
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
    // 게시판 목록 데이터를 담을 상태 변수를 정의 
    const [datas, setDatas] = useState([]);

    // 컴포넌트가 마운트된 후 게시판 목록 데이터를 조회 (목록 API를 호출)
    useEffect(() => {
        axios
            .get('http://localhost:8080/blog')
            .then(res => {
                console.log(res);
                res && res.data && setDatas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="container">
                <h2>블로그 글 목록</h2>
                <table className="blog_list">
                    <colgroup>
                        <col width="30%" />     
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            
                            <th scope="col">제목</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.length !== 0 && datas.map(blog => (
                                <tr>
                                    
                                    <td className="title">
                                        <Link to={`/blog/${blog.blogId}`}>{blog.title}</Link>
                                    </td>
                                    <td>{blog.hitCnt}</td>
                                    <td>{blog.createdDatetime}</td>
                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">조회된 결과가 없습니다.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Link to={'/blog/write'} className="btn">글쓰기</Link>
            </div>
        </>
    );
};
*/

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
    // 게시판 목록 데이터를 담을 상태 변수를 정의 
    const [datas, setDatas] = useState([]);

    // 컴포넌트가 마운트된 후 게시판 목록 데이터를 조회 (목록 API를 호출)
    useEffect(() => {
        axios
            .get('http://localhost:8080/blog')
            .then(res => {
                console.log('Response:', res); // 응답 확인
                if (res && res.data && Array.isArray(res.data)) {
                    setDatas(res.data);
                } else {
                    setDatas([]); // 응답 데이터가 배열이 아닐 경우 빈 배열로 설정
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err); // 에러 확인
                setDatas([]); // 에러 발생 시 빈 배열로 설정
            });
    }, []);

    return (
        <>
            <div className="container">
                <h2>블로그 글 목록</h2>
                <table className="blog_list">
                    <colgroup>
                        <col width="30%" />     
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(datas) && datas.length > 0 ? (
                                datas.map(blog => (
                                    <tr key={blog.blogId}>
                                        <td className="title">
                                            <Link to={`/blog/${blog.blogId}`}>{blog.title}</Link>
                                        </td>
                                        <td>{blog.hitCnt}</td>
                                        <td>{blog.createdDatetime}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">조회된 결과가 없습니다.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Link to={'/blog/write'} className="btn">글쓰기</Link>
            </div>
        </>
    );
};
