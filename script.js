const loadUsersBtn = document.getElementById("loadUsersBtn");
const userList = document.getElementById("userList");
const statusMessage = document.getElementById("statusMessage");

const fetchUsers = async () => {
  // Clear previous results
  userList.innerHTML = "";
  statusMessage.textContent = "";

  // Loading state
  loadUsersBtn.disabled = true;
  loadUsersBtn.textContent = "Loading...";
  statusMessage.textContent = "Fetching users...";

  try {
    // Fetch users from API
    const response = await fetch("https://dummyjson.com/users");

    // Check if request succeeded
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // Convert response to JSON
    const data = await response.json();

    // Get first 3 users
    const firstThreeUsers = data.users.slice(0, 3);

    // Render users
    firstThreeUsers.forEach((user) => {
      const li = document.createElement("li");

      li.textContent = `${user.firstName} ${user.lastName}`;

      userList.appendChild(li);
    });

    // Success message
    statusMessage.textContent = "Users loaded successfully.";

  } catch (error) {
    console.error(error);

    // Error message
    statusMessage.textContent =
      "An error occurred while fetching users. Please try again.";

  } finally {
    // Reset button state
    loadUsersBtn.disabled = false;
    loadUsersBtn.textContent = "Load Users";
  }
};

// Button click event
loadUsersBtn.addEventListener("click", fetchUsers);