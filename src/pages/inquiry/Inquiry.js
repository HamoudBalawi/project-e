import RenderInquiries from "../../components/renderContents/renderInquiries/RenderInquiries";
import { Link } from "react-router-dom";

export default function Inquiry() {
  return (
    <>
      <Link to={`admin`}>
        <p>Back</p>
      </Link>
      <RenderInquiries />;
    </>
  );
}
