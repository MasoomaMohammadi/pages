import "./App.css";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Comment from "./compounents/Comment";

function App() {
  const [commit, setCommit] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCommit(1)
  }, [])

  const pageChange = (data) => {
    let pageNumber = data.selected + 1;
    fetchCommit(pageNumber)
  }

  const fetchCommit = (pageNumber) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?_page=${pageNumber}`)
      .then((response) => {
        setCount(Math.ceil(response.headers.get("x-total-count") / 10));
        return response.json();
      })
      .then((commit) => setCommit(commit));
  }
  return (
    <div className="App">
      <div>
        {commit.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ) )}
      </div>
      <ReactPaginate
        pageCount={count}
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        containerClassName="pagination justify-content-center"
        nextClassName="page-item"
        pageClassName="page-item"
        previousClassName="page-item"
        breakClassName="page-item"
        pageLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        breakLinkClassName="page-link"
        activeLinkClassName="active"
        onPageChange={pageChange}
      />
    </div>
  );
}

export default App;
