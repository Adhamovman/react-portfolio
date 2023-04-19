import React from "react";
import { useForm } from "react-hook-form";

import { TOKEN, USER } from "../../const";
import { toast } from "react-toastify";
import "./Login.scss";
import Navbar from "../../components/layout/front/Navbar";
import { sendData } from "../../server/common";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    sendData("auth/login", values)
      .then((response) => {
        localStorage.setItem(TOKEN, response.data.token);
        localStorage.setItem(USER, JSON.stringify(response.data));
        if (response.data.user.role !== "user") {
          toast.success("Muvaffaqqiyatli kirildi");
          window.location.href = "/dashboard";
        } else {
          toast.info("Sizga kirish uchun ruxsat berilmagan!");
        }
      })
      .catch(() => {
        toast.error("Noto'g'ri ma'lumot kiritildi!");
      });
  };

  return (
    <>
      <div className="loginContainer">
        <Navbar />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginForm d-flex flex-column"
          action="#"
        >
          <div className="brand-logo"></div>
          <div className="brand-title text-center">WELCOME!</div>
          <div className="inputs">
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Username"
            />
            <p className="loginError">{errors.username?.message}</p>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
            />
            <p className="loginError">{errors.password?.message}</p>
            <button type="submit" className="btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
