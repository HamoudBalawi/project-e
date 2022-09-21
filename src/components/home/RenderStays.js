import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../common/FormError";
import Loading from "../common/Loading";

// this is the live wordpress api i created and used for this project
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
        console.log(response.data.data);
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
      {stays.map((stay) => {
        return (
          <div key={stay.id} className="wrapper">
            <Link to={`details/${stay.id}`}>
              <div className="image-wrapper">
                <img className="stay-image" src={stay.attributes.image.data[0].attributes.url} alt={""} />
              </div>
              <h2 className="stays-title">{stay.attributes.name}</h2>
              <p>{stay.attributes.distance + " km from center"}</p>
              <p>{stay.attributes.price + " nok/night"}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}
