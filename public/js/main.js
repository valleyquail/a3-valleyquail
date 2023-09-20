// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  // event.preventDefault()

  const input = document.querySelector("#yourname"),
    json = { yourname: input.value },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  console.log("text:", text);
};

//Front end for page one

const login_validate = async function (event) {
  // username = document.querySelector('#user_name_box').get;
  // const reponse = await fetch("homepage.html", {
  //   method: "GET",
  //   url: "homepage.html",
  // });
  // const text = await reponse.text();
  // console.log("Text:", text);
};

window.onload = function () {
  const loginButton = document.querySelector("#sign_in_button");
  loginButton.onclick = login_validate;
};
