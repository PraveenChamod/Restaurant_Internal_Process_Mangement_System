import { useState } from "react";
import * as l from "./SideNavBarElements";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-scroll";
import img from "../../Images/restoLogodark.png";
const SideNavbar = () => {
  const [visiblity, setVisible] = useState(false);
  const Visible = () => {
    setVisible(true);
  };
  const Invisible = () => {
    setVisible(false);
  };
  const ScrollToTop = () => {
    if (window.pageYOffset > 200) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <l.NavBar>
      <l.Links>
        <l.Logo src={img} alt="" />
      </l.Links>
      {visiblity ? (
        <l.Nav
          initial="hidden"
          animate="visible"
          exit={{
            y: "-100vh",
            opacity: 0,
          }}
        >
          <l.Ul>
            <l.Li className="li">
              <Link to="Cover" spy={true} offset={-100} smooth={true}>
                Home<l.Span className="Ho"></l.Span>
              </Link>
            </l.Li>
            <l.Li className="li">
              <Link to="Menu" spy={true} offset={-100} smooth={true}>
                Menu<l.Span className="Ho"></l.Span>
              </Link>
            </l.Li>
            <l.Li className="li">
              <Link to="AboutUs" spy={true} offset={-100} smooth={true}>
                About Us<l.Span className="Ho"></l.Span>
              </Link>
            </l.Li>
            <l.Li className="li">
              <Link to="Services" spy={true} offset={-100} smooth={true}>
                Services<l.Span className="Ho"></l.Span>
              </Link>
            </l.Li>
            <l.Li className="li">
              <Link to="ContactUs" spy={true} offset={-100} smooth={true}>
                Contact Us<l.Span className="Ho"></l.Span>
              </Link>
            </l.Li>
          </l.Ul>
        </l.Nav>
      ) : (
        false
      )}
      <l.Menubtn onClick={visiblity ? Invisible : Visible}>
        {visiblity ? <MdClose /> : <FaBars />}
      </l.Menubtn>
    </l.NavBar>
  );
};

export default SideNavbar;
