import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = ``;
    }
    const path = location.pathname.replace("/", "-");
    const capitalizedRoute =
      path.slice(0, 1) + path.charAt(1).toUpperCase() + path.slice(2);
    document.title = `Firebase${capitalizedRoute}`;
  }, [location]);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <li>
            <NavLink to={`/`}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`/login`}>Login</NavLink>
          </li>
          <li>
            <NavLink to={`/register`}>Register</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default App;
