const avatar_img = document.querySelector("#avatar-image");
const userName = document.querySelector("#user-name");
const repoCount = document.querySelector("#no-of-repos");
const ul = document.querySelector("#ul");

function fetchApi(username = "Avin008") {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.avatar_url);
      avatar_img.setAttribute("src", data.avatar_url);
      userName.innerText = data.name;
      repoCount.innerText = `No. of Repos: ${data.public_repos}`;
      repoCount.style.color = "purple";

      fetch(data.repos_url)
        .then((repoData) => repoData.json())
        .then((repos) => {
          repos.forEach((list) => {
            console.log(list.name);
            createElement("li", ul, list.name);
            return repos;
          });
          return data;
        });
    })
    .catch((err) => console.log("something went wrong"));
}

function createElement(elName, parent, value) {
  let element = document.createElement(elName);
  parent.appendChild(element);
  element.innerText = value;
}

fetchApi();
