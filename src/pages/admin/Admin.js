import Heading from "../../components/layout/Heading";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <Heading content="Admin" />
      <Link to={`inquiry`}>
        <h2>inquiry</h2>
      </Link>
      <Link to={`ContactMessage`}>
        <h2>Contact</h2>
      </Link>
      <Link to={`Establishment`}>
        <h2>Establishment</h2>
      </Link>
    </>
  );
}
