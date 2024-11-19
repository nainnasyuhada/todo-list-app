import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTodoStore } from "../../stores/todo";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type FormInputs = {
  title: string;
  desc: string;
};

export const AddTodo: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    mode: "all",
  });

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset();
  };
  const addTodo = useTodoStore((state) => state.addTodo);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100000),
      title: data.title,
      desc: data.desc,
      status: "TO_DO" as const,
      createdAt: new Date(),
      updatedAt: null,
    };

    addTodo(newTodo);
    closeModal();
  };

  return (
    <>
      <button
        className="block text-white bg-blue-500 font-medium rounded-md text-sm px-5 py-2.5 text-center flex items-center gap-2 hover:bg-blue-700"
        type="button"
        onClick={openModal}
      >
        <PlusCircleIcon className="h-6 w-6" />
        Add Todo
      </button>

      {isOpen && (
        <div
          id="add-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="bg-white rounded-lg shadow p-10">
              <h3 className="text-lg font-semibold text-gray-900">Add To-Do</h3>

              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`bg-gray-50 border ${
                      errors.title
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Insert title"
                    {...register("title", {
                      required: "Title is required",
                      maxLength: {
                        value: 25,
                        message: "Title must not exceed 25 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="desc"
                    rows={3}
                    className={`bg-gray-50 border ${
                      errors.desc
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Insert description"
                    {...register("desc", {
                      required: "Description is required",
                      maxLength: {
                        value: 100,
                        message: "Description must not exceed 100 characters",
                      },
                    })}
                  />
                  {errors.desc && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.desc.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    Object.keys(errors).length > 0 ||
                    !watch("title") ||
                    !watch("desc")
                  }
                  className="text-white bg-blue-500 w-full rounded p-2 hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="w-full py-2.5 px-5 mt-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 cursor-pointer"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
