import Navbar from "../../../components/Admin/navbar/Navbar"
import Sidebar from "../sidebar/Sidebar";
import "./AddProduct.scss";
import FileBase64 from "react-file-base64";
import { IoCreateSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createproduct, getAllProducts } from "../../../features/Admin/AdminSlice";
function AddProduct() {
  const dispatch = useDispatch();
  const {SuccessCreate} = useSelector((state)=>state.admin)
  const [imageprodcut, setItem] = useState({ title: "", image: "" });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { name, description, price, category } = formData;
  const { image } = imageprodcut;
  useEffect(() => {
    if(SuccessCreate){
      dispatch(getAllProducts());
    }
  }, [imageprodcut]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      category,
      image,
    };
    dispatch(createproduct(productData));
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setItem({
      title:"",
      image: "",
    });
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <Container>
          <section className="heading add-prodduct p-3 m-3">
            <h1>
              <IoCreateSharp /> Creat New Prodcut
            </h1>
            <p>Please create an Prodcut</p>
          </section>
          <section className="form add-product">
            <form action="" onSubmit={onSubmit}>
              <div className="form-group">
                Name :
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Name Prodcut"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                description :
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter description Prodcut"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                price :
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={price}
                  placeholder="Enter price Prodcut"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                category :
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={category}
                  placeholder="Enter category Prodcut"
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setItem({ ...imageprodcut, title: "", image: base64 })
                  }
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Save Product
                </button>
              </div>
            </form>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default AddProduct;
