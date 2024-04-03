import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const auth = getAuth(app);
  const [message, setMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const name = e.currentTarget.name.value;
    const password = e.currentTarget.password.value;
    const terms = e.currentTarget.terms.checked;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(
        password
      )
    ) {
      setMessage(
        "Your password should contain one Uppercase & Lowercase and any symbol and more than 8 character"
      );
      return;
    } else if (!terms) {
      setMessage("Please! Accept Our Terms and Condition");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then((result) => {
            setMessage("Successfully Registered");
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });

        (e.target as HTMLFormElement).reset();
        sendEmailVerification(user);
        user.emailVerified || setMessage("Please Verify your email");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };
  return (
    <>
      <div>
        <p>
          Already have account? <Link to={`/login`}>Login Now</Link>
        </p>
      </div>
      <div className="hero min-h-screen bg-base-200 my-12 py-12">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-1 bg-transparent"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {passwordVisible ? "🙈" : "👁️"}
                  </button>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-4 justify-start">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox"
                    name="terms"
                  />
                  <span className="label-text">
                    Accept Our Terms and Conditions
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            {message && (
              <p
                className={`py-4 ${
                  message.includes("Successfully")
                    ? "text-green-400"
                    : message.includes("Verify")
                    ? "text-yellow-400"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
