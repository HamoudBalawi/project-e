import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL, ESTABLISHMENT } from "../../../constants/api";
import Loading from "../../common/Loading";
import SuccessMessage from "../../common/SuccessMessage";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  telephone: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter an email address"),
  price: yup.string().required("Please enter an email address"),
  description: yup.string().required("Please enter your name"),
  location: yup.string().required("Please enter your message"),
  distance: yup.string().required("Please enter your message"),
  image: yup.mixed().required("Please select an image"),
});
const api = BASE_URL + ESTABLISHMENT;
const authKey = JSON.parse(localStorage.getItem("auth"));

export default function EstablishmentForm() {
  const [submitting, setSubmitting] = useState(false);
  const [establishmentError, setEstablishmentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const history = useHistory();

  if (!authKey) {
    history.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setEstablishmentError(null);

    try {
      const formData = new FormData();
      formData.append("files.image", data.image[0]);

      // data.image[0].name;
      const body = JSON.stringify({
        name: data.name,
        telephone: data.telephone,
        email: data.email,
        price: data.price,
        description: data.description,
        location: data.location,
        distance: data.distance,
      });

      formData.append("data", body);

      console.log(body);
      const options = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authKey.jwt}`,
        },
      };

      const response = await fetch(api, options);
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
      setEstablishmentError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {establishmentError && <FormError>{establishmentError}</FormError>}
      <div className="success">{successMessage ? <SuccessMessage>Added Successfuly</SuccessMessage> : null}</div>
      <fieldset disabled={submitting}>
        <div className="establishment-form">
          <label>Establishment name</label>
          <input name="name" placeholder="Establishment name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Phone</label>
          <input name="telephone" placeholder="Phone" {...register("telephone")} type="number" />
          {errors.telephone && <span>{errors.telephone.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Email</label>
          <input name="email" placeholder="Email" {...register("email")} type="email" />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Price</label>
          <input name="price" placeholder="price" {...register("price")} type="number" />
          {errors.message && <span>{errors.price.message}</span>}
        </div>

        <div className="establishment-form">
          <label>location</label>
          <input name="location" placeholder="location" {...register("location")} type="text" />
          {errors.location && <span>{errors.location.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Distance</label>
          <input name="distance" placeholder="distance" {...register("distance")} type="number" />
          {errors.message && <span>{errors.distance.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Description</label>
          <textarea name="description" placeholder="description" {...register("description")} rows={7} cols={40} type="text" />
          {errors.message && <span>{errors.description.message}</span>}
        </div>

        <div className="establishment-form">
          <label>Image</label>
          <input name="image" placeholder="upload" {...register("image")} accept="image/png, image/jpeg" multiple type="file" />
          {errors.message && <span>{errors.image.message}</span>}
        </div>

        <div className="establishment-form">
          <button>{submitting ? <Loading /> : "Submit"}</button>
        </div>
      </fieldset>
    </form>
  );
}
