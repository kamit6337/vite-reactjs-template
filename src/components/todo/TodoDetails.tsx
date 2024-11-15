import { useSelector } from "react-redux";
import { DialogClose, DialogContent } from "../ui/dialog";
import { todosState } from "@/redux/slice/exampleSlice";
import { useMemo } from "react";
import { TODO } from "@/types";
import formatUTCDate from "@/utils/javascript/formatUTCDate";

const TodoDetails = ({ id }: { id: string }) => {
  const { todos } = useSelector(todosState);

  const todo = useMemo(() => {
    const findTodo = todos.find((todo: TODO) => todo._id === id);
    return findTodo;
  }, [todos, id]);

  return (
    <>
      <DialogContent className="w-96 h-[500px] ">
        <form className="h-full flex flex-col justify-between">
          <div className="space-y-5">
            <p className="text-lg font-semibold text-my_black">Task Details</p>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 ">
                <p>Title:</p>
                <p>{todo?.title}</p>
              </div>
              <div className="flex gap-2">
                <p>Description:</p>
                <p>{todo?.description}</p>
              </div>
              <div className="flex gap-2 text-sm text-red-400">
                <p>Completion time:</p>
                <p>{formatUTCDate(todo?.dueDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-end gap-3 text-my_black">
            <DialogClose asChild>
              <button className="todo_cancel_btn">Close</button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export default TodoDetails;
