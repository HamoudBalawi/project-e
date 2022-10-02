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
        <div key={contact.id}>
          <div className="comon-items-style">
            <p>Name :</p>
            <p>{contact.attributes.fullname}</p>
          </div>
          <div className="comon-items-style">
            <p>Subject :</p>
            <p>{contact.attributes.subject}</p>
          </div>
          <div className="comon-items-style">
            <p>Message :</p>
            <p>{contact.attributes.message}</p>
          </div>
          <div className="comon-items-style">
            <p>Email :</p>
            <p>{contact.attributes.email}</p>
          </div>
          <div className="comon-items-style">
            <p>Phone :</p>
            <p> {contact.attributes.phone}</p>
          </div>
        </div>
      ) : (
        setError(error)
      )}
    </>
  );
}
