//variables
const get = (param) => document.getElementById(`${param}`);
let root = document.documentElement.style;
const searchbar = get("search-bar");
const profilecontainer = get("user-container");
const btnMode = get("btn-mode");
const btnText = get("btn-text");
const btnIcon = get("btn-icon");
const input = get("input");
const noResults = get("no-results");
const submit = get("submit");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan","Feb","Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get ("company");
const url = "https://api.github.com/users/";

let darkMode = false;

//eventlistners

btnMode.addEventListener("click", function () {
    if (darkMode == false) {
      darkModeProperties();
    } else {
      lightModeProperties();
    }
  });

input.addEventListener("keydown", (e) => {
    if (e.value == "enter") {
        if(input.value !== "") {
            getUserData(url + input.value);
        }
    }
}
,false)

submit.addEventListener("click", () => {
    if (input.value !== "") {
        getUserData(url + input.value);
    }
})


//functions

function getUserData(gitUrl) {
    fetch(gitUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateUserProfile(data);
      })
      .catch((err) => {
        throw err;
      });
};



function updateUserProfile(data) {
    if (data.message !== "Not Found") {
        noResults.style.display = "none";
        function checkNull(param1, param2) {
            if(param1 == "" || param1 == "null" || param2 == "") {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            } else  {
                return true;
            }
        }

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    } else {
        noResults.style.display ="block";
    }
}

getUserData(url + "thepranaygupta");


//dark default mode

const preferesDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;


if (localStorage.getItem("dark-mode")) {
    darkMode = localStorage.getItem("dark-mode");
    darkModeProperties();
} else {
    localStorage.setItem("dark-mode", preferesDarkMode);
    darkMode = preferesDarkMode;
    lightModeProperties();
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    btnText.innerText = "LIGHT";
    btnIcon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    btnText.innerText = "DARK";
    btnIcon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}