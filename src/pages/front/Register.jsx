import React from "react";
import { useForm } from "react-hook-form";
import { TOKEN, USER } from "../../const";
import { toast } from "react-toastify";
import Navbar from "../../components/layout/front/Navbar";
import { sendData } from "../../server/common";
import "./Login.scss";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    sendData("auth/register", values)
      .then((response) => {
        localStorage.setItem(TOKEN, response.data.token);
        localStorage.setItem(USER, JSON.stringify(response.data.user));
        toast.success("Muvaffaqqiyatli ro'yxatdan o'tdingiz!");
        window.location.href = "/login";
       
      })
      .catch(() => {
        toast.error("Ushbu foydalanuvchi allaqachon mavjud!");
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
              {...register("firstName", { required: "FirstName is required" })}
              type="text"
              placeholder="Firstname"
            />
            <p className="loginError">{errors.username?.message}</p>
            <input
              {...register("lastName", { required: "LastName is required" })}
              type="text"
              placeholder="Lastname"
            />
            <p className="loginError">{errors.username?.message}</p>
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
            <label className="d-flex gap-1 align-items-center ms-2">
              <input
                id="client"
                className="inputCheckbox"
                type="checkbox"
                {...register("client")}
              />
              Do you wonna create portfolio?
            </label>
            <button type="submit" className="btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
