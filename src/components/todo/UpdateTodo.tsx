import { DialogClose, DialogContent } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { patchReq } from "@/utils/api/api";
import Loading from "@/lib/Loading";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosState, updateTodo } from "@/redux/slice/exampleSlice";
import { TODO } from "@/types";
import DateAndTimePicker from "./DateAndTimePicker";
import { formatISO } from "date-fns";

const schema = z.object({
  title: z.string().min(1, "Please provide title"),
  description: z.string().min(1, "Please provide description"),
});

const UpdateTodo = ({ id }: { id: string }) => {
  const { todos } = useSelector(todosState);
  const dispatch = useDispatch();
  const { showErrorMessage } = Toastify();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [dueDate, setDueDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (id && todos.length > 0) {
      const findTodo = todos.find((todo: TODO) => todo._id === id);

      reset({
        title: findTodo?.title,
        description: findTodo?.description,
      });
      setDueDate(new Date(findTodo?.dueDate as Date) || new Date());
    }
  }, [id, reset, todos]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formattedDueDate = formatISO(dueDate);
      const dataToSend = { ...values, id, dueDate: formattedDueDate };
      const response = await patchReq("/todos", dataToSend);
      dispatch(updateTodo(response));
      closeBtnRef.current?.click();
      reset();
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
      <DialogContent className="w-96 h-[500px] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div className="space-y-5">
            <p className="text-lg font-semibold text-my_black">Edit task</p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-500 ">
                  Title
                </label>
                <input
                  id="title"
                  {...register("title")}
                  className="border-b outline-none border-gray-300 text-black w-full py-1"
                  placeholder="title"
                />
                {errors.title?.message && (
                  <p className="input_error">{errors.title.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="decription" className="text-gray-500">
                  Description
                </label>
                <textarea
                  id="decription"
                  {...register("description")}
                  className="border-b outline-none border-gray-300 text-black w-full py-1"
                  placeholder="description"
                  rows={3}
                />
                {errors.description?.message && (
                  <p className="input_error">{errors.description.message}</p>
                )}
              </div>
            </div>
            <DateAndTimePicker
              currentDate={dueDate}
              handleDateChange={(date: Date | null) =>
                date ? setDueDate(date) : null
              }
            />
          </div>

          <div className="flex justify-end items-end gap-3 text-my_black">
            <button
              className="todo_save_btn"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Loading /> : "Save"}
            </button>
            <DialogClose asChild>
              <button className="todo_cancel_btn" ref={closeBtnRef}>
                Close
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
      <ToastContainer />
    </>
  );
};

export default UpdateTodo;
