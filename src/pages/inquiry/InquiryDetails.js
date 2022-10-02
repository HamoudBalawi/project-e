import RenderSingleInquiry from "../../components/renderContents/renderInquiries/RenderSingleInquiry";
import { IconName, FaBackspace } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function InquiryDetails() {
  return (
    <div className="background-cover">
      <div className="contents">
        <Link to={`/inquiry`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <RenderSingleInquiry />
      </div>
    </div>
  );
}
