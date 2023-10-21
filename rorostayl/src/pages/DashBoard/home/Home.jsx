import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../../components/Admin/widget/Widget";
import Featured from "../../../components/Admin/featured/Featured";
import Navbar from '../../../components/Admin/navbar/Navbar'
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="products" />
          <Widget type="sales" />
        </div>
        <div className="charts">
          <Featured />
        </div>
      </div>
    </div>

  );
};

export default Home;
