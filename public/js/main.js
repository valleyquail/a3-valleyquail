// FRONT-END (CLIENT) JAVASCRIPT HERE

//Front end for page one

const login_validate = async function (event) {
  event.preventDefault();
  const username = document.querySelector("#emailBox");
  const password = document.querySelector("#passwordBox");

  const user = {
    username: username.value,
    password: password.value,
  };

  const body = JSON.stringify(user);
  console.log("body: ", body);

  const response = await fetch("/findUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  const text = await response.text();
  const validation = JSON.parse(text);
  console.log("Text:", text);

  if (validation == "true") {
    console.log("Normal login");
    window.location.href = "/login";
  } else {
    console.log("failed to log in");
  }
};

window.onload = function () {
  const loginButton = document.querySelector("#sign_in_button");
  loginButton.onclick = login_validate;
  document.getElementById("githubButton").addEventListener("click", () => {
    console.log("something is happening");
    // Redirect the user to your server's OAuth authentication route
    window.location.href = "/auth/github";
  });
};
