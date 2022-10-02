import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, INQUIRIES } from "../../../constants/api";
import axios from "axios";
import FormError from "../../common/FormError";
import SuccessMessage from "../../common/SuccessMessage";

const api = BASE_URL + INQUIRIES;

const schema = yup.object().shape({
  email: yup.string().required("Please enter an email address"),
});

export default function SubscriprtionForm() {
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
    <form className="subscription-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="success">{successMessage ? <SuccessMessage /> : null}</div>
      {inquiryError && <FormError>{inquiryError}</FormError>}
      <fieldset disabled={submitting}>
        <h5>Subscribe for our best offers!</h5>
        <input name="email" placeholder="Email..." {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}
        <button>{submitting ? "Submitting..." : "Subscribe"}</button>
      </fieldset>
    </form>
  );
}
