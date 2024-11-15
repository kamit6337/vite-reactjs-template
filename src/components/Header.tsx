import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getAuthReq } from "@/utils/api/authApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();
  const { data: user } = useLoginCheck();

  const handleLogout = async () => {
    try {
      await getAuthReq("/logout");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center h-full px-10">
        <p className="text-3xl">
          <ReactIcons.notepad />
        </p>
        <div className="flex items-center gap-1">
          <div className="w-10">
            <img
              src={user.photo}
              alt={user.firstname}
              className="w-full rounded-full"
            />
          </div>
          <p className="font-semibold">{user.firstname}</p>
          <button
            className="bg-my_red p-2 rounded-md ml-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Header;
