import AddEstablishment from "../../components/forms/adminForm/EstablishmentForm";
import { Link } from "react-router-dom";
import { IconName, FaBackspace } from "react-icons/fa";
import Heading from "../../components/layout/Heading";

export default function Establishment() {
  return (
    <div className="background-cover">
      <div className="contents-style establishment-contents">
        <Link to={`admin`}>
          <FaBackspace className="icons return-icon" />
        </Link>
        <h3>Add Establishment</h3>
        <AddEstablishment />
      </div>
    </div>
  );
}
