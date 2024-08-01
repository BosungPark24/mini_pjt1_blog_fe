import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetail() {
    const [blog, setBlog] = useState({});
    
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const { blogId } = useParams();
    
    const navigate = useNavigate();
        
    const listButtonClick = e => { 
        e.preventDefault();
        navigate('/blog'); 
    };
    const updateButtonClick = e => { 
        e.preventDefault();

        axios
            .put(`http://localhost:8080/blog/${blogId}`, {title, contents})
            .then(res => {
                res && res.status === 200 && navigate('/blog')
            })
            .catch(err => console.log(err));
    };
    const deleteButtonClick = e => { 
        e.preventDefault();

        axios
            .delete(`http://localhost:8080/blog/${blogId}`)
            .then(res => {
                res && res.status === 200 && navigate('/blog')
            })
            .catch(err => console.log(err));        
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blog/${blogId}`)
            .then(res => {
                res && res.data && setBlog(res.data);
                setTitle(res.data.title);
                setContents(res.data.contents);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="container">
                <h2>{title}</h2>
                <form id="frm" method="post">
                    <input type="hidden" id="blogId" name="blogId" />
                
                    <table className="blog_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="*"   />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">글 번호</th>
                            <td>{blog.blogId}</td>
                            <th scope="row">조회수</th>
                            <td>{blog.hitCnt}</td>
                        </tr>
                        <tr>
                            <th scope="row">작성자</th>
                            <td>{blog.creatorId}</td>
                            <th scope="row">작성일</th>
                            <td>{blog.createdDatetime}</td>
                        </tr>
                        <tr>
                            <th scope="row">제목</th>
                            <td colSpan="3"><input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td colSpan="4"><textarea id="contents" name="contents" value={contents} onChange={e => setContents(e.target.value)}></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                
                <div className="file_list"> 
                    {
                        blog.fileInfoList && blog.fileInfoList.map(fileInfo => (<p>{fileInfo.originalFileName} ({fileInfo.fileSize}kb)</p>))                    
                    }
                </div>
                
                <input type="button" id="list" className="btn" value="목록으로" onClick={listButtonClick} />
                <input type="button" id="update" className="btn" value="수정하기" onClick={updateButtonClick} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={deleteButtonClick} />
            </div>	
        </>
    );
};
