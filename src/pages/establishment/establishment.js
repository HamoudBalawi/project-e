import AddEstablishment from "../../components/forms/adminForm/EstablishmentForm";
import { Link } from "react-router-dom";

export default function Establishment() {
  return (
    <>
      <Link to={`admin`}>
        <p>Back</p>
      </Link>
      <AddEstablishment />;
    </>
  );
}
