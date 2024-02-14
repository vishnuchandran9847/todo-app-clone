import React, { useState, useEffect, useRef } from "react";
import "../../assets/Css/Custom.css";
import vector from "../../assets/Images/Vector.png";
// import icon1 from "../../assets/Images/grommet-icons_google.png";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { database } from "../firebase";
import { ref, push, set, onValue, update } from "firebase/database";

function DashBoard() {
  const [Titles, setTitles] = useState("");
  const [Description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [filterShow, setFilterShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const craeteTodo = (e) => {
    e.preventDefault();
    if (Titles === "") {
      alert("please Enter a title !");
    }
    if (Description === "") {
      alert("please Enter a Description !");
    }

    const todosRef = ref(database, "todo-app"); 
    const newTodoRef = push(todosRef);

    set(newTodoRef, {
      title: Titles,
      description: Description,
      is_completed: 0,
      is_favorited: 0,
      is_deleted: 0,
    });

   
    setTitles("");
    setDescription("");
  };

  useEffect(() => {
    
    const todosRef = ref(database, "todo-app"); // Adjust the path as needed

    const fetchData = () => {
      onValue(todosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTodos(data);
          Object.entries(data).map(([key, value]) => {
            console.log(key, value);
           
          });
        }
      });
    };

    fetchData();

    update(todosRef, {
      [""]: {
        title: "",
        description: "",
        is_completed: 0,
        is_favorited: 0,
        is_deleted: 0,
      },
    });

  
  }, []);

  const filterClick = () => {
    setFilterShow((prevFilterShow) => !prevFilterShow);
  };
 

  const dots = (todo) => {
    setSelectedTodo(todo);
    
  };

  
  
  const onDelete = (id) => {
    const updatedTodos = { ...todos };
    delete updatedTodos[id];
    setTodos(updatedTodos);
  };







  return (
    <div>
      <div className="grid sm:grid-cols-2 sm:gap-4 grid-rows-2">
        <div class="right">
          <img className="ml-10 mt-12" src={vector} alt="logo" />
          <div className="flex flex-col justify-center items-center mt-32">
            <div className="">
              <h4 className="font-bold text-lg">TODO</h4>
            </div>
            <div className="mt-3">
              <h6 className="font-medium text-sm text-black/55  max-w-xs text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
                feugiat vitae faucibus nibh dolor dui.
              </h6>
            </div>

            <form onSubmit={craeteTodo} className="w-[230px] mt-4 mb-4">
              <input
                type="text"
                placeholder="Title.."
                value={Titles}
                onChange={(e) => setTitles(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-200 mb-2 "
              />
              <input
                type="text"
                placeholder="Description.."
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-200"
              />
              <div className="flex justify-center items-center mt-4">
                <button className="bg-blue-900 text-white py-1 px-12 ">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="left">
          <div className="sm:ml-6 sm:py-6 font-bold text-center pt-6">TODO LIST</div>

          <div className="ml-6 py-2 flex flex-row items-center justify-between pr-5">
            <form className="sm:w-[238px] w-[190px] relative">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search anything.."
                  className="w-full p-2 rounded-lg bg-slate-200"
                  
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-slate-200 rounded-full">
                  <CiSearch />
                </button>
              </div>
            </form>

            <div className="relative inline-block text-left">
              <button
                className=" text-black border border-black font-semibold py-2 px-4 rounded inline-flex items-center"
                onClick={filterClick}
              >
                <span>Filter By</span>
                <IoIosArrowDown />
              </button>
              {filterShow ? (
                <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <a
                      onClick={() => setFilter("all")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      All
                    </a>
                    <a
                      onClick={() => setFilter("completed")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Completed
                    </a>
                    <a
                      onClick={() => setFilter("favorited")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Favourited
                    </a>
                    <a
                      onClick={() => setFilter("deleted")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Deleted
                    </a>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>


          <div className="mt-32">
  
            {Object.entries(todos).map(([key, value]) => (
              <>
                {filter == "all" && (
                  <>
                    <div className="flex flex-row justify-between px-5">
                      <div className=" flex flex-col justify-between">
                        <div className="mt-4 font-semibold">
                          {value["title"]}
                        </div>
                        <div className="font-light">{value["description"]}</div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <BsThreeDotsVertical onClick={() => dots(value)} />

                          {selectedTodo === value && (
                            <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                
                                <a
                                  // onClick={() => setFilter("completed")}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  Completed
                                </a>
                                <a
                                  // onClick={() => setFilter("favorited")}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  Favourited
                                </a>
                                <a
                                  
                                  // id="delete"
                                  //  onClick={() => onDelete(key)}
                                  onClick={() => onDelete(key)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  Deleted
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <hr />
                  </>
                )}
                {filter === "favorite" && value["is_favorited"] === 1 && (
                  <>
                    <div className="flex flex-row justify-between px-5">
                      <div className=" flex flex-col justify-between">
                        <div className="mt-4 font-semibold">
                          {value["title"]}
                        </div>
                        <div className="font-light">{value["description"]}</div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    </div>

                    <hr />
                  </>
                )}
                {filter === "deleted" && value["is_deleted"] === 1 && (
                  <>
                    <div className="flex flex-row justify-between px-5">
                      <div className=" flex flex-col justify-between">
                        <div className="mt-4 font-semibold">
                          {value["title"]}
                        </div>
                        <div className="font-light">{value["description"]}</div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    </div>

                    <hr />
                  </>
                )}
                {filter === "completed" && value["is_completed"] === 1 && (
                  <>
                    <div className="flex flex-row justify-between px-5">
                      <div className=" flex flex-col justify-between">
                        <div className="mt-4 font-semibold">
                          {value["title"]}
                        </div>
                        <div className="font-light">{value["description"]}</div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <BsThreeDotsVertical />
                        </div>
                      </div>
                    </div>

                    <hr />
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
