// FRONT-END (CLIENT) JAVASCRIPT HERE

//Front end for page one

const login_validate = async function (event) {
  // username = document.querySelector('#user_name_box').get;
  const reponse = await fetch("/login", {
    method: "POST",
    url: "/hompage.html",
  });
  const text = await reponse.text();
  console.log("Normal login");
  window.location.href = text;
  console.log("Text:", text);
};

window.onload = function () {
  // const loginButton = document.querySelector("#sign_in_button");
  // loginButton.onclick = login_validate;
  document.getElementById("githubButton").addEventListener("click", () => {
    console.log("something is happening");
    // Redirect the user to your server's OAuth authentication route
    window.location.href = "/auth/github";
  });
};
