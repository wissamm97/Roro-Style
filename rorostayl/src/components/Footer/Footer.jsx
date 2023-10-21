import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <Container>
          <Row>
            <div className="footer-heading">
              <img src="../../logo.jpeg" alt="" />
            </div>
          </Row>
          <Row style={{ margin: " 30px auto 0px auto" }}>
            <Col>
              <div className="footer-col">
                <span>About US</span>
                <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  Roro Style is the best low-priced women's apparel and fashion
                  retailer, offering luxury apparel and much more, visit our
                  website!!
                </p>
              </div>
            </Col>
            <Col>
              <div className="footer-col">
                <span>Important links</span>

                <ul className="footer-link">
                  <li>
                    <Link to="/privacypolicy">privacy policy</Link>
                  </li>
                  <li>
                    <Link to="/exchangeandreturnpolicy">
                      Exchange and return policy
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className="footer-col links">
                <span>Connect with us</span>
                <Link to="contact">Contact</Link>
                <Link>
                  <FaInstagram />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-sub"></div>
    </footer>
  );
}

export default Footer;
