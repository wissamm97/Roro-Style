import "./SingleUser.scss";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userDetails } from "../../../features/Admin/AdminSlice";
import MessageBox from "../../../components/MessageBox";
const SingleUser = () => {
  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(userDetails(id));
    setData(user);
  }, []);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">delete</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{user.user&&user.user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.user&&user.user.email}</span>
                </div>
                {user.address&&user.address.length ? (
                  <MessageBox variant="danger">{user.user&&user.address}</MessageBox>
                ) : (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{user.address&&user.address.phonenumber}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">
                        {user.address&&user.address.address}. {user.address&&user.address.city} || Unavailable
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{user.address&&user.address.country}</span>
                    </div>
                  </>
                )}
                {}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
