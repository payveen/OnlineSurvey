const questions = [
  {
    text: "1. Do you feel more productive while working remotely?",
    options: ["More productive", "Less productive", "No difference"],
  },
  {
    text: "2. How many days per week do you work remotely?",
    options: ["0-1 days", "2-3 days", "4-5 days", "Full-time remote"],
  },
  {
    text: "3. Do you find it easier to focus while working remotely?",
    options: ["Yes", "No", "Depends on the environment"],
  },
  {
    text: "4. How does remote work affect the number of tasks you complete in a day?",
    options: ["Increases", "Decreases", "No difference"],
  },
  {
    text: "5. What is the biggest challenge you face when working remotely?",
    options: [
      "Distractions",
      "Communication issues",
      "Lack of motivation",
      "Internet problems",
      "None",
    ],
  },
  {
    text: "6. How easy is it to collaborate with your team while working remotely?",
    options: ["Very easy", "Somewhat easy", "Difficult"],
  },
  {
    text: "7. Which communication tools do you use the most for remote work? (Select all that apply)",
    options: ["Zoom", "Slack", "Microsoft Teams", "Email", "Google Meet"],
    type: "checkbox",
  },
  {
    text: "8. Do you feel your work-life balance has improved since working remotely?",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    text: "9. How often do you take breaks while working remotely?",
    options: ["Every hour", "Every few hours", "Rarely", "Never"],
  },
  {
    text: "10. Would you prefer to continue remote work in the future?",
    options: ["Yes", "No", "A mix of remote and office work"],
  },
];

let currentQuestion = 0;
const container = document.getElementById("questionContainer");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("surveyForm");

function showQuestion(index) {
  container.innerHTML = "";
  const question = questions[index];
  const qNum = index + 1;

  const box = document.createElement("div");
  box.className = "question-box";

  const questionTitle = `
      <h5 class="text-primary">Question ${qNum}</h5>
      <label class="form-label fs-5">${question.text}</label>
    `;

  let inputs = "";
  question.options.forEach((opt, i) => {
    const id = `q${qNum}_${i}`;
    const inputType = question.type === "checkbox" ? "checkbox" : "radio";
    const nameAttr =
      question.type === "checkbox" ? `name="q${qNum}[]"` : `name="q${qNum}"`;
    const requiredAttr = question.type === "checkbox" ? "" : "required";

    inputs += `
        <div class="radio-option form-check">
          <input type="${inputType}" class="form-check-input me-2" id="${id}" value="${opt}" ${nameAttr} ${requiredAttr}>
          <label class="form-check-label" for="${id}">${opt}</label>
        </div>
      `;
  });

  const nextBtn = `<button type="button" class="btn btn-primary mt-3" id="nextBtn">Next</button>`;
  box.innerHTML = questionTitle + `<div class="ps-3">${inputs}</div>` + nextBtn;
  container.appendChild(box);

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (
      question.type === "checkbox" ||
      document.querySelector(`input[name='q${qNum}']:checked`)
    ) {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        container.innerHTML = "";
        submitBtn.classList.remove("d-none");
      }
    } else {
      alert("Please select an option to continue.");
    }
  });
}

showQuestion(currentQuestion);

// AJAX submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);

  fetch("submit_survey.php", {
    // Make sure this is the correct path to your PHP file
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(
        "responseMessage"
      ).innerHTML = `<div class="alert alert-success">${data}</div>`;
      form.reset();
    })
    .catch((error) => {
      document.getElementById(
        "responseMessage"
      ).innerHTML = `<div class="alert alert-danger">Something went wrong.</div>`;
      console.error("Error:", error);
    });
});
