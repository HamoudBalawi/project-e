import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";
import { Container, Row, Col } from "react-bootstrap";
import { IconName, ImLocation } from "react-icons/im";
// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const API = process.env.REACT_APP_BASE_URL + "/api/stays?populate=image";

export default function RenderStays() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getStays() {
      try {
        const response = await axios.get(API);

        setStays(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getStays();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
    <>
      <div className="container-wrapper">
        <Container>
          <Row>
            {stays.map((stay) => {
              return (
                <Col>
                  <Link to={`details/${stay.id}`}>
                    <div className="stay">
                      <img className="stay-image" src={stay.attributes.image.data[0].attributes.url} alt={stay.attributes.name} />
                      <div className="stay-details">
                        <div className="stay-location">
                          <ImLocation className="location-icon" />
                          <p>{stay.attributes.location}</p>
                        </div>
                        <p>{stay.attributes.price + " nok/night"}</p>
                      </div>
                      <p>{stay.attributes.distance + " km from center"}</p>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
