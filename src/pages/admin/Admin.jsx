import Heading from "../../components/layout/Heading";
import { Link } from "react-router-dom";
import { IconName, MdOutlineMessage, MdLocalPostOffice } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";

export default function Admin() {
  return (
    <>
      <div className="background-cover">
        <Heading content="Admin" />
        <div className="admin-contents">
          <div>
            <Link to={`inquiry`} className="content-link">
              <MdOutlineMessage className="icons" />
              <h3>inquiry</h3>
            </Link>
          </div>
          <div>
            <Link to={`ContactMessage`} className="content-link">
              <MdLocalPostOffice className="icons" />
              <h3>Contact</h3>
            </Link>
          </div>
          <div>
            <Link to={`Establishment`} className="content-link">
              <BiPlusCircle className="icons" />
              <h3>Establishment</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
