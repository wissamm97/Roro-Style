import "./navbar.scss";
import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const addShow = () => {
    const sid = document.querySelector(".sidebar").classList.toggle("show");
  };

  return (
    <div className="navbar">
      <button
        onClick={() => addShow()}
        class="btn btn-icon btn-mobile me-auto"
        data-trigger="#offcanvas_aside"
      >
        <FaBars />
      </button>
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {/* <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch(Toggle())}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
