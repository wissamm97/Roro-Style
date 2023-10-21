import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { VerifedEmail } from "../features/user/userSlice";
import { Container } from "react-bootstrap";
import { reset } from "../features/user/userSlice";
function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [serachParams, setSerachParams] = useSearchParams();
  const emailToken = serachParams.get("emailToken");
  useEffect(() => {
    if(user.isVerified){
      setTimeout(()=>{
        return navigate('/')
        dispatch(reset())
      },2000)
    }
    else{
      console.log('not Veri');
    }
    dispatch(VerifedEmail(emailToken));
  }, [user, emailToken]);
  return (
    // <div>Verify your Email Success , redirecting...</div>
    <Container>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <IoCheckmarkDoneOutline />
          </p>
          <h2>Verify your Email Success , redirecting...</h2>
        </div>
      </div>
    </Container>
  );
}

export default VerifyEmail;
