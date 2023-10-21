import "./Empty.css";
import { Container } from "react-bootstrap";
import { FaHeartBroken } from "react-icons/fa";
import {Link} from "react-router-dom"
function Empty(props) {
  console.log(props);
  return (
    <div className="empty">
      <Container className="empty">
        <Link to='/'> {props.content} is empty. Go Shopping</Link>
        <FaHeartBroken />
      </Container>
    </div>
  );
}

export default Empty;
