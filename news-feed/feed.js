const input = document.getElementById("input-for-popup");
const feedCard = document.querySelector(".popup");
const removePopup = document.getElementById("hide-popup");
const fullName = document.getElementById("popup-name");
const inputWithPlaceholder = document.getElementById("input-with-placeholder");

const setFullNameFromLocalStorage = () => {
  const storedData = localStorage.getItem("formData");
  if (storedData) {
    const formData = JSON.parse(storedData);
    fullName.innerText = formData.firstName + " " + formData.lastName;

    inputWithPlaceholder.placeholder = `${formData.firstName}, საკუთარი აზრები ხომ არ გაგვიზიარებდით?`;
  } else {
    alert("User data not found.");
  }
};

setFullNameFromLocalStorage();

input.addEventListener("focusin", () => {
  if (feedCard.style.display === "block") {
    feedCard.style.display = "none";
  } else {
    feedCard.style.display = "grid";
  }
});

removePopup.onclick = () => {
  feedCard.style.display = "none";
};
