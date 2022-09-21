import StayDetails from "../details/StayDetails";
import Heading from "../layout/Heading";
import InquiryForm from "./InquiryForm";

export default function Details() {
  return (
    <>
      <Heading content="Details" />
      <StayDetails />
      <InquiryForm />
    </>
  );
}
