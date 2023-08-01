let auth0Client = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
  window.onload = async () => {
    await configureClient();
    updateUI();

    const isAuthenticated = await auth0Client.isAuthenticated();

    const btnLogin = document.getElementById("btn-login");
    const btnSignup = document.getElementById("btn-signup");
    const btnSignup2 = document.getElementById("btn-signup2");
    const btnLogout = document.getElementById("btn-logout");

    if (btnLogin) btnLogin.disabled = isAuthenticated;
    if (btnSignup) btnSignup.disabled = isAuthenticated;
    if (btnSignup2) btnSignup2.disabled = isAuthenticated;
    if (btnLogout) btnLogout.disabled = !isAuthenticated;

    if (isAuthenticated) {
      // show the gated content
      return;
    }

    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      // Process the login state
      try {
        await auth0Client.handleRedirectCallback();
      } catch (e) {
        console.error("Error handling redirect callback: ", e);
      }

      updateUI();

      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    }
  };
});

// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  const btnLogin = document.getElementById("btn-login");
  const btnSignup = document.getElementById("btn-signup");
  const btnSignup2 = document.getElementById("btn-signup2");
  const btnUser = document.getElementById("btn-user");
  const dropdown = document.getElementById("dropdown");

  if (btnLogin) btnLogin.style.display = isAuthenticated ? "none" : "block";
  if (btnSignup) btnSignup.style.display = isAuthenticated ? "none" : "block";
  if (btnSignup2) btnSignup2.style.display = isAuthenticated ? "none" : "block";
  if (dropdown) dropdown.style.display = isAuthenticated ? "block" : "none";

  if (isAuthenticated) {
    const userProfile = await auth0Client.getUser();

    if (btnUser) {
      btnUser.src = userProfile.picture;
      btnUser.style.display = "block";
    }

    // Set email, nickname and password fields
    const emailField = document.getElementById("user-email");
    const nicknameField = document.getElementById("user-nickname");
    const passwordField = document.getElementById("user-password");

    if (userProfile) {
      emailField.value = userProfile.email || ""; // Set the email value
      nicknameField.value = userProfile.nickname || ""; // Set the nickname value
      passwordField.value = "**********"; // Set the password placeholder
    }
  } else {
    if (btnUser) {
      btnUser.style.display = "none";
    }

    const gatedContentElement = document.getElementById("gated-content");

    if (gatedContentElement) {
      gatedContentElement.classList.add("hidden");
    }
  }
};

const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: `${window.location.origin}/profile.html`,
    },
  });
};

const signup = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      screen_hint: "signup",
      redirect_uri: `${window.location.origin}/profile.html`,
    },
  });
};

const logout = () => {
  auth0Client.logout({
    returnTo: `${window.location.origin}/index.html`,
  });
};

document
  .getElementById("profile-link")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      console.log("In!!");
      document.getElementById("main-content").style.display = "none";
      document.getElementById("profile-dashboard").style.display = "block";
    } else {
      console.log("Not In");
      await auth0Client.loginWithRedirect({
        redirect_uri: `${window.location.origin}/index.html`,
      });
    }
  });
document
  .getElementById("change-password")
  .addEventListener("click", async () => {
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("user-email").value,
      }),
    });

    if (response.ok) {
      alert("A password reset email has been sent to your email address.");
    } else {
      alert("There was an error sending the password reset email.");
    }
  });
