import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Exchangeandreturnpolicy() {
  return (
    <section className="exchangeandreturnpolicy p-3 m-3">
      <Container>
        <Row>
          <Col>
            <div className="title">
              <h1>Exchange and return policy</h1>
            </div>
            <div className="exchangeandreturnpolicy">
              <p>
                In order to preserve the customer's rights by our store, we
                would like to clarify the following details:
              </p>
              <ul className="exchangeandreturnpolicy">
                <li>
                  The period of (return and replacement is 3 days) from the date
                  the customer receives the product, by contacting customer
                  service on WhatsApp, indicating the order number and informing
                  them of the request (replacement or return), and the following
                  conditions must be met:
                </li>
                <ol className="ol-exchange">
                  <li>
                    The product, upon exchange or return, must be in a sound and
                    undamaged condition.
                  </li>
                  <li>
                    The product must include all packaging and the stickers must
                    not be removed.
                  </li>
                </ol>
                <li>
                  The customer must return the order within 5 days of the return
                  request, and the customer shall bear the shipping costs.
                </li>
                <li>
                  In the event that the product is returned, and after the
                  shipment arrives at the site, it will be confirmed that it is
                  in its normal condition, and the amount will be returned
                  within (3 to 5 working days) in which only the amount of the
                  products will be returned.
                </li>
                <li>
                  Shipping costs and cash on delivery fees are non-refundable.
                </li>
                <li>
                  In the event that there is an error from the store (whether by
                  sending a different product, a different size, or a shortage
                  in the order), the store bears all costs.
                </li>
                <li>
                  In the event that the customer wishes to cancel the order,
                  please contact customer service on WhatsApp within (24 hours)
                  of the customer completing the order.
                </li>
                <li>
                  In the event that you want to cancel the order after (24
                  hours) have passed, the order is considered in progress, and
                  the product is returned and shipping fees are non-refundable.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Exchangeandreturnpolicy;
