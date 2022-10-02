import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";
import { Container, Row, Col } from "react-bootstrap";

// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const API = process.env.REACT_APP_BASE_URL + "/api/stays?populate=image";

export default function RenderLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getLocations() {
      try {
        const response = await axios.get(API);

        setLocations(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getLocations();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
      <div className="destinations-items">
        {locations.map((name) => {
          return (
            <Link key={name.id} to={`details/${name.id}`}>
              <p className="stays-names">{name.attributes.location}</p>
            </Link>
          );
        })}
      </div>

  );
}
