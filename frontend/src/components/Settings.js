const updateUsername = (newUsername) => {
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  storedUser.username = newUsername;

  localStorage.setItem(
    "user",
    JSON.stringify(storedUser)
  );

  setUser(storedUser);
};