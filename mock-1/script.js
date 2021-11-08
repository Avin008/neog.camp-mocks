const searchBox = document.querySelector("#search-user");
const searchBtn = document.querySelector("#search-btn");
const avatar_img = document.querySelector("#avatar-image");
const userName = document.querySelector("#user-name");
const repoCount = document.querySelector("#no-of-repos");
const ul = document.querySelector("#ul");
const display = document.querySelector(".display");
const showErr = document.querySelector("#show-err");

function fetchApi(username = "Avin008") {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      //checking for response status

      if (res.status === 404) {
        display.style.display = "none";
        showErr.innerText = "User not found";
        showErr.style.color = "red";
      } else {
        display.style.display = "block";
        showErr.innerText = "";
      }
      return res.json();
    })
    .then((data) => {
      //pushing user data into their elements

      avatar_img.src = data.avatar_url;
      userName.innerText = data.name;
      repoCount.innerText = `Total No. of Repos: ${data.public_repos}`;
      repoCount.style.color = "purple";
      return data;
    })
    .then((repos) => {
      //pushing repos list

      ul.innerHTML = "";
      fetch(repos.repos_url)
        .then((res) => res.json())
        .then((rep) => {
          rep.forEach((repos) => {
            ul.innerHTML += `<li>${repos.name}</li>`;
          });
          return rep;
        })
        .catch((err) => err);
      return repos;
    })
    .catch((err) => {
      console.log("something went wrong");
    });
}

fetchApi();

searchBtn.addEventListener("click", function () {
  if (searchBox.value) {
    fetchApi(searchBox.value);
  } else {
    fetchApi();
  }
});
