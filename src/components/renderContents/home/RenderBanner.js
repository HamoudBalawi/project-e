import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../../../components/common/FormError";
import Loading from "../../../components/common/Loading";

// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const API = process.env.REACT_APP_BASE_URL + "/api/banners/1?populate=image";

export default function RenderBanner() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getBanner() {
      try {
        const response = await axios.get(API);

        setStays(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getBanner();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
    <>
      {stays.attributes.image.data.map((stay) => {
        return (
          <div key={stays.id}>
            <Link to={`stays`}>
              <div className="banner">
                <button>Find yout stay</button>
                <h1>{stays.attributes.slogan}</h1>
                <img src={stay.attributes.url} alt={""} />
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
