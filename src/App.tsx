import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
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
