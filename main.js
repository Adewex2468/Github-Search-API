let searchBtn = document.getElementById("search-btn");
let usernameInput = document.getElementById("username");
let profileDiv = document.getElementById("profile-container");
let profileCard = document.getElementById("profile");
let changeBg = document.getElementById("changeBg");
let GITHUB_API = "https://api.github.com/users/${username}";
searchBtn.addEventListener("click", fetchProfile);
async function fetchProfile() {
    const username = usernameInput.value.trim();
    if(username === ""){
    profileDiv.innerHTML = "<h3 class='error'>Please enter a username</h3>"
        return;
    }
    profileDiv.innerHTML = "<div class='loader'></div";
    try{
        const response = await fetch(`${GITHUB_API.replace("${username}", username)}`);
        if(!response.ok){
            throw new Error("User not found");
        }
        const data = await response.json();
        displayProfile(data);
    }catch(error){
        profileDiv.innerHTML = "<h3 class = 'error'>No network connection. Please try again later.</h3>"
    }
}

function displayProfile(user){
    profileDiv.innerHTML = `<div class="profile" id="profile">
    <div class="profile-content">
        <img src="${user.avatar_url}"/>
        <h2>${user.name || "No Name Provided"}</h2>
        <p>Joined ${new Date(user.created_at).toLocaleDateString()}</p>
    </div>
    <div class="others">
        <a href="${user.html_url}" target="_blank">@${user.login}</a>     
        <p class="bio">${user.bio || "No Bio Available"}</p>
    </div>
    <div class="stats" id="stats">
        <div class="repos">
            <p>Repos</p>
            <h3>${user.public_repos}</h3>
        </div>
        <div class="followers">
            <p>Followers</p>
            <h3>${user.followers}</h3>
        </div>
        <div class="following">
            <p>Following</p>
            <h3>${user.following}<h3>
        </div>
    </div>
    <div class="blog">
        <div class="blog-area>
            <p>Twitter: <a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username || "Not Available"}</a></p> 
            <p>github: <a href="${user.html_url}" target="blank">${user.html_url}</a></p>
        </div>
        <div class="blog-link">
            <p>Blog: <a href="${user.blog}" target ="_blank">${user.blog || "Not Available"}</a></p>
            <p><a href="https://locationiq.com/" target="_blank">Location: ${user.location || "Not Available"}</a></p>
        </div>
    </div>
</div>` 

}

changeBg.addEventListener("click", ()=>{
    document.getElementById("profile").classList.toggle("active");
    document.body.classList.toggle("active");
    document.getElementById("stats").classList.toggle("active");
    document.getElementById("username").classList.toggle("active");
    changeBg.classList.toggle("active");
});