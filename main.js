function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  // localStorage.setItem("name", name);
  // localStorage.setItem("email", email);
  // localStorage.setItem("phonenumber", phone);
  const obj = {
    name,
    email,
    phone,
  };
  console.log(obj, "ln14");

  axios
    .post("http://localhost:3000/user/adduser", obj)
    .then((response) => {
      shownewUserOnScreen(response.data.newUserDetail);
      console.log(response,"inside frontend post");
    })
    .catch((err) => {
      alert("either your phone number or email is already registere with us");
      console.log(err);
    });
  // localStorage.setItem(obj.email, JSON.stringify(obj));
  // showNewUseronScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/user/getusers")
    .then((response) => {
      console.log(response,"get");
      for (var i = 0; i < response.data.allUsers.length; i++) {
        shownewUserOnScreen(response.data.allUsers[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function shownewUserOnScreen(user) {
  const parentElem = document.getElementById("listofuser");
  const childElem = document.createElement("li");
  childElem.textContent = user.name + " , " + user.email + " , " + user.phonenumber;
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "Button";
  deleteBtn.value = "Delete";
  deleteBtn.onclick = () => {
    axios
      .delete(`http://localhost:3000/user/deleteuser/${user.id}`)
      .then((response) => {
        // removeUserFromScreen(userId);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.removeItem(user.email);
    parentElem.removeChild(childElem);
  };

  const editBtn = document.createElement("input");
  editBtn.type = "Button";
  editBtn.value = "Edit";
  editBtn.onclick = () => {
    axios
      .delete(`http://localhost:3000/user/deleteuser/${user.id}`)
      .then((response) => {
        // removeUserFromScreen(userId);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.removeItem(user.email);
    parentElem.removeChild(childElem);
    document.getElementById("inputtag").value = user.name;
    document.getElementById("emailtag").value = user.email;
    document.getElementById("phonetag").value = user.name;
  };

  childElem.appendChild(deleteBtn);
  childElem.appendChild(editBtn);
  parentElem.appendChild(childElem);
}
