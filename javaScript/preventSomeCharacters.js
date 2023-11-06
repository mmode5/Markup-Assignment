const submit = document.getElementsByClassName("submit-button")[0];
const zipNum = document.getElementById("zip");
const eMoneyNum = document.getElementById("eMoneyNum");
const eMoneyPIN = document.getElementById("eMoneyPIN");
const phoneInput = document.getElementById("phone");
const invalidChars = ["-", "+", "e"];

[zipNum, eMoneyNum, eMoneyPIN].forEach((x) => {
  x.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
});

phoneInput.addEventListener("input", function (event) {
  this.value = this.value.replace(/[^0-9+-\s]/g, "");
});

const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const choice1 = document.getElementsByClassName("choice")[0];
const choice2 = document.getElementsByClassName("choice")[1];
const card_info_div = document.getElementsByClassName("card-info")[0];
const card_info = document.getElementsByClassName("information")[0];

choice1.style.border = "1px solid #d87d4a";
card_info_div.style.display = "block";

choice1.addEventListener("click", () => {
  choice1.style.border = "1px solid #d87d4a";
  choice2.style.border = "1px solid #CFCFCF";
  card_info_div.style.display = "block";
  card_info.style.display = "none";
});

choice2.addEventListener("click", () => {
  choice1.style.border = "1px solid #CFCFCF";
  choice2.style.border = "1px solid #d87d4a";
  card_info_div.style.display = "none";
  card_info.style.display = "flex";
});

const inputs = document.querySelectorAll(".input");

inputs.forEach((x) => {
  x.addEventListener("input", () => {
    const firstChildOfX = x.firstElementChild;
    const lastChildOfX = x.lastElementChild;
    const message = firstChildOfX.firstElementChild;

    document.addEventListener("click", function (event) {
      if (!x.contains(event.target)) {
        if (lastChildOfX.value == "") {
          firstChildOfX.style.color = "#cd2c2c";
          lastChildOfX.style.border = "2px solid #cd2c2c";
          message.style.display = "block";
        }

        if (lastChildOfX.value !== "") {
          firstChildOfX.style.color = "#000";
          lastChildOfX.style.border = "2px solid #CFCFCF";
          message.style.display = "none";
        }
      }
    });
  });
});

const mailDiv = document.getElementsByClassName("input-2")[0];
const mailLabel = mailDiv.firstElementChild;
const badMessage = mailLabel.firstElementChild;
const mailInput = mailDiv.lastElementChild;

mailDiv.addEventListener("input", () => {
  document.addEventListener("click", function (event) {
    if (!mailDiv.contains(event.target)) {
      badMessage.textContent = "Field cannot be empty";

      if (!mailInput.checkValidity()) {
        badMessage.textContent = "Wrong format";
        mailLabel.style.color = "#cd2c2c";
        mailInput.style.border = "2px solid #cd2c2c";
        badMessage.style.display = "block";
      }
    }
  });
});

const form = document.getElementsByClassName("form")[0];
const inputFields = form.querySelectorAll("input");

function checkInputFields() {
  let isValid = true;
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value.trim() === "") {
      isValid = false;
      break;
    }
  }
  submit.disabled = !isValid;
}

function checkInputFieldsMini() {
  let isValid = true;
  for (let i = 0; i < inputFields.length; i++) {
    if (i !== 8 && i !== 9 && inputFields[i].value.trim() === "") {
      isValid = false;
      break;
    }
  }
  submit.disabled = !isValid;
}

checkInputFields();
form.addEventListener("input", checkInputFields);
