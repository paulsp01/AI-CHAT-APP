import React, { useEffect, useState ,useContext} from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import Markdown from 'markdown-to-jsx'
import {
  initializeSocket,
  recieveMessage,
  sendMessage,
} from "../config/socket.js";

const Project = () => {
  const location = useLocation();

  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const messageBox = React.createRef()

  const {user}=useContext(UserContext);

  useEffect(() => {
    initializeSocket(project._id);

    recieveMessage("project-message", (data) => {
      console.log("recieve",data);
      appendIncomingMessage(data)
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
       

        setProject(res.data.project);
        // setFileTree(res.data.project.fileTree || {})
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send=() =>{
    console.log("user from project",user)
    sendMessage("project-message", {
      message,
      sender: user,
    });
    appendOutgoingMessage(message)
    //setMessages((prevMessages) => [...prevMessages, { sender: user, message }]); // Update messages state
    setMessage("");
  }


  function WriteAiMessage(message) {

    const messageObject = JSON.parse(message)

    return (
        <div
            className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
        >
            <Markdown
                children={messageObject.text}
                options={{
                    overrides: {
                        code: SyntaxHighlightedCode,
                    },
                }}
            />
        </div>)
}


function appendIncomingMessage(messageObj) {
  console.log("incoming", messageObj);
  
  const messageBox = document.querySelector(".message-box");
  const message = document.createElement("div");
  message.classList.add(
    "incoming",
    "message",
    "max-w-52",
    "flex",
    "flex-col",
    "p-2",
    "bg-slate-50",
    "rounded-md",
    "w-fit"
  );

  if(messageObj.sender._id=='ai'){
    const markDown=(<Markdown>{messageObj.message}</Markdown>)
    message.innerHTML = `
    <small class='opacity-70 text-xs'>${messageObj.sender.email}</small>
    <p class='text-sm'>${markDown}</p>
    `

  }else{

    // Create sender element
  const sender = document.createElement("small");
  sender.classList.add("opacity-70", "text-xs");
  sender.textContent = messageObj.sender.email;

  // Create message element
  const messageText = document.createElement("p");
  messageText.classList.add("text-sm");
  messageText.textContent = messageObj.message;

  // Apply word-break styles
  messageText.style.wordBreak = "break-word";
  messageText.style.overflowWrap = "break-word";


  }

  
  // Append elements
  message.appendChild(sender);
  message.appendChild(messageText);
  messageBox.appendChild(message);

  scrollToBottom()
}


function appendOutgoingMessage(message) {
  const messageBox = document.querySelector(".message-box");
  const newmessage = document.createElement("div");
  newmessage.classList.add(
    "outgoing",
    "message",
    "max-w-52",
    "ml-auto",
    "flex",
    "flex-col",
    "p-2",
    "bg-purple-200",
    "rounded-md",
    "w-fit"
  );

  // Create sender element
  const sender = document.createElement("small");
  sender.classList.add("opacity-70", "text-xs");
  sender.textContent = user.email;

  // Create message element
  const messageText = document.createElement("p");
  messageText.classList.add("text-sm");
  messageText.textContent = message;

  // Apply word-break styles
  messageText.style.wordBreak = "break-word";
  messageText.style.overflowWrap = "break-word";

  // Append elements
  newmessage.appendChild(sender);
  newmessage.appendChild(messageText);
  messageBox.appendChild(newmessage);
  scrollToBottom()
}

  
  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight
}

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-80 bg-slate-500">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0">
          <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1"></i>
            <p>Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
            className="p-2"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div   className="conversation-area  pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div ref={messageBox} className="message-box p-1 flex-grow flex flex-col gap-2 overflow-auto max-h-full scrollbar-hide">
            <div className="incoming message max-w-52 flex flex-col p-2 bg-slate-50 rounded-md w-fit ">
              <small className="opacity-70 text-xs">example@gmail.com</small>
              <p  style={{ wordBreak: "break-word", overflowWrap: "break-word" }} className="text-sm w-fit">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="outgoing message max-w-52 ml-auto flex flex-col p-2 bg-purple-200 rounded-md w-fit ">
              <small className="opacity-70 text-xs">example@gmail.com</small>
              <p  style={{ wordBreak: "break-word", overflowWrap: "break-word" }} className="text-sm w-fit">Lorem ipsum dolor sit amet000000oooooooooooooooooooooooooooooooooooooooooooo.</p>
            </div>
          </div>
          <div className="inputField  w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              placeholder="Enter Message"
            />
            <button onClick={send} className="px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${
            isSidepanelOpen ? "translate-x-0 z-20" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>

            <button
              onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
              className="p-2"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 ">
            {project.users?.map((user) => {
              return (
                <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center  bg-gray-400 rounded-md m-2">
                  <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
