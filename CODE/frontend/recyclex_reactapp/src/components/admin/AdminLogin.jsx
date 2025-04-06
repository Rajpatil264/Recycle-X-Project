import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../../styles/adminStyles/AdminLogin.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/admin/signin",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const resData = response.data;
        if (resData?.status === "success") {
          sessionStorage.setItem("adminId", resData.data.adminId);
          navigate("/admin/dashboard");
        } else {
          alert(resData?.message ?? "Invalid email or password.");
        }
      } catch (error) {
        console.error("Error signing in:", error);

        if (error.response) {
          alert(error.response.data?.message ?? "Authentication failed.");
        } else if (error.request) {
          alert("Server is not responding. Please try again later.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSide}>
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${errors.email ? styles.error : ""}`}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${errors.password ? styles.error : ""}`}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className={styles.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          {/* Forgot Password */}
          <p className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          {/* Register Link */}
          <p className={styles.registerLink}>
            Don’t have an account?{" "}
            <Link to="/admin/register">Click here to register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
