import { useRef, useState } from "react";
import classes from "./auth-form.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-type": "application-json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Bad response");
  }
  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  function submitHandler() {
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (isLogin) {
    } else {
      const data = createUser(enteredEmail, enteredPassword);
    }
  }

  function switchAuthModeHandler() {
    setIsLogin(!isLogin);
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
