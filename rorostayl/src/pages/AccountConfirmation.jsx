import React from "react";

import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { accountconfirm } from "../features/user/userSlice";
function AccountConfirmation() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  return (
    <section className="account-confirmation">
      <Container>
        <div className="success-wrapper">
          <div className="success">
            {user.isVerified ? (
              <h4>The account is confirmed</h4>
            ) : (
              <>
                <h4>
                  Please verify your account in order to complete your purchase
                </h4>
                <div className="send-confirmation">
                  <button
                    className="verify"
                    onClick={()=>dispatch(accountconfirm(user._id))}
                  >
                    send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AccountConfirmation;
