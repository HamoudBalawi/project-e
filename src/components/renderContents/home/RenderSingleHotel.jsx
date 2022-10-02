import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";
import { Container, Row, Col } from "react-bootstrap";

// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const API = process.env.REACT_APP_BASE_URL + "/api/stays/7?populate=image";

export default function RenderSingleHotel() {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getHotel() {
      try {
        const response = await axios.get(API);

        setHotel(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getHotel();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : hotel ? (
        <Link to={`details/${hotel.id}`}>
          <div key={hotel.id} className="single-hotel">
            <div className="single-hotel-img">
              <img src={hotel.attributes.image.data[0].attributes.url} alt={hotel.attributes.name} />
            </div>
            <div className="single-hotel-details">
              <h2>Experience Bergen with us</h2>
              <h3>{hotel.attributes.name}</h3>
            </div>
          </div>
        </Link>
      ) : (
        setError(error)
      )}
    </>
  );
}
