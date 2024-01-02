import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [stickyList, setStickyList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [notesId, setNotesId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [bgColor, setBgColor] = useState(null);

  const addNotes = (e) => {
    e.preventDefault();
    if (title.trim() == "") return;
    if (message.trim() == "") return;
    let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    setStickyList((prev) => [
      { id: Date.now(), title: title, message: message, bgColor: randomColor },
      ...prev,
    ]);
    setTitle("");
    setMessage("");
    setBgColor(null);
  };
  console.log(stickyList);

  useEffect(() => {
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes && storedNotes.length > 0) {
      setStickyList(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(stickyList));
  }, [stickyList]);

  const deleteNotes = (id) => {
    setStickyList((prev) => prev.filter((item) => item.id !== id));
  };

  const editNotes = (id, title, message) => {
    setIsEditable(true);
    setNotesId(id);
    setEditTitle(title);
    setEditMessage(message);
  };

  const updateNotes = () => {
    if (isEditable && notesId) {
      setStickyList((prev) =>
        prev.map((item) =>
          item.id == notesId
            ? { ...item, title: editTitle, message: editMessage }
            : item
        )
      );
      setIsEditable(false);
    }
  };

  return (
    <>
      <div className="container-main p-10">
        <div className="header">
          <h1 className="text-left mx-5 text-4xl font-bold py-6 mb-3">Notes</h1>
        </div>
        <div className="wrapper flex justify-between flex-wrap ">
          <div className="left shadow-lg rounded-lg bg-slate-200 w-full lg:w-3/12 p-6  mb-3 mx-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              id=""
              className="bg-transparent text-wrap break-words w-full py-2 outline-none text-2xl"
            />
            <textarea
              name=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Take a note..."
              id=""
              cols="30"
              rows="10"
              className="bg-transparent w-full py-2 outline-none"
            ></textarea>

            <button
              type="submit"
              className="block bg-slate-300 rounded-md p-1  text-white "
              onClick={addNotes}
            >
              ➕
            </button>
          </div>

          <div className="right flex flex-wrap m-5 gap-6">
            {stickyList.length > 0 &&
              stickyList.map((item) => (
                <div
                  key={item.id}
                  style={{backgroundColor: `${item.bgColor}`}}
                  class={` shadow-lg rounded-lg w-full lg:w-1/5 md:w-4/12  p-6 `}
                >
                  <div class="text-left">
                    {isEditable && notesId == item.id ? (
                      <input
                        type="text"
                        name=""
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        // placeholder="Title"
                        id=""
                        className="bg-transparent w-full py-2 outline-none text-2xl"
                      />
                    ) : (
                      <div className="block">
                        <h3 className="text-xl text-slate-500 block font-bold">
                          {item.title}
                        </h3>
                      </div>
                    )}

                    {isEditable && notesId == item.id ? (
                      <textarea
                        name=""
                        // placeholder="Take a note..."
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        id=""
                        cols="30"
                        rows="10"
                        className="bg-transparent w-full py-2 outline-none"
                      ></textarea>
                    ) : (
                      <div className="bg-transparent w-full py-2 outline-none">
                        {item.message}
                      </div>
                    )}
                  </div>
                  <div class="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span>May 21,2023</span>
                    <button
                      className="bg-slate-300 py-2 rounded-md p-1 w-2/12 text-white"
                      onClick={() =>
                        editNotes(item.id, item.title, item.message)
                      }
                    >
                      📝
                    </button>
                    {isEditable && notesId === item.id && (
                      <button
                        className="bg-slate-300 py-2 rounded-md p-1 w-2/12 text-white"
                        onClick={updateNotes}
                      >
                        ✔️
                      </button>
                    )}

                    <button
                      className="bg-slate-300 py-2 rounded-md p-1 w-2/12 text-white"
                      onClick={() => deleteNotes(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
