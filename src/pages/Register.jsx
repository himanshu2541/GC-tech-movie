import React from "react";
import { useForm } from "react-hook-form";
import { Heading1, Input, Button } from "../components";
import { Link } from "react-router-dom";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <>
      <img
        src="/register.jpg"
        alt="movie banner background"
        className="absolute top-0 left-0 w-full h-full object-cover transition blur-[1px]"
      />
      <div className="bg-gradient-to-r from-black to-transparent w-full h-full absolute top-0 left-0" />

      <div className="absolute  w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="flex flex-col gap-4 p-8 backdrop-blur-[5px] w-[90%] md:w-4/6 lg:w-1/3 rounded-md border-[1px] border-white/30 text-white">
          <Heading1 title="Welcome to KGPLAY" subtitle="Register" center  subTitleStyles="text-neutral-50 text-xl"/>
          <Input
            id="name"
            label="Name"
            type="text"
            required
            register={register}
            errors={errors}
            inputStyles={'bg-transparent'}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            required
            register={register}
            errors={errors}
            inputStyles={'bg-transparent'}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            register={register}
            errors={errors}
            inputStyles={'bg-transparent'}
          />
          <Button
            label="Register"
            onClick={handleSubmit((data) => console.log(data))}
          />
          <hr />
          <div className="text-center">
            <span className="text-white font-normal">Already have an account? </span>
            <Link to='/login' className="text-red-50 font-medium hover:underline">Login</Link>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Register;
