import React, { useEffect, useState } from "react";
import { Todo, useTodoStore } from "../../stores/todo";
import { DeleteTodo } from "./delete";
import { EditTodo } from "./edit";
import Moment from "react-moment";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { AddTodo } from "./add";

const StatusBadge = ({ status }: { status: string }) => {
  let text = "";
  let style = "";

  switch (status) {
    case "TO_DO":
      text = "To Do";
      style = "bg-gray-100 text-gray-800";
      break;
    case "IN_PROGRESS":
      text = "In Progress";
      style = "bg-yellow-100 text-yellow-800";
      break;
    case "COMPLETED":
      text = "Completed";
      style = "bg-green-100 text-green-800";
      break;
    case "CANCELLED":
      text = "Cancelled";
      style = "bg-red-100 text-red-800";
      break;
    default:
      break;
  }

  return (
    <span className={`${style} text-xs font-medium px-2.5 py-1 rounded`}>
      {text}
    </span>
  );
};

export const ViewTodo: React.FC = () => {
  const todoList = useTodoStore((state) => state.todos);
  const pageLimit = 10;
  const [totalPage, setTotalPage] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const openModal = (todo: Todo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedTodo(null);
  };

  const header = [
    {
      key: "status",
      value: "Status",
      width: "1/2",
    },
    {
      key: "title",
      value: "Title",
      width: "",
    },
    {
      key: "desc",
      value: "Description",
      width: "",
    },
    {
      key: "action",
      value: "Action",
      width: "",
    },
  ];

  useEffect(() => {
    setTotalPage(Math.ceil(todoList.length / pageLimit));
  }, [todoList]);

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
  };

  const paginatedTodos = todoList.slice(
    (selectedPage - 1) * pageLimit,
    selectedPage * pageLimit
  );

  return (
    <>
      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right shadow-md sm:rounded-lg table-auto">
          <thead className="uppercase bg-gray-50 text-xs text-gray-700">
            <tr className="text-left">
              {header.map((item) => (
                <th scope="col" className={`px-6 py-3`} key={item.key}>
                  {item.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.length > 0 ? (
              paginatedTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className="odd:bg-white even:bg-gray-50 hover:odd:bg-gray-100 hover:even:bg-gray-200 cursor-pointer"
                  onClick={(e) => {
                    if (
                      (e.target as HTMLElement).closest("td") &&
                      ["status", "title", "desc", "action"].some((column) =>
                        (e.target as HTMLElement)
                          .closest("td")
                          ?.classList.contains(`enable-view`)
                      )
                    ) {
                      openModal(todo);
                    }
                  }}
                >
                  <td className="px-6 py-3 enable-view">
                    <StatusBadge status={todo.status} />
                  </td>
                  <td className="px-6 py-3 enable-view">{todo.title}</td>
                  <td className="px-6 py-3 enable-view">{todo.desc}</td>
                  <td
                    className={`px-6 py-3 ${
                      ["COMPLETED", "CANCELLED"].includes(todo.status)
                        ? "enable-view"
                        : ""
                    }`}
                  >
                    {["IN_PROGRESS", "TO_DO"].includes(todo.status) && (
                      <div className="flex items-center gap-2">
                        <EditTodo data={todo} />
                        <DeleteTodo id={todo.id} />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              // Empty List
              <td colSpan={4} className="py-5">
                <div className="flex flex-col items-center gap-3 py-5">
                  <DocumentPlusIcon className="h-6 w-6 text-gray-500" />
                  <text>Get started by creating a new to-do.</text>
                  <AddTodo />
                </div>
              </td>
            )}
          </tbody>
        </table>
        {paginatedTodos.length > 0 && (
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {(selectedPage - 1) * pageLimit + 1}-
                {Math.min(selectedPage * pageLimit, todoList.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">
                {todoList.length}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => handlePageChange(selectedPage - 1)}
                  disabled={selectedPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPage }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                      selectedPage === index + 1 ? "bg-gray-200" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => handlePageChange(selectedPage + 1)}
                  disabled={selectedPage === totalPage}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal */}
      {isOpen && selectedTodo !== null && (
        <div
          id="view-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="bg-white rounded-lg shadow p-10">
              <h3 className="text-lg font-semibold text-gray-900 ">
                View To-Do
              </h3>
              <div className="grid grid-cols-2 gap-4 my-10">
                <text className="font-semibold text-gray-500">Title</text>
                <text className="break-words">{selectedTodo.title}</text>
                <text className="font-semibold text-gray-500">Description</text>
                <text className="break-words">{selectedTodo.desc}</text>
                <text className="font-semibold text-gray-500">Created At</text>

                <Moment format="DD MMM YYYY HH:mm">
                  {selectedTodo.createdAt}
                </Moment>

                <text className="font-semibold text-gray-500">Updated At</text>
                {selectedTodo.updatedAt ? (
                  <Moment format="DD MMM YYYY HH:mm">
                    {selectedTodo.updatedAt}
                  </Moment>
                ) : (
                  "-"
                )}

                <text className="font-semibold text-gray-500">Status</text>

                <div className="w-75">
                  <StatusBadge status={selectedTodo.status} />
                </div>
              </div>
              <button
                data-modal-hide="view-modal"
                type="button"
                className="w-full py-2.5 px-5 text-sm font-medium text-blue-500 border border-blue-500 focus:outline-none bg-white rounded-lg hover:bg-black-100 hover:text-black-500 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-black-100 "
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
