import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { PaidSuccess } from "../features/Stripe/Stripe";
function PaymentsSuccess() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(PaidSuccess(id));
  }, []);
  return (
    <Container>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Payment completed successfully</h2>

          <Link to="/">
            <Button className="continue-shopp">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default PaymentsSuccess;
