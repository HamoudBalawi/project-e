import Heading from "../../components/layout/Heading";
import LoginForm from "../../components/forms/loginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className="background-cover">
      <div className="contents-style">
        <Heading content="Login" />
        <LoginForm />
      </div>
    </div>
  );
}
