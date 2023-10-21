import "./Welcome.css";
import { Button, Container } from "react-bootstrap";
function Welcome() {
  return (
    <div className="welcome">
      <div className="info">
        <div class="waviy">
          <span style={{ "--i": 1 }}>W</span>
          <span style={{ "--i": 2 }}>e</span>
          <span style={{ "--i": 3 }}>l</span>
          <span style={{ "--i": 4 }}>c</span>
          <span style={{ "--i": 5 }}>o</span>
          <span style={{ "--i": 6 }}>m</span>
          <span style={{ "--i": 7 }}>e</span>
          <span style={{ "--i": 8 }}>T</span>
          <span style={{ "--i": 9 }}>o</span>
          <span style={{ "--i": 10 }}>R</span>
          <span style={{ "--i": 11 }}>o</span>
          <span style={{ "--i": 12 }}>r</span>
          <span style={{ "--i": 13 }}>o</span>
          <span style={{ "--i": 14 }}>S</span>
          <span style={{ "--i": 15 }}>t</span>
          <span style={{ "--i": 16 }}>o</span>
          <span style={{ "--i": 17 }}>r</span>
          <span style={{ "--i": 18 }}>e</span>
        </div>
        <Button className="scroll-to-product">Let's shop</Button>
      </div>
    </div>
  );
}

export default Welcome;
