import Header from "@/components/Header";
import useGetAllTodos from "@/hooks/useGetAllTodos";
import useLoginCheck from "@/hooks/useLoginCheck";
import Loading from "@/lib/Loading";
import { addAllTodos } from "@/redux/slice/exampleSlice";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isSuccess } = useLoginCheck();
  const [loadingTime, setLoadingTime] = useState(60);

  const {
    isLoading: getTodosIsLoading,
    error: getTodosError,
    data,
  } = useGetAllTodos(isSuccess);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // Start the loading timer only when either isLoading or getTodosIsLoading is true
    if (isLoading || getTodosIsLoading) {
      if (loadingTime === 0) return;

      interval = setInterval(() => {
        setLoadingTime((prev) => prev - 1);
      }, 1000);
    }

    // Clear the interval when loading finishes or component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [isLoading, getTodosIsLoading, loadingTime]);

  useEffect(() => {
    if (data) {
      dispatch(addAllTodos(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      navigate(`/login?msg=${error.message}`);
      return;
    }

    if (getTodosError) {
      navigate(`/login?msg=${getTodosError.message}`);
      return;
    }
  }, [error, navigate, getTodosError]);

  if (isLoading || getTodosIsLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Loading hScreen={false} small={false} />
        <p>{loadingTime} seconds remaining</p>
      </div>
    );
  }

  if (!isSuccess) return;

  return (
    <>
      <div className="h-16 w-full bg-dark_blue text-light_white">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
