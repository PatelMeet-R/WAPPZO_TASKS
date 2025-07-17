let token = localStorage.getItem("token") || null;
if (!token) {
  alert("You must be logged in!");
  window.location.href = "login.html";
}
// console.log(`${token} this is the token we get from the dashboard pages`);
const dashForm = document.querySelector(".Dashboard");
const userDisplayData = document.querySelector("#userTableBody");
let editingId = null;

dashForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = dashForm.name.value;
  const email = dashForm.email.value;
  const department = dashForm.department.value;
  console.log(`name and email and department`, name + email + department);

  if (!name || !email || !department) {
    return alert("Please fill all fields!");
  }

  try {
    if (editingId) {
      // Update user
      await axios.put(
        `https://crud-api-5f45.onrender.com/dashboard/user/${editingId}`,
        { name, email, department },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      editingId = null;
      document.querySelector(".btn").innerText = "Add User";
      alert("User updated!");
    } else {
      // Create new user
      const response = await axios.post(
        "https://crud-api-5f45.onrender.com/dashboard/user",
        { name, email, department },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("User created:", response.data);
      alert("User added!");
    }

    e.target.reset();
    DisplayUserData();
  } catch (error) {
    console.log("Create/Edit error:", error);
    alert("Failed to create or update user.");
  }
});

// display the data
async function DisplayUserData() {
  try {
    const response = await axios.get(
      "https://crud-api-5f45.onrender.com/dashboard/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    // console.log(response);
    const users = response.data;
    // console.log(users);
    userDisplayData.innerHTML = "";
    users.forEach((user) => {
      userDisplayData.innerHTML += `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.department}</td>
          <td>
            <button onclick="deleteUserInfo('${user.id}')">Delete</button>
          </td>
          <td>
            <button onclick="editUserInfo('${user.id}')">Edit</button>
          </td>
        </tr>`;
    });
    console.log("after forEach function");
    console.log(users);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
}
DisplayUserData();
function editUserInfo(id) {
  const row = [...userDisplayData.children].find((tr) =>
    tr.querySelector("button[onclick*='" + id + "']")
  );

  const [nameCell, emailCell, departmentCell] = row.children;

  document.querySelector(".DashName").value = nameCell.innerText;
  document.querySelector(".DashEmail").value = emailCell.innerText;
  document.querySelector(".DashDepartment").value = departmentCell.innerText;

  editingId = id;
  document.querySelector(".btn").innerText = "Update User";
}

// Delete user dashboard info
async function deleteUserInfo(id) {
  try {
    await axios.delete(
      `https://crud-api-5f45.onrender.com/dashboard/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("User deleted successfully");
    DisplayUserData();
  } catch (error) {
    console.log("Delete failed:", error);
    alert("Failed to delete user.");
  }
}

// Logout user
document.querySelector(".log-btn").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://crud-api-5f45.onrender.com/logout", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json)
      .then((data) => {
        if (data) {
          localStorage.removeItem("token");
          alert("You are logged out");
          window.location.href = "login.html";
        }
      });
  } catch (error) {
    console.log("Logout error:", error);
    alert("Logout failed. Please try again.");
  }
});
