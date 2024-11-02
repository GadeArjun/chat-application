const userToggle = document.querySelector(".user-toggle");
const secondToggle = document.querySelector(".second");
const usersContainer = document.querySelector(".users-container");
const users = document.querySelector(".users");
const userDetails = document.querySelector(".user-details");
const inputSection = document.querySelector(".input-section");
var click = false;

userToggle.addEventListener("click", onUserToggle);

function onUserToggle() {
  click = !click;

  if (click) {
    usersContainer.style.display = "flex";
    secondToggle.style.opacity = 0;
  } else {
    usersContainer.style.display = "none";
    secondToggle.style.opacity = 1;
  }
}

function createNewUser(id) {
  const user = document.createElement("div");
  user.addEventListener("click", () => {
    const msgUser = document.createElement("div");
    userDetails.innerHTML = "";

    msgUser.innerHTML = `
              <div class="msg-user">
                <div class="profile">
                  <img
                    src="https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg"
                    alt=""
                  />
                </div>
                <div class="name">
                  <span>${id}</span>
                </div>
              </div>
            `;
    const input = document.createElement("div");
    inputSection.innerHTML = "";
    input.className = "chat-input";
    input.innerHTML = `<input type="text" placeholder="Enter message here..." name="" id="">`;
    inputSection.appendChild(input);

    userDetails.appendChild(msgUser);
  });
  user.className = "user";
  user.innerHTML = `<div class="profile">
                  <img
                    src="https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg"
                    alt=""
                  />
                </div>
                <div class="name">
                  <span>${id}</span>
                </div>`;

  users.appendChild(user);
}

const socket = io();

var id;
socket.on("connect", () => {
  console.log(socket.id);
  id = socket.id;
});

socket.on("users", (usersId) => {
  users.innerHTML = "";

  console.log(usersId);

  const newUsersId = usersId.filter((ele) => {
    if (ele !== id) {
      return ele;
    } else {
      return null;
    }
  });
  newUsersId.forEach((ele) => {
    createNewUser(ele);
  });
});
