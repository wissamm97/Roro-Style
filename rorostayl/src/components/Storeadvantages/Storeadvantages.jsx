import React from "react";
import "./Storeadvantages.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaShippingFast, FaWallet, FaComment } from "react-icons/fa";
function Storeadvantages() {
  return (
    <>
      <section className="services">
        <Container>
          <Row>
            <Col>
              <div className="titile">
                <div className="head">
                  <FaShippingFast />
                </div>
                <div className="info">
                  <p>fast charging</p>
                  <p>With love, we ship to all regions</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="titile">
                <div className="head">
                  <FaWallet />
                </div>
                <div className="info">
                  <p>Diverse and secure payment methods</p>
                  <p>
                    We provide all secure payment methods for your convenience
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="titile">
                <div className="head">
                  <FaComment />
                </div>
                <div className="info">
                  <p>customers service</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Storeadvantages;
