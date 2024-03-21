import { Link } from "react-router-dom";
import { Heading1, Input, Button } from "../components";
import { useForm } from "react-hook-form";
const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full h-screen bg-primary-black grid grid-cols-3 overflow-hidden">
      <div className="bg-primary-red col-span-2 rounded-tr-[80px] rounded-br-[80px] shadow-xl shadow-primary-red/30 overflow-hidden">
        <img
          src="/login.jpg"
          alt="movie banner background"
          className="w-full h-full object-cover opacity-95 hover:opacity-100 transition "
        />
      </div>

      <div className=" col-span-1 w-full h-full">
        <div className="flex flex-col gap-4 p-12">
          <Heading1 title="Welcome to KGPLAY" subtitle="Sign In"  className={'text-white text-4xl'}/>
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required
          /> 
          <Button label={'Login'} onClick={handleSubmit((data) => console.log(data))} />
          <hr />
          <div className="text-center">
            <span className="text-neutral-500 font-normal">Don{"'"}t have an account? </span>
            <Link to='/register' className="text-primary-red font-medium hover:underline">Register</Link>
        </div>
        </div>
      </div>

      
    </div>
  );
};

export default Login;
