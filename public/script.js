const users = document.querySelector(".users");
const usersContainer = document.querySelector(".users-container");
const userToggle = document.querySelector(".user-toggle");
const userDetails = document.querySelector(".user-details");
const inputSection = document.querySelector(".input-section");
const chats = document.querySelector("#chats");
const notification = document.querySelector("#notification");

//
//
//
const socket = io();

var allUsersNameId = [];
var checkForExistance;

// function for toggle
function onUserToggle() {
  var list = Array.from(usersContainer.classList);
  // console.log(list.includes("click-user"));

  if (list.includes("click-user")) {
    usersContainer.classList.remove("click-user");
  } else {
    usersContainer.classList.add("click-user");
  }
}

// add event listener

userToggle.addEventListener("click", onUserToggle);

// function for user click event
var seperateMessage;
// function to create new added users
function createNewUsers(name, id) {
  const user = document.createElement("div");
  user.className = "user";
  user.innerHTML = `
              <div class="profile">
                <img
                  src="https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg"
                  alt="" />
              </div>
              <div class="name">
                <span>${
                  name === userName
                    ? `<h5>
                    <i>YOU :- </i>
                    </h5>
                    ${name}`
                    : `${name}`
                }</span>
              </div>
            `;

  // users click add event listner
  user.addEventListener("click", () => {
    // for display none
    usersContainer.classList.add("click-user");
    // all user div classes
    var userClassList = Array.from(user.classList);

    if (!userClassList.includes("active")) {
      // user dtails section
      //
      //

      // to remove the the active class from the previous selected user
      const allUser = document.querySelectorAll(".user");
      allUser.forEach((ele) => {
        ele.classList.remove("active");
      });

      // to null the inner html
      userDetails.innerHTML = "";
      // add the active class to show user is selcted
      user.classList.add("active");

      // create the selected user details
      const selectedUser = document.createElement("div");
      // inner html for selected user profile
      selectedUser.innerHTML = `
              <div class="profile">
                <img
                  src="https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg"
                  alt="" />
              </div>
              <div class="name">
                <span>${name}</span>
              </div>
            `;
      // adding class name user for styling as user
      selectedUser.className = "user";
      userDetails.appendChild(selectedUser);
      //
      // user details section end
      //

      // chat section
      //
      //
      function handleChatSection(msg, msgType) {
        console.log(msg, msgType);

        if (msgType == "send") {
          const sender = document.createElement("div");
          sender.className = "sender";
          sender.innerText = `${msg}`;
          chats.appendChild(sender);
        } else if (msgType == "recieve") {
          const reciever = document.createElement("div");
          reciever.className = "reciever";
          reciever.innerText = `${msg}`;

          chats.appendChild(reciever);
        }
        chats.scrollTop = chats.scrollHeight + 20;
        chats.addEventListener("scroll",()=>{
          console.log(chats.scrollTop , chats.scrollHeight);
          
        })
        
      }
      // all messages
      seperateMessage = () => {
        chats.innerHTML = "";
        allMessages.forEach((ele) => {
          if (
            (ele.senderId == senderId && ele.receiverId == id) ||
            (ele.senderId == id && ele.receiverId == senderId)
          ) {
            console.log(ele.senderId, senderId, ele.receiverId, id);

            if (ele.senderId == senderId && ele.receiverId == id) {
              handleChatSection(ele.msg, "send");
            } else if (ele.senderId == senderId) {
              handleChatSection(ele.msg, "send");
            } else if (ele.senderId == id) {
              handleChatSection(ele.msg, "recieve");
            }
          }
        });
      };
      seperateMessage();
      //
      // chat section

      //
      // input section
      //

      inputSection.innerHTML = "";
      const chatInput = document.createElement("div");
      chatInput.className = "chat-input";

      const input = document.createElement("input");
      input.setAttribute("placeholder", "Enter message here...");

      input.addEventListener("input", () => {
        let msg = input.value.trim();
        if (msg) {
          sendMsgBtn.style.opacity = 1;
        } else {
          sendMsgBtn.style.opacity = 0;
        }
      });

      input.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          let msg = input.value.trim();
          if (msg) {
            input.value = "";
            sendMsgBtn.style.opacity = 0;
            sendMessage(msg, id);
          }
        }
      });

      const sendMsgBtn = document.createElement("button");
      sendMsgBtn.innerHTML = "&rightarrow;";
      sendMsgBtn.className = "send-msg";
      sendMsgBtn.style.opacity = 0;

      sendMsgBtn.addEventListener("click", () => {
        let msg = input.value.trim();
        if (msg) {
          input.value = "";
          sendMsgBtn.style.display = "none";
          sendMessage(msg, id);
        }
      });

      chatInput.appendChild(input);
      chatInput.appendChild(sendMsgBtn);

      inputSection.appendChild(chatInput);
    }
  });

  users.appendChild(user);
}

// function for to check no any use selected
function checkUserSelection() {
  const activeUser = document.querySelector(".active");
  if (!activeUser) {
    chats.innerHTML = "<center><h1>Start messaging...</h1></center>";
  }
}
checkUserSelection();

// socket functions =>

const singleUsersName = new Set();
var userName;
var senderId;

socket.on("connect", async () => {
  console.log(socket.id);
  senderId = socket.id;

  // for getting user name
  userName = prompt("Enter your name");

  singleUsersName.add([senderId, userName]);

  // for emmiting the single user name
  socket.emit("singleUserName", Array.from(singleUsersName));
  console.log({ singleUsersName });
  alert("start messaging...");
});

// for getting all users name and there id's
socket.on("allUsersNameId", (allUsers) => {
  console.log({ allUsers });
  allUsersNameId = allUsers;

  users.innerHTML = "";
  console.log({ allUsersNameId });

  allUsersNameId.forEach((ele) => {
    createNewUsers(ele[1], ele[0]);
  });
});

//
// for sending the messages
function sendMessage(msg, id) {
  let message = {
    senderId: senderId,
    receiverId: id,
    msg: msg,
  };
  // send message
  socket.emit("chat", message);
}

const allMessages = [];

socket.on("message", (message) => {
  console.log(message.senderId);
  console.log("sound = >", message.senderId, message.receiverId);
  if (message.senderId != senderId) {
    notification.play();
  }
  allMessages.push(message);
  seperateMessage();
  // notification.pause();
});

// socket on disconnect
socket.on("disconnect", () => {
  // for remove the disconnected user
  singleUsersName.delete([senderId, userName]);
  // socket.emit("singleUserName", Array.from(singleUsersName));

  // sending the updating user list
});
