import React from "react";
import { useForm } from "react-hook-form";
import { Heading1, Input, Button } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const REGISTER_URL = "user/register";
const NAME_REGEX = /^[a-zA-Z]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .trim()
      .min(3, "Name must be at least 3 characters")
      .regex(NAME_REGEX, {
        message: "Name must only contain letters",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email",
      })
      .trim()
      .email(),

    password: z
      .string()
      .trim()
      .min(8, "Password too short")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const submitRegisterData = async (data) => {
    try {
      const response = await axios.post(
        `${REGISTER_URL}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const token = response?.data?.token;
      const user = response?.data?.user;

      setAuth({ token, user });
      Cookies.set("token", token, { secure: true });

      // console.log(auth);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      if (error.response.status === 409) {
        setError("email", {
          type: "manual",
          message: "Email is already taken",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
      {/* <img
        src="/register.jpg"
        alt="movie banner background"
        className="absolute top-0 left-0 w-full h-full object-cover transition blur-[1px]"
      /> */}
      <div className="bg-gradient-to-r from-black to-transparent w-full h-full absolute top-0 left-0" />

      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="flex flex-col gap-4 p-8 backdrop-blur-[5px] w-[90%] md:w-4/6 lg:w-2/5 rounded-md border-[1px] border-white/30 text-white">
          <Heading1
            title="Welcome to KGPLAY"
            subtitle="Register"
            center
            subTitleStyles="text-neutral-50 text-xl"
          />

          {errors.root && (
            <p className="text-red-300 text-center">{errors.root.message}</p>
          )}

          <form
            id="register-form"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitRegisterData)}
          >
            <Input
              id="name"
              label="Name"
              type="text"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Input
              id="email"
              label="Email"
              type="text"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Loading..." : "Register"}
              type="submit"
            />
          </form>

          <hr />
          <div className="text-center">
            <span className="text-white font-normal">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-red-50 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
