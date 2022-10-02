import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";

// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const API = process.env.REACT_APP_BASE_URL + "/api/banners/1?populate=image";

export default function RenderBanner() {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getBanner() {
      try {
        const response = await axios.get(API);

        setBanner(response.data.data);
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
      {banner.attributes.image.data.map((item) => {
        return (
          <div key={banner.id}>
            <Link to={`stays`}>
              <div className="banner">
                <button>Find yout stay</button>
                <h1>{banner.attributes.slogan}</h1>
                <img src={item.attributes.url} alt={banner.attributes.slogan} />
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
