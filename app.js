const emailInput = document.querySelector("#email");
const pass = document.querySelector("#pass");
const btnSignup = document.querySelector(".log-in-button");

const storedData = localStorage.getItem("formData");

const dataValidator = () => {
  if (storedData) {
    const formData = JSON.parse(storedData);
    if (
      emailInput.value === formData.email &&
      pass.value === formData.password
    ) {
      window.location.href = "./news-feed/news.html";
      return true;
    } else {
      alert("Please enter the correct account information");
      return false;
    }
  } else {
    alert("User is't exist!");
    return false;
  }
};

btnSignup.addEventListener("click", () => {
  dataValidator();
});
