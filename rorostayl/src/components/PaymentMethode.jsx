import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { paymentMethodo } from "../features/cart/cartSlice";
function PaymentMethode() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.cart);
  const { Shipingaddress } = useSelector((state) => state.user);
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentMethodo(paymentMethodName));
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/PlaceOrder");
  };

  useEffect(() => {
    if (!Shipingaddress) {
      navigate("/shipping");
    }
  }, [navigate, Shipingaddress]);
  return (
    <div className="container small-container text-center">
      <h1 className="my-3 text-center">Payment Method</h1>
      <Form onSubmit={submitHandler} className="">
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Button type="submit">Continue</Button>
        </div>
      </Form>
    </div>
  );
}

export default PaymentMethode;
