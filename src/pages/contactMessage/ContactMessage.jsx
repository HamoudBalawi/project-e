import RenderMessage from "../../components/renderContents/renderMessage/RenderMessage";
import { Link } from "react-router-dom";
import { IconName, FaBackspace } from "react-icons/fa";
import Heading from "../../components/layout/Heading";

export default function ContactMessage() {
  return (
    <div className="background-cover">
      <Heading content="Contact Message" />
      <div className="contents">
        <Link to={`admin`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <h4>Contact Message</h4>
        <RenderMessage />
      </div>
    </div>
  );
}
