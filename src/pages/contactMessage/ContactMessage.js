import RenderMessage from "../../components/renderContents/renderMessage/RenderMessage";
import { Link } from "react-router-dom";

export default function ContactMessage() {
  return (
    <>
      <Link to={`admin`}>
        <p>Back</p>
      </Link>
      <RenderMessage />;
    </>
  );
}
