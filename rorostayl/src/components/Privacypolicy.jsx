import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Privacypolicy() {
  return (
    <section className="privacypolicy p-3 m-3">
      <Container>
        <Row>
          <Col>
            <div className="title">
              <h1>privacy policy</h1>
            </div>
            <div className="privacy-content ">
              <p>Privacy Policy and Terms of Use and Service</p>
              <ul className="privacy">
                <li>
                  The sale of your purchase and use of the products available on
                  this site is subject to the Terms and Conditions of Use and
                  Service.
                </li>
                <li>
                  The store may choose to accept, not accept, or cancel your
                  order in some cases, for example: if the product you want to
                  buy is not available, or if the product is priced incorrectly,
                  or if the order is found to be fraudulent, and the site will
                  return what you have Pay for orders that are not accepted or
                  that are canceled.
                </li>
                <li>
                  All content on the site, including writings, designs,
                  graphics, logos, icons, images, interfaces, symbols, programs
                  and trademarks, is an exclusive property owned by the store,
                  and this property is subject to copyright protection.
                </li>
                <li>
                  The site reserves the right to make any amendments or changes
                  to its site and to the policies and agreements associated with
                  it, including the privacy policy, terms and conditions of use
                  and service, and the exchange and return policy.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Privacypolicy;
