import { useRef, useState, useEffect } from "react";
import classes from "./auth-form.module.css";
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

async function createUser(email, password) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Bad response");
  }
  console.log(data)
  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistrationSucces, setIsRegistrationSucces] = useState(false)
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
   const timer = setTimeout(() => {
      setIsRegistrationSucces(false)
    }, 2000);
  
    return () => {
      clearTimeout(timer)
    }
  }, [isRegistrationSucces])
  

  async function submitHandler(e) {
    e.preventDefault()
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      })
      router.push('/')
      console.log(result)
    } else {
      const data = await createUser(enteredEmail, enteredPassword);
      setIsLogin(true)
      setIsRegistrationSucces(true)
      return data
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
          {isRegistrationSucces && <p>The user is created!</p>}
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
