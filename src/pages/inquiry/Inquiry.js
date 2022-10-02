import RenderInquiries from "../../components/renderContents/renderInquiries/RenderInquiries";
import { Link } from "react-router-dom";
import { IconName, FaBackspace } from "react-icons/fa";

export default function Inquiry() {
  return (
    <div className="background-cover">
      <div className="contents">
        <Link to={`admin`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <h4>Reservation Inquiry</h4>
        <RenderInquiries />
      </div>
    </div>
  );
}
