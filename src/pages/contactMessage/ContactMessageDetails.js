import RenderSingleMessage from "../../components/renderContents/renderMessage/RenderSingleMessage";
import { Link } from "react-router-dom";
import { IconName, FaBackspace } from "react-icons/fa";

export default function ContactMessageDetails() {
  return (
    <div className="background-cover">
      <div className="contents">
        <Link to={`/contactMessage`}>
          <FaBackspace className="icons inquiry-icon" />
        </Link>
        <h4>Contact Message</h4>
        <RenderSingleMessage />
      </div>
    </div>
  );
}
