import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, CONTACTS } from "../../../constants/api";
import axios from "axios";
import FormError from "../../common/FormError";

const api = BASE_URL + CONTACTS;

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  phone: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter an email address"),
  subject: yup.string().required("Please enter your name"),
  message: yup.string().required("Please enter your message"),
});

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  async function onSubmit(data) {
    setSubmitting(true);
    setContactError(null);

    try {
      const response = await axios.post(api, { data });

      console.log("this is a response", response);
    } catch (error) {
      console.log("error", error);
      setContactError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contactError && <FormError>{contactError}</FormError>}
      <fieldset disabled={submitting}>
        <label>Fullname</label>
        <input name="name" placeholder="Fullname" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <label>Phone</label>
        <input name="phone" placeholder="Phone" {...register("phone")} type="number" />
        {errors.phone && <span>{errors.phone.message}</span>}

        <label>Email</label>
        <input name="email" placeholder="Email" {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}

        <label>subject</label>
        <input name="subject" placeholder="subject" {...register("subject")} type="text" />
        {errors.subject && <span>{errors.subject.message}</span>}

        <label>Message</label>
        <input name="message" placeholder="message" {...register("message")} type="text" />
        {errors.message && <span>{errors.message.message}</span>}

        <button>{submitting ? "Submitting..." : "Submit"}</button>
      </fieldset>
    </form>
  );
}
