import React, { useState, useCallback } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./PostImg.css";
// import { Alert } from "bootstrap";

function PostImg() {
  const [anno, setAnno] = useState(0);
  const [fileName, setfileName] = useState(null);
  const [filedata, setfiledata] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setAnno(1);
    loadFiles(acceptedFiles);
  }, []);

  function loadFiles(files) {
    setTimeout(() => {
      setAnno(0);
      setfileName(files[0].name);
      setfiledata(files);
    }, 700);
  }

  function sendData() {
    if (filedata) {
      setAnno(1);
      //   axios
      //     .get("http://127.0.0.1:8000/api/images", { headers: {'accept':'application/json'} })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      var formdata = new FormData();
      formdata.append("img", filedata[0], filedata[0].name);
      // formdata.append("preds", JSON.stringify({"null":"null"}));
      axios
        .post("http://127.0.0.1:8000/api/images/", formdata, {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
        .then((resp) => {
          const objid = resp["data"]["id"];
          // console.log(objid);
          axios
            .get("http://127.0.0.1:8000/api/images/" + objid, {
              headers: { accept: "application/json" },
            })
            .then((res1) => {
              console.log(res1["data"]);
              setAnno(0);
              setfileName(null);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please upload a valid image");
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: "image/jpeg,image/jpg,image/tiff,image/gif,image/png",
    multiple: false,
  });

  return (
    <Container>
      <div {...getRootProps()} className="back">
        {/* {anno ? <button onClick={bbox}>Show the predicted text on the image.</button> : null} */}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        <aside></aside>
        {anno ? (
          <Spinner animation="border" role="status">
            {/* <span className='sr-only'>Loading...</span> */}
          </Spinner>
        ) : null}

        <h4>{fileName}</h4>
      </div>
      <br />
      <br />
      <Button
        variant="info"
        type="submit"
        onClick={sendData}
        style={{ margin: "0 auto", display: "block", fontSize: "25px" }}
      >
        Submit
      </Button>
    </Container>
  );
}

export default PostImg;
