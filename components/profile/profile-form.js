import { useRef, useState, useEffect } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const newPasswordInput = useRef();
  const oldPasswordInput = useRef();
  useEffect(() => {
    if (passwordIsNotValid) {
      const timer = setTimeout(() => {
        setPasswordIsNotValid(false)
      }, 2000);
  
      return () => {
        clearTimeout(timer)
      }
    }
  }, [passwordIsNotValid])

  useEffect(() => {
   if (passwordIsValid) {
    const timer = setTimeout(() => {
      setPasswordIsValid(false)
    }, 2000);

    return () => {
      clearTimeout(timer)
    }
   }
  }, [passwordIsValid])


  async function changePasswordHandler(e) {
    e.preventDefault();
    const newPassword = newPasswordInput.current.value;
    const oldPassword = oldPasswordInput.current.value;
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, oldPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      setPasswordIsNotValid(true)
    } else {
      setPasswordIsValid(true)
      newPasswordInput.current.value = "";
      oldPasswordInput.current.value = "";
    }

  }

  return (
    <form onSubmit={changePasswordHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInput} />
      </div>
      {passwordIsNotValid && <p style={{color: 'red'}}>Password is not valid</p>}
      {passwordIsValid && <p style={{color: 'green'}}>Password was changed successfully</p>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
