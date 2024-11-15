import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deleteTodo, todosState } from "@/redux/slice/exampleSlice";
import { useMemo } from "react";
import { deleteReq } from "@/utils/api/api";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { TODO } from "@/types";

const DeleteTodo = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const { todos } = useSelector(todosState);
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const todo = useMemo(() => {
    if (!id || todos.length === 0) return { title: "" };
    const findTodo = todos.find((todo: TODO) => todo._id === id);
    return findTodo;
  }, [todos, id]);

  const handleDelete = async () => {
    try {
      const response = await deleteReq("/todos", { id });
      dispatch(deleteTodo(id));
      showSuccessMessage({ message: response.message });
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your want to delete your todo:{" "}
            <span className="font-semibold">{todo?.title}</span> <br />
            Once deleted cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <ToastContainer />
    </>
  );
};

export default DeleteTodo;
