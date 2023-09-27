// FRONT-END (CLIENT) JAVASCRIPT HERE

class hourEntry {
  constructor(date, num, reasoning) {
    this.date = date;
    this.numHours = num;
    this.reason = reasoning;
  }
  setDate(date) {
    this.date = date;
  }
  setNumHours(num) {
    this.numHours = num;
  }

  setReason(reason) {
    this.reason = reason;
  }

  setID(id) {
    this.id = id;
  }
}

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day

  event.preventDefault();

  let evt = event.target;

  //add item logic
  let error_message = "";
  let dateBox = document.getElementById("dateSubmission");
  let numHoursBox = document.getElementById("hourSubmission");
  let reasoningBox = document.getElementById("reasonSubmission");

  // let error = document.getElementById("error-message");

  let dateVal = dateBox.value;
  let numHours = parseFloat(numHoursBox.value);
  let reasoning = reasoningBox.value;

  if (dateVal == "" || numHoursBox.value == "") {
    error_message = "Please fill out the fields";
  } else if (numHours < 0) {
    error_message = "Please enter a greater than zero number of hours";
  } else if (reasoning == "") {
    error_message = "Please give a reason for your hours";
  }
  console.log(error_message);

  newSubmission = new hourEntry(dateVal, numHours, reasoning);

  const body = JSON.stringify(newSubmission);
  console.log("New submission: ", body);
  serverResponse(body, "/add");
};

const deleteAction = async function (event) {
  event.preventDefault();
  let evt = event.target;
  let id = evt.parentElement.parentElement.dataset.internal_id;
  const body = JSON.stringify({ hourID: id });
  console.log("ID to delete: ", body);
  serverResponse(body, "/delete");
};

//_____________________________________________________

//from: https://code-boxx.com/editable-html-table/
var editable = {
  // (B) PROPERTIES
  selected: null, // current selected cell
  value: "", // current selected cell value
  currID: "",

  // (C) "CONVERT" TO EDITABLE CELL
  edit: (cell, id) => {
    // (C1) REMOVE "DOUBLE CLICK TO EDIT"
    cell.ondblclick = "";

    // (C2) EDITABLE CONTENT
    cell.contentEditable = true;
    cell.focus();

    // (C3) "MARK" CURRENT SELECTED CELL
    cell.classList.add("edit");
    editable.selected = cell;
    editable.value = cell.innerHTML;
    currID = id;
    console.log("element id:", id);

    // (C4) PRESS ENTER/ESC OR CLICK OUTSIDE TO END EDIT
    window.addEventListener("click", editable.close);
    cell.onkeydown = (evt) => {
      if (evt.key == "Enter" || evt.key == "Escape") {
        editable.close(evt.key == "Enter" ? true : false);
        return false;
      }
    };
  },
  // (D) END "EDIT MODE"
  close: (evt) => {
    if (evt.target != editable.selected) {
      // (D1) CANCEL - RESTORE PREVIOUS VALUE
      if (evt === false) {
        editable.selected.innerHTML = editable.value;
      }

      // (D2) REMOVE "EDITABLE"
      window.getSelection().removeAllRanges();
      editable.selected.contentEditable = false;

      // (D3) RESTORE CLICK LISTENERS
      window.removeEventListener("click", editable.close);
      let cell = editable.selected;
      cell.onkeydown = "";
      cell.ondblclick = () => editable.edit(cell);

      // (D4) "UNMARK" CURRENT SELECTED CELL
      editable.selected.classList.remove("edit");
      editable.selected = null;
      editable.value = "";

      // (D5) DO WHATEVER YOU NEED
      if (evt !== false) {
        const json = {
          hourID: currID,
          updatedCell: cell.dataset.column,
          newVal: cell.innerHTML,
        };
        const body = JSON.stringify(json);
        console.log("going to update with this val: ", body);
        serverResponse(body, "/update");
      }
    }
  },
};

//_____________________________________________________

const serverResponse = async function (body, reqType) {
  const response = await fetch(reqType, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  const text = await response.text();
  const data = JSON.parse(text);
  console.log("gonna print data:", data);
  writeInfoToScreen(data);
};

//Front end for page one
window.onload = function () {
  const button = document.querySelector("#submissionButton");
  button.onclick = submit;

  (async function () {
    const response = await fetch("/getData", {
      method: "GET",
    });
    const text = await response.text();
    const data = JSON.parse(text);
    console.log("gonna print data:", data);
    writeInfoToScreen(data);
  })();
};

/*
html outline for the hour entry to shove into the grid

*/
const writeInfoToScreen = function (submissions) {
  let entriesList = document.getElementById("dataRepresentation");

  entriesList.innerHTML = "";
  const summedHours = document.getElementById("totalHours");
  let hoursSum = 0;
  summedHours.textContent = hoursSum;

  for (i = 0; i < submissions.length; i++) {
    let entry = submissions[i];

    let hours = entry.numHours;
    hoursSum += hours;
    let date = new Date(entry.date).toISOString().split("T")[0];
    let reason = entry.reason;
    let id = entry._id;
    let template = `
<tr scope=\"row\" data-internal_id=\"${id}\"\>
  <td data-column=\"numHours\">${hours}</td>
  <td data-column=\"date\">${date}</td>
  <td data-column=\"reason\">${reason}</td>
  <td>
    <button type=\"button\" style=\"margin-left: 25px; width:25px\" class=\"btn btn-sm btn-dark\" id=\"delete_${i}\" \">X</button>
  </td>
</tr>
`;

    entriesList.innerHTML += template;
    const button = document.getElementById("delete_" + i);
    button.onclick = deleteAction;
  }
  for (let cell of document.querySelectorAll(".editable td")) {
    cell.ondblclick = () =>
      editable.edit(cell, cell.parentElement.dataset.internal_id);
  }
  summedHours.textContent = hoursSum;
};
