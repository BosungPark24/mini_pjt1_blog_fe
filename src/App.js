import "./App.css";					
import { Link, Route, Routes } from "react-router-dom";
import BlogList from "./blog/BlogList";
import BlogWrite from "./blog/BlogWrite";
import BlogDetail from "./blog/BlogDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/write" element={<BlogWrite />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />      
      </Routes>
    </>
  );
}

export default App;
