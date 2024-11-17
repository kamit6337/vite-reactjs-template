import ReactIcons from "@/assets/icons";
import { NavLink } from "react-router-dom";

const AuthHeader = () => {
  return (
    <section className="h-full flex items-center justify-between px-5">
      <p className="text-3xl">
        <ReactIcons.notepad />
      </p>
      <div className="space-x-5">
        <NavLink
          to={`/login`}
          className={({ isActive }) =>
            isActive
              ? "bg-light_white p-2 px-3 rounded-lg text-dark_blue font-semibold tracking-wide"
              : ""
          }
        >
          Login
        </NavLink>
        <NavLink
          to={`/signup`}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-light_white p-2 px-3 rounded-lg text-dark_blue font-semibold tracking-wide"
              : ""
          }
        >
          Signup
        </NavLink>
      </div>
    </section>
  );
};

export default AuthHeader;
