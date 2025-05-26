// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const initialState = {
// 	userName: "",
// 	email: "",
// 	password: "",
// };

// function AuthRegister() {
// 	const [formData, setFormData] = useState(initialState);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	function onSubmit(event) {
// 		event.preventDefault();
// 		dispatch(registerUser(formData)).then((data) => {
// 			if (data?.payload?.success) {
// 				toast.success(data?.payload?.message);
// 				console.log(data)
// 				navigate("/auth/login");
// 			} else {
// 				toast.error(data?.payload?.message);
// 			}
// 		});
// 	}

// 	console.log(formData);

// 	return (
// 		<div className="mx-auto w-full max-w-md space-y-6">
// 			<div className="text-center">
// 				<h1 className="text-3xl font-bold tracking-tight text-foreground">
// 					Create new account
// 				</h1>
// 				<p className="mt-2">
// 					Already have an account?
// 					<Link
// 						className="font-medium ml-1 text-primary hover:underline"
// 						to="/auth/login"
// 					>
// 						Login
// 					</Link>
// 				</p>
// 			</div>
// 			<CommonForm
// 				formControls={registerFormControls}
// 				buttonText={"Sign Up"}
// 				formData={formData}
// 				setFormData={setFormData}
// 				onSubmit={onSubmit}
// 			/>
// 		</div>
// 	);
// }

// export default AuthRegister;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Mail, LockKeyhole, User } from "lucide-react";
import { registerUser } from "@/store/auth-slice";
import "./css/AuthLogin.css";

const initialState = { userName: "", email: "", password: "" };

export default function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then(({ payload }) => {
      if (payload.success) {
        toast.success(payload.message);
        navigate("/auth/login");
      } else {
        toast.error(payload.message);
      }
    });
  }

  return (
    <>
      <div className="blob"></div>
      <div className="wrapper">
        <form onSubmit={onSubmit}>
          <h2>Create Account</h2>

          <div className="input-box">
            <span className="icon">
              <User width="24px" height="24px" />
            </span>
            <input
              type="text"
              name="userName"
              required
              value={formData.userName}
              onChange={onChange}
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <Mail width="24px" height="24px" />
            </span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <LockKeyhole width="24px" height="24px" />
            </span>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={onChange}
            />
            <label>Password</label>
          </div>

          <button type="submit">Sign Up</button>

          <div className="register-link">
            <p>
              Already have an account?
              <Link className="font-medium ml-1 text-primary hover:underline" to="/auth/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}