import SubscriprtionForm from "../../components/forms/subscriptionForm/subscriptionForm";
import Footer from "../../components/layout/Footer";
import RenderBanner from "../../components/renderContents/home/RenderBanner";
import RenderLocations from "../../components/renderContents/home/RenderLocations";
import RenderSingleHotel from "../../components/renderContents/home/RenderSingleHotel";
import Heading from "../../components/layout/Heading";

export default function Home() {
  return (
      <div className="wrapper">
        <div className="body-container">
          <Heading content="Home" />
          <RenderBanner />
          <RenderSingleHotel />
          <p className="title destination-title">Top Destinations</p>
          <RenderLocations />
          <SubscriprtionForm />
        </div>
      </div>
  );
}
