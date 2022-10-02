import RenderSingleInquiry from "../../components/renderContents/renderInquiries/RenderSingleInquiry";
import { IconName, FaBackspace } from "react-icons/fa";
import { Link } from "react-router-dom";
import Heading from "../../components/layout/Heading";

export default function InquiryDetails() {
  return (
    <div className="background-cover">
      <Heading content="Inquiry Details" />
      <div className="contents">
        <Link to={`/inquiry`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <RenderSingleInquiry />
      </div>
    </div>
  );
}
