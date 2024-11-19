import React, { useState } from "react";

import { useTodoStore } from "../../stores/todo";
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const DeleteTodo: React.FC<{ id: number }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleDelete = () => {
    deleteTodo(id);
    closeModal();
  };

  return (
    <>
      <div className="border border-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white">
        <TrashIcon
          className="size-4 cursor-pointer text-red-500 hover:text-white"
          onClick={() => {
            openModal();
          }}
        />
      </div>

      {isOpen && (
        <div
          id="delete-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full ">
            <div className="relative bg-white rounded-lg shadow p-10">
              <div className="flex items-center gap-4 ">
                <ExclamationCircleIcon className="w-10 h-10 text-red-600" />
                <h3 className=" text-lg font-normal text-gray-500">
                  Are you sure you want to delete this item?
                </h3>
              </div>
              <div className="w-full flex mt-10 justify-between">
                <button
                  data-modal-hide="delete-modal"
                  type="button"
                  className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleDelete}
                >
                  Confirm
                </button>
                <button
                  data-modal-hide="delete-modal"
                  type="button"
                  className="w-full py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
