import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";

// created a login to test for this project
// username: madani
// passowrd: heroku123

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);

      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <FormError>{loginError}</FormError>}
      <fieldset disabled={submitting}>
        <div className="form-contents">
          <h3>Login</h3>
          <label>Username</label>
          <input name="identifier" placeholder="Username" {...register("identifier")} />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className="form-contents">
          <label>Password</label>
          <input name="password" placeholder="Password" {...register("password")} type="password" />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-contents">
          <button>{submitting ? "Loggin in..." : "Login"}</button>
        </div>
      </fieldset>
    </form>
  );
}
