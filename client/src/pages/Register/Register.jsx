import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Union.png";
import { registerUser } from "../../services/authService";

import styles from "./Register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تکرار رمز عبور یکسان نیستند.");
      return;
    }

    try {
      setError("");

      await registerUser({
        username: formData.username,
        password: formData.password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "ثبت نام انجام نشد.");
    }
  };

  return (
    <div className={styles.page} dir="rtl">
      <h1 className={styles.brand}>بوت کمپ بوتواستارت</h1>

      <div className={styles.card}>
        <img src={logo} alt="Union" className={styles.logo} />
        

        <h2 className={styles.title}>فرم ثبت نام</h2>

        <form className={styles.form} onSubmit={submitHandler}>
          <input
            type="text"
            name="username"
            placeholder="نام کاربری"
            value={formData.username}
            onChange={changeHandler}
          />

          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={changeHandler}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="تکرار رمز عبور"
            value={formData.confirmPassword}
            onChange={changeHandler}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            ثبت نام
          </button>
        </form>

        <button
          type="button"
          className={styles.link}
          onClick={() => navigate("/login")}
        >
          حساب کاربری دارید؟
        </button>
      </div>
    </div>
  );
}

export default Register;
