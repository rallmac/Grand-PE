const updateProfilePhoto = (imageUrl) => {
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  storedUser.profilePhoto = imageUrl;

  localStorage.setItem(
    "user",
    JSON.stringify(storedUser)
  );

  setUser(storedUser);
};