import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";
import { CONTACTS } from "../../../constants/api";
// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const authKey = JSON.parse(localStorage.getItem("auth"));

const API = process.env.REACT_APP_BASE_URL + CONTACTS;

export default function RenderInquiry() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  if (!authKey) {
    history.push("/");
  }

  useEffect(function () {
    async function getMessage() {
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authKey.jwt}`,
          },
        };
        const response = await axios.get(API, options);

        setContact(response.data.data);
        console.log(response.data.data);
        // setAuth(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getMessage();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
    <>
      {contact.map((item) => {
        return (
          <div key={item.id} className="wrapper">
            <Link to={`contactMessageDetails/${item.id}`}>
              <div className="render-items">
                <p className="render-name">{item.attributes.subject}</p>
                <p>{item.attributes.message}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
