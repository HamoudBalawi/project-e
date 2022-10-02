import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/Loading";
import Carousel from "react-bootstrap/Carousel";
import InquiryForm from "../../forms/inquiryForm/InquiryForm";
// this is the wordpress api i created and used for this project
//

const API = process.env.REACT_APP_BASE_URL + "/api/stays";

export default function StayDetails() {
  const [stay, setStay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }
  const API_URL = API + "/" + id + "?populate=image";

  useEffect(
    function () {
      async function getDetail() {
        try {
          const response = await axios.get(API_URL);

          setStay(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getDetail();
    },
    [API_URL]
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : stay ? (
        <>
          <Carousel>
            {stay.attributes.image.data.map((images) => {
              return (
                <Carousel.Item className="hotel-images">
                  <img src={images.attributes.url} alt={stay.attributes.name} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <div className="hotel">
            <div className="hotel-contents">
              <div key={stay.id} className="hotel-details">
                <div className="hotel-name-price">
                  <h2>{stay.attributes.name}</h2>
                  <p className="title">{stay.attributes.price + " nok/night"}</p>
                </div>
                <div className="hotel-location">
                  <p>{"Address " + stay.attributes.location}</p>
                  <p>{stay.attributes.distance + " km from center"}</p>
                </div>
                <div className="hotel-description">
                  <p className="title">Description</p>
                  <p>{stay.attributes.description}</p>
                </div>
              </div>
              <InquiryForm />
            </div>
          </div>
        </>
      ) : (
        setError(error)
      )}
    </>
  );
}
