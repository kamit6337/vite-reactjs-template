import formatUTCDate from "@/utils/javascript/formatUTCDate";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteTodo from "./DeleteTodo";
import TodoDetails from "./TodoDetails";
import UpdateTodo from "./UpdateTodo";
import { TODO } from "@/types";

const SearchTodos = ({ todos }: { todos: TODO[] }) => {
  return (
    <div className="border border-my_gray rounded-md p-3 space-y-5">
      <p className="bg-todo_header py-1 px-3 font-semibold text-my_white text-xl rounded uppercase ">
        Search Todos
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
        {todos.map((todo: TODO) => {
          const { _id: id, title, description, createdAt, status } = todo;

          return (
            <div
              key={id}
              className="bg-todo_bg p-3 text-my_black rounded-md h-52 flex flex-col justify-between"
            >
              <div className="flex justify-between">
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{title}</p>
                  <p>{description}</p>
                </div>
                {status === "pending" && (
                  <p className="bg-my_red px-3 py-2 rounded-md h-max text-my_white capitalize">
                    {status}
                  </p>
                )}
                {status === "progress" && (
                  <p className="bg-yellow-500 px-3 py-2 rounded-md h-max text-my_white capitalize">
                    {status}
                  </p>
                )}
                {status === "done" && (
                  <p className="bg-green-500 px-3 py-2 rounded-md h-max text-my_white capitalize">
                    {status}
                  </p>
                )}
              </div>
              <p className="-mb-10 text-sm">
                Created at: {formatUTCDate(createdAt)}
              </p>
              <div className="text-sm text-my_white gap-1 flex justify-end items-end">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="bg-delete_btn todo_btn">Delete</button>
                  </AlertDialogTrigger>
                  <DeleteTodo id={id} />
                </AlertDialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-edit_btn todo_btn">Edit</button>
                  </DialogTrigger>
                  <UpdateTodo id={id} />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-detail_btn todo_btn">
                      View Details
                    </button>
                  </DialogTrigger>
                  <TodoDetails id={id} />
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTodos;
