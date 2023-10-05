import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import LogoutButton from "./LogoutButton";
import { FaEnvira as LogoIcon } from "react-icons/fa";
const NavBar = () => {
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  // console.log(user)
  return (
    <>
      <header>
        <nav>
          <div id="logo">
            <p>
              <span>
                <LogoIcon />
              </span>
              Izaan
            </p>
          </div>
          <ul>
            {userAuth?.role === "admin" ? (
              <li>
                <Link to="/users">Users</Link>
              </li>
            ) : null}
            {token ? null : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {token ? null : (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {userAuth?.role === "admin" ? (
              <li>
                <Link to="/create_task">Create</Link>
              </li>
            ) : null}
            {userAuth?.role === "admin" ? (
              <li>
                <Link to="/all_tasks">Tasks</Link>
              </li>
            ) : null}
            {userAuth?.role ==="user" ? (
              <li>
                <Link to="assigned_task">Assigned</Link>
              </li>
            ) : null}
             {userAuth?.role ==="user" ? (
              <li>
                <Link to="accepted_task">Accepted</Link>
              </li>
            ) : null}
            {userAuth?.role ==="user" ? (
              <li>
                <Link to="approved_task">Approved</Link>
              </li>
            ) : null}
             {!token ? null : (
              <li>
                <Link to="/edit">Edit</Link>
              </li>
            )}
            {token ? (
              <li>
                <LogoutButton />
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
