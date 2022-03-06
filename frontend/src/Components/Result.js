import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import "./Result.css";

// import Canvas from './Canvas'

const Result = (props) => {
  const [data, setData] = useState(null);
  const [counter, setc] = useState(0);
  const canvasRef = useRef(null);
  // function drawRects(ctx){
  //   var imgvar = document.getElementById('imge35');
  //   ctx.drawImage(imgvar, imgvar.x, imgvar.y,  imgvar.width, imgvar.height);
  //   ctx.beginPath();
  //   ctx.strokeStyle="white";
  //   ctx.rect(imgvar.x, imgvar.y,  80, 80);
  //   ctx.stroke();
  // }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/images/" + 32, {
        head1280pxers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        const params = {
          image: res.data.img,
          boxes: res.data.my_preds,
        };
        setData(params);
        setc(1);
        // var im=  document.getElementById('imge35');
        // // const ref = React.useRef();
        // // const ctx = ref.current.getContext('2d');
        // // im.onload = ()=>{
        // //   drawRects(ctx);
        // // };
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, [counter]);

  return (
    <Container>
      {data ? (
        <div className="img-frame" ref={canvasRef} {...props}>
          <img id="imge35" src={data.image} />
        </div>
      ) : (
        <h3> hi</h3>
      )}
      {/* <Canvas /> */}
    </Container>
  );
};
export default Result;
