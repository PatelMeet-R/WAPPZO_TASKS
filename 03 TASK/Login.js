const form = document.getElementById("LoginForm");
const warning = document.querySelector(".warning");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    warning.innerHTML = "Try again! Enter all details.";
    return;
  }

  async function LogginReq() {
    const LoggedData = await fetch(
      "https://crud-api-5f45.onrender.com/login",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          alert("login succcessful");
          console.log(data);
          const token = data.token;
          console.log(token);

          localStorage.setItem("token", token);

          if (token === "undefined") {
            window.location.href = "SignUp.html";
          }

          window.location.href = "Dashboard.html";
        } else {
          let errorText = "login failed !! try again";
          warning.innerHTML = errorText;
        }
      });
  }
  try {
    LogginReq();
  } catch (err) {
    console.log(err);
    warning.innerHTML = "Something went wrong. Please try again.";
  }
});
