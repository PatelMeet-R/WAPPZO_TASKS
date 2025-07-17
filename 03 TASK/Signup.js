const form = document.getElementById("signupForm");
const warning = document.querySelector(".warning");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  console.log(
    `n---------- ${name}------------- e------ ${email}----------p--------${password}`
  );

  if (!name || !email || !password) {
    warning.innerHTML = "Try again! Enter all details.";
    return;
  }

  try {
    const response = await axios.post(
      "https://crud-api-5f45.onrender.com/signup",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      alert("Signup successful!");
      form.reset();
      console.log("after successful msg popup");
      window.location.href = "login.html";
    } else {
      warning.innerHTML = "Signup failed.";
    }
  } catch (error) {
    console.error("Signup error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      warning.innerHTML = `Signup failed: ${error.response.data.message}`;
    } else {
      warning.innerHTML = "Something went wrong. Please try again.";
    }
  }
});
