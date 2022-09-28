import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL, ESTABLISHMENT } from "../../../constants/api";
import Loading from "../../common/Loading";

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
      <fieldset disabled={submitting}>
        <label>Establishment name</label>
        <input name="name" placeholder="Fullname" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <label>Phone</label>
        <input name="telephone" placeholder="Phone" {...register("telephone")} type="number" />
        {errors.telephone && <span>{errors.telephone.message}</span>}

        <label>Email</label>
        <input name="email" placeholder="Email" {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Price</label>
        <input name="price" placeholder="price" {...register("price")} type="number" />
        {errors.message && <span>{errors.price.message}</span>}

        <label>location</label>
        <input name="location" placeholder="location" {...register("location")} type="text" />
        {errors.location && <span>{errors.location.message}</span>}

        <label>Description</label>
        <input name="description" placeholder="description" {...register("description")} type="text" />
        {errors.message && <span>{errors.description.message}</span>}

        <label>Distance</label>
        <input name="distance" placeholder="distance" {...register("distance")} type="number" />
        {errors.message && <span>{errors.distance.message}</span>}

        <label>Image</label>
        <input name="image" placeholder="upload" {...register("image")} accept="image/png, image/jpeg" multiple type="file" />
        {errors.message && <span>{errors.image.message}</span>}

        <button>{submitting ? <Loading /> : "Submit"}</button>
      </fieldset>
    </form>
  );
}
