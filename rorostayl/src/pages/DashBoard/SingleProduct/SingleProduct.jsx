import "./SingleProduct.scss";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { deletproduct, productDetails } from "../../../features/Admin/AdminSlice";
const SingleProduct = () => {
  const { product,SuccessDelelte } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(productDetails(id));
    setData(product);
    if(SuccessDelelte){
      navigate("/products")
    }
  }, [dispatch,product,SuccessDelelte]);
const handleDelete = (id) =>{
  dispatch(deletproduct(id))
}
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
      <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={()=>handleDelete(data._id)}>delete</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.image}
                alt=""
                className="itemImg"
                style={{ borderRadius: "0", height: "150px", width: "150px" }}
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{data.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
