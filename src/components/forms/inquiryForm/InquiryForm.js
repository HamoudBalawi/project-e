import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, INQUIRES } from "../../../constants/api";
import axios from "axios";
import FormError from "../../common/FormError";
import SuccessMessage from "../../common/SuccessMessage";

const api = BASE_URL + INQUIRES;

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name"),
  phone: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter an email address"),
  message: yup.string().required("Please enter your message"),
  checkin: yup.string().required("Please enter your date"),
  checkout: yup.string().required("Please enter your date"),
});

export default function InquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  async function onSubmit(data) {
    try {
      setSubmitting(true);
      setInquiryError(null);
      const response = await axios.post(api, { data });

      if (response.status === 200) {
        setTimeout(() => {
          let inputs = document.querySelectorAll("input");
          inputs.forEach((input) => (input.value = ""));
          setSuccessMessage(true);
        }, 2000);

        setTimeout(() => {
          const success = document.querySelector(".success");

          success.style.display = "none";
        }, 4000);
      }
    } catch (error) {
      console.log("error", error);
      setInquiryError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="success">{successMessage ? <SuccessMessage /> : null}</div>
      {inquiryError && <FormError>{inquiryError}</FormError>}

      <fieldset disabled={submitting}>
        <label>Fullname</label>
        <input name="fullname" placeholder="Fullname" {...register("fullname")} />
        {errors.fullname && <span>{errors.fullname.message}</span>}

        <label>Phone</label>
        <input name="phone" placeholder="Phone" {...register("phone")} type="number" />
        {errors.phone && <span>{errors.phone.message}</span>}

        <label>Email</label>
        <input name="email" placeholder="Email" {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Message</label>
        <input name="message" placeholder="message" {...register("message")} type="text" />
        {errors.message && <span>{errors.message.message}</span>}

        <label>Check in</label>
        <input name="checkin" placeholder="date" {...register("checkin")} type="date" />
        {errors.checkin && <span>{errors.checkin.message}</span>}

        <label>Check out</label>
        <input name="checkout" placeholder="date" {...register("checkout")} type="date" />
        {errors.checkout && <span>{errors.checkout.message}</span>}

        <button>{submitting ? "Submitting..." : "Submit"}</button>
      </fieldset>
    </form>
  );
}
//<div className="message">{successMessage ? <p>{successMessage}</p> : null}</div>;
