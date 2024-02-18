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

const postButton = document.getElementById("post-button");
const photoUrlInput = document.getElementById("photo-url");
const feedContainer = document.querySelector(".feed-container");

const createPost = () => {
  const postContent = inputWithPlaceholder.value.trim();
  const photoInput = document.getElementById("photo-url");
  const photoFiles = photoInput.files;

  if (postContent || photoFiles.length > 0) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
      <div class="post-header">
        <button class="post-remove-btn">x</button>
      </div>
      <div class="post-values">
        <p>${postContent}</p>
        ${
          photoFiles.length > 0
            ? `<img src="${URL.createObjectURL(
                photoFiles[0]
              )}" alt="Post Image">`
            : ""
        }
      </div>
    `;

    feedContainer.appendChild(newPost);

    inputWithPlaceholder.value = "";
    photoInput.value = "";

    feedCard.style.display = "none";

    const deleteButton = newPost.querySelector(".post-remove-btn");
    deleteButton.addEventListener("click", () => {
      deletePost(newPost);
    });

    savePostToLocalStorage(newPost);
  } else {
    alert("Please enter some content or select an image/video before posting.");
  }
};

const deletePost = (postElement) => {
  postElement.remove();
  updateLocalStorage();
};

const savePostToLocalStorage = (postElement) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postContent = postElement.querySelector(".post-values p").innerText;
  const photoUrl = postElement.querySelector(".post-values img")?.src || "";

  const newPostData = { postContent, photoUrl };
  posts.push(newPostData);
  localStorage.setItem("posts", JSON.stringify(posts));
};

const updateLocalStorage = () => {
  const posts = Array.from(document.querySelectorAll(".post")).map(
    (postElement) => {
      const postContent = postElement.querySelector(".post-values p").innerText;
      const photoUrl = postElement.querySelector(".post-values img")?.src || "";
      return { postContent, photoUrl };
    }
  );
  localStorage.setItem("posts", JSON.stringify(posts));
};

postButton.addEventListener("click", createPost);
