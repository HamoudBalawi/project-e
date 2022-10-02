import RenderInquiries from "../../components/renderContents/renderInquiries/RenderInquiries";
import { Link } from "react-router-dom";
import { IconName, FaBackspace } from "react-icons/fa";
import Heading from "../../components/layout/Heading";

export default function Inquiry() {
  return (
    <div className="background-cover">
      <Heading content="Inquiry" />
      <div className="contents">
        <Link to={`admin`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <RenderInquiries />
      </div>
    </div>
  );
}
