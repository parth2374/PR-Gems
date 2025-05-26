// import CommonForm from "@/components/common/form";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();

//   function onSubmit(event) {
//     event.preventDefault();

//     dispatch(loginUser(formData)).then((data) => {
// 			console.log(data)
//       if (data?.payload?.success) {
//         toast.success(data?.payload?.message);
//       } else {
//         toast.error(data?.payload?.message);
//       }
//     });
//   }

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Sign in to your account
//         </h1>
//         <p className="mt-2">
//           Don't have an account?
//           <Link
//             className="font-medium ml-1 text-primary hover:underline"
//             to="/auth/register"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthLogin;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";
import "./css/AuthLogin.css";  // your CSS based on the demo
import { Mail, LockKeyhole } from "lucide-react";

const initialState = { email: "", password: "", remember: false };

export default function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then(({ payload }) => {
      payload.success
        ? toast.success(payload.message)
        : toast.error(payload.message);
    });
  }

  return (
    <div className="">
      <div className="blob"></div>
      <div className="wrapper">
        <form className="form" onSubmit={onSubmit}>
          <h2>Login</h2>

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

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={onChange}
              />{" "}
              Remember me
            </label>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don’t have an account? <a href="/auth/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}