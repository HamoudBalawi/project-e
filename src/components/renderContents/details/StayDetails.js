import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/Loading";
import Carousel from "react-bootstrap/Carousel";
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
                <Carousel.Item>
                  <div key={stay.id}>
                    <img src={images.attributes.url} alt={stay.attributes.name} />
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
          <div key={stay.id} className="wrapper">
            <h2 key={stay.id}>{stay.attributes.name}</h2>
            <p>{stay.attributes.description}</p>
          </div>
        </>
      ) : (
        setError(error)
      )}
    </>
  );
}
/* return (
    <>
      {loading ? (
        <Loading />
      ) : stay ? (
        <>
         
            

               
                    <div key={index} className="image-wrapper">
                      <img className="stay-image" src={images.attributes.url} alt={""} />
                    </div>

                
                <h2 className="stays-title">{item.attributes.name}</h2>
                <p>{item.attributes.distance + " km from center"}</p>
                <p>{item.attributes.price + " nok/night"}</p>
              </div>
      
    
        </>
      ) : (
        setError(error)
      )}
    </>
  );
}
/*<div className="detail-items">
    <h2 key={animal.id}>{animal.title.rendered}</h2>
    <img src={animal.featured_media_src_url} />
    <h3>{animal.slug}</h3>
    <p>{animal.yoast_head_json.og_description}</p>
  </div>;
 
 
 
  {stay.data.map((item) => {
     return (
       <div key={item.id} className="wrapper">
         {item.attributes.image.data.map((images, index) => {
           return (
             <div key={index} className="image-wrapper">
               <img className="stay-image" src={images.attributes.url} alt={""} />
             </div>
           );
         })}


         <h2 className="stays-title">{item.attributes.name}</h2>
         <p>{item.attributes.distance + " km from center"}</p>
         <p>{item.attributes.price + " nok/night"}</p>
       </div>
     );
   });
 }*/

/*     {
             stay.attributes.image.data.map((images, index) => {
               console.log("this is stay" + stay.attributes);
               return (
                 <div key={index} className="image-wrapper">
                   <img className="stay-image" src={images.attributes.url} alt={""} />
                 </div>
               );
             });
           }*/
