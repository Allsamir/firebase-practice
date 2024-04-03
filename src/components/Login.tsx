import React, { useRef, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { Link } from "react-router-dom";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Login: React.FC = () => {
  const auth = getAuth(app);
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        (e.target as HTMLFormElement).reset();
        user.emailVerified
          ? setMessage("Successfully verified and Login")
          : setMessage("Please Verify your email");
        // ...
      })
      .catch((error) => {
        console.error(error);
        setMessage("Something went wrong! Check password");
      });
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgetPassword = () => {
    if (!emailRef.current?.value) {
      setMessage("Provide your Email First");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        emailRef.current.value
      )
    ) {
      setMessage("Provide a valid email");
      return;
    }

    sendPasswordResetEmail(auth, emailRef.current.value)
      .then((result) => {
        setMessage("Successfully a password reset email sent!");
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn} style={{ marginRight: "1rem" }}>
            Sign In with Google
          </button>
          <button onClick={handleGithubSignIn}>Sign In with Github</button>
        </>
      )}

      {user && (
        <div>
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
          <img src={user.photoURL || ""} alt={`${user.displayName}'name`} />
        </div>
      )}

      <div>
        <p className="mt-12">
          New to Website ? <Link to={`/register`}>Register Now</Link>
        </p>
      </div>

      <div className="hero min-h-screen bg-base-200 my-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={`${passwordVisible ? "text" : "password"}`}
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                    name="password"
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
                  <a
                    href="#"
                    onClick={handleForgetPassword}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {message && (
              <p
                className={`${
                  message.includes("Successfully")
                    ? "text-green-500"
                    : "text-red-600"
                } py-4`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
