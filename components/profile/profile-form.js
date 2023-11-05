import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const newPasswordInput = useRef();
  const oldPasswordInput = useRef();

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
    console.log(data);
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
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
