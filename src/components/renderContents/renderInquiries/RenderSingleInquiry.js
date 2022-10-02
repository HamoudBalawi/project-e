import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/Loading";
import { INQUIRES } from "../../../constants/api";
// this is the wordpress api i created and used for this project
//
const authKey = JSON.parse(localStorage.getItem("auth"));

const API = process.env.REACT_APP_BASE_URL;

export default function RenderSingleInquiry() {
  const [inquiry, setInquiry] = useState([]);
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

  const API_URL = API + INQUIRES + "/" + id;

  useEffect(
    function () {
      async function getInquiry() {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authKey.jwt}`,
            },
          };
          const response = await axios.get(API_URL, options);

          setInquiry(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getInquiry();
    },
    [API_URL]
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : inquiry ? (
        <div key={inquiry.id} className="inquiry-details">
          <div className="comon-items-style">
            <p>Name :</p>
            <p>{inquiry.attributes.fullname}</p>
          </div>
          <div className="comon-items-style">
            <p>Message :</p>
            <p>{inquiry.attributes.message}</p>
          </div>
          <div className="comon-items-style">
            <p>Email :</p>
            <p>{inquiry.attributes.email}</p>
          </div>
          <div className="comon-items-style">
            <p>Phone :</p>
            <p> {inquiry.attributes.phone}</p>
          </div>
          <div className="comon-items-style">
            <p>checkin :</p>
            <p>{inquiry.attributes.checkin}</p>
          </div>
          <div className="comon-items-style">
            <p>checkout :</p>
            <p>{inquiry.attributes.checkout}</p>
          </div>
        </div>
      ) : (
        setError(error)
      )}
    </>
  );
}
