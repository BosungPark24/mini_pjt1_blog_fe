import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogWrite() {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const changeTitle = e => setTitle(e.target.value);
    const changeContents = e => setContents(e.target.value);

    // 파일 선택창을 직접 제어하기 위해 ref 객체 변수를 정의
    const refFiles = useRef();

    // 업로드할 파일 데이터를 저장할 상태변수와 이벤트 핸들러
    const [files, setFiles] = useState([]);
    const handlerChangeFiles = e => {
        const files = e.target.files;

        if (files.length > 3) {
            alert('이미지는 최대 3개까지만 업로드 가능합니다.');
            refFiles.current.value = '';
            setFiles([]);
            return;
        }

        setFiles([...files]);
    };

    const navigate = useNavigate();

    // 서버로 전달할 입력창 내용을 객체로 정의 (단축 속성명)
    let datas = { title, contents };

    // FormData 변수에 서버로 전달할 입력창의 내용을 data 이름으로 설정
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(datas)], { type: 'application/json' }));
    // 첨부 파일을 files 이름으로 추가
    Object.values(files).forEach(file => formData.append('files', file));

    // 설정한 폼 데이터를 multipart/form-data 형식으로 서버로 전달
    const handlerSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST', 
            url: 'http://localhost:8080/blog/write', 
            data: formData, 
            headers: {'Content-Type' : 'multipart/form-data'}
        })
        .then(res => {
            res && res.status === 200 && navigate('/blog');
        })
        .catch(err => console.log(err));
    };

    return (
        <>
            <div className="container">
                <h2>블로그 게시물 등록</h2>
                <form id="frm" onSubmit={handlerSubmit}>
                    <table className="blog_detail">
                        <tbody>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" id="title" name="title" onChange={changeTitle} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><textarea id="contents" name="contents" onChange={changeContents}></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                    <input ref={refFiles} onChange={handlerChangeFiles} type="file" id="files" name="files" multiple="multiple" />
                    <input type="submit" id="submit" value="저장" className="btn" />
                </form>
            </div>	
        </>
    );
};
