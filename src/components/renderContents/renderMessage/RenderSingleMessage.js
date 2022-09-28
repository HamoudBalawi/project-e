import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/Loading";
import { CONTACTS } from "../../../constants/api";
// this is the wordpress api i created and used for this project
//
const authKey = JSON.parse(localStorage.getItem("auth"));

const API = process.env.REACT_APP_BASE_URL;

export default function RenderMessageDetails() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }
  if (!authKey) {
    history.push("/");
  }
  console.log(authKey);

  const API_URL = API + CONTACTS + "/" + id;

  useEffect(
    function () {
      async function getContact() {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authKey.jwt}`,
            },
          };
          const response = await axios.get(API_URL, options);

          setContact(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getContact();
    },
    [API_URL]
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : contact ? (
        <div key={contact.id} className="wrapper">
          <p>{contact.attributes.fullname}</p>
          <p>{contact.attributes.subject}</p>
          <p>{contact.attributes.phone}</p>
          <p>{contact.attributes.email}</p>
          <p>{contact.attributes.message}</p>
        </div>
      ) : (
        setError(error)
      )}
    </>
  );
}
