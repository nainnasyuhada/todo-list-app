import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Todo, useTodoStore } from "../../stores/todo";
import { useForm, SubmitHandler } from "react-hook-form";

const statusList = [
  { label: "To Do", value: "TO_DO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

type FormInputs = {
  title: string;
  desc: string;
  status: Todo["status"];
};

export const EditTodo: React.FC<{ data: Todo }> = ({ data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: data.title,
      desc: data.desc,
      status: data.status,
    },
    mode: "all",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const editTodo = useTodoStore((state) => state.editTodo);

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const updatedTodo = {
      ...formData,
      updatedAt: new Date(),
    };

    editTodo(data.id, updatedTodo);
    closeModal();
  };

  return (
    <>
      <div className="border border-gray-500 rounded-full p-1 hover:bg-gray-500 hover:text-white">
        <PencilIcon
          className="size-4 cursor-pointer text-gray-500 hover:text-white"
          onClick={openModal}
        />
      </div>

      {isOpen && (
        <div
          id="edit-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="bg-white rounded-lg shadow p-10">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit To-Do
              </h3>

              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mb-5">
                  {/* Title */}
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-900 "
                  >
                    Title
                  </label>
                  <div className="my-2">
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
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label
                    htmlFor="desc"
                    className="text-sm font-medium text-gray-900 mb-2"
                  >
                    Description
                  </label>
                  <div className="my-2">
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
                </div>

                {/* Status */}
                <div className="mb-5">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-900 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="block w-full my-2 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("status", {
                      required: "Status is required",
                    })}
                  >
                    {statusList.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <button
                  type="submit"
                  disabled={
                    Object.keys(errors).length > 0 ||
                    !watch("title") ||
                    !watch("desc") ||
                    !watch("status")
                  }
                  className="text-white bg-blue-500 w-full rounded p-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-full py-2.5 px-5 mt-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
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
