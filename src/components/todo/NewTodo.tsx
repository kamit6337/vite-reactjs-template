import { DialogClose, DialogContent } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { postReq } from "@/utils/api/api";
import Loading from "@/lib/Loading";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleTodos } from "@/redux/slice/exampleSlice";
import DateAndTimePicker from "./DateAndTimePicker";
import { formatISO } from "date-fns";

const schema = z.object({
  title: z.string().min(1, "Please provide title"),
  description: z.string().min(1, "Please provide description"),
});

const NewTodo = () => {
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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formattedDueDate = formatISO(dueDate);

      const dataToSend = { ...values, dueDate: formattedDueDate };

      const response = await postReq("/todos", dataToSend);
      dispatch(addSingleTodos(response));

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
            <p className="text-lg font-semibold text-my_black">Add task</p>
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
                <label htmlFor="decription" className="text-gray-500 ">
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

export default NewTodo;
