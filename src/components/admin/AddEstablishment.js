import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, ESTABLISHMENT } from "../../constants/api";

const api = BASE_URL + ESTABLISHMENT;

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  telephone: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter an email address"),
  description: yup.string().required("Please enter your name"),
  location: yup.string().required("Please enter your message"),
  distance: yup.string().required("Please enter your message"),
  image: yup.string().required("Please enter your message"),
});

export default function AddEstablishment() {
  const [submitting, setSubmitting] = useState(false);
  const [establishmentError, setEstablishmentError] = useState(null);
  // const [handleChange, setHandleChange] = useState(false);
  //const [imageFile, setImageFile] = useState(null);
  const [files, setFiles] = useState();

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
    setEstablishmentError(null);

    let formDataToSend = {
      name: data.name,
      telephone: data.telephone,
      email: data.email,
      description: data.description,
      location: data.location,
      distance: data.distance,
    };
    console.log(formDataToSend);

    //holidaze-heroku-api.herokuapp.com/api/stays
     axios
      .post(api, { formDataToSend })
      .then((res) => {
        console.log(res.data);
        return res.data.id;
      })
      .then((refId) => {
        const formData = new FormData();
        formData.append("files", files[0]);
        formData.append("refId", refId);
        formData.append("ref", "stays");
        formData.append("field", "media library");
        console.log(formData);

        //holidaze-heroku-api.herokuapp.com/api/upload

        return axios.post(BASE_URL + "/api/upload", formData);
      })
      .then((res) => {
        console.log("success", res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    /* try {
      const response = await axios.post(api, { data });

      console.log("this is a response", response.data);
    } catch (error) {
      console.log("error", error);
      setEstablishmentError(error.toString());
    } finally {
      setSubmitting(false);
    }*/
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {establishmentError && <FormError>{establishmentError}</FormError>}
      <fieldset disabled={submitting}>
        <label>Fullname</label>
        <input name="name" placeholder="Fullname" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <label>Phone</label>
        <input name="telephone" placeholder="Phone" {...register("telephone")} type="number" />
        {errors.telephone && <span>{errors.telephone.message}</span>}

        <label>Email</label>
        <input name="email" placeholder="Email" {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}

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
        <input name="image" placeholder="upload" {...register("image")} onChange={(e) => setFiles(e.target.files)} type="file" />
        {errors.message && <span>{errors.image.message}</span>}

        <button>{submitting ? "Submitting..." : "Submit"}</button>
      </fieldset>
    </form>
  );
}
/* let formData = new FormData();
    console.log("image", data.target.files[0]);
    if (data.target.files[0]) {
      formData.append("file", data.target.files[0]);
    }
*/
// const [authKey, setAuthKey] = useState([]);

/*useEffect(() => {
    const authKey = JSON.parse(localStorage.getItem("items"));
    if (authKey) {
      setAuthKey(authKey);
    }
  }, []);*/

/*let formData = new FormData();
    formData.append(data.name);
    formData.append(data.telephone);
    formData.append(data.email);
    formData.append(data.description);
    formData.append(data.location);
    formData.append(data.distance);
    formData.append(data.imageFile);

    axios.post("https://holidaze-heroku-api.herokuapp.com/api/upload", formData).then((response) => {
      const fileId = response.data[0].id;
      axios({
        method: "post",
        url: "https://holidaze-heroku-api.herokuapp.com/api/stays",
        data: {
          name: data.name,
          telephone: data.telephone,
          email: data.email,
          description: data.description,
          location: data.location,
          image: fileId,
          distance: data.distance,
        },
      })
        .then(({ data }) => {
          setSubmitting(data);
        })
        .catch((error) => {
          //handle error
        });
    });*/
