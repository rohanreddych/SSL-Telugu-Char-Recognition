import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
// import PostImg from "./Components/PostImg";
import Result from "./Components/Result";

function App() {
  return (
    // <div className="App">
    <Container>
      <header className="App-header">
        {/* <h1>Telugu OCR System</h1> */}
        <a
          className="Githublink"
          href="https://github.com/rohanreddych/SSL-Telugu-Char-Recognition/tree/deplyed"
        >
          {" "}
          View Source
        </a>
      </header>
      <div style={{margin:"185px"}}>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Upload Image</h3>
      <Container className="App-body">
        {/* <PostImg /> */}
        <Result />
      </Container>
      </div>
      {/* </div>
       */}
    </Container>
  );
}

export default App;
