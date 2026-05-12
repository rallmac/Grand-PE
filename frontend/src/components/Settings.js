import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {

  const [user, setUser] = useState(null);

  const [newUsername, setNewUsername] = useState("");

  const [loadingUsername, setLoadingUsername] = useState(false);

  const [loadingPhoto, setLoadingPhoto] = useState(false);

  // BACKEND URL
  const API_BASE_URL =
    "https://your-backend-url.com";

  // LOAD USER
  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);

      setNewUsername(
        storedUser.username || ""
      );
    }

  }, []);

  // UPDATE USERNAME
  const updateUsername = async () => {

    if (!newUsername.trim()) {
      alert("Username is required");
      return;
    }

    try {

      setLoadingUsername(true);

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const token = storedUser.token;

      const response = await axios.put(
        `${process.env.REACT_APP_URL}/user/update-username`,
        {
          username: newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UPDATED USER FROM BACKEND
      const updatedUser =
        response.data.user;

      // UPDATE LOCAL STORAGE
      const updatedLocalUser = {
        ...storedUser,
        ...updatedUser,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedLocalUser)
      );

      // UPDATE STATE
      setUser(updatedLocalUser);

      alert("Username updated successfully");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed to update username"
      );

    } finally {

      setLoadingUsername(false);

    }
  };

  // UPDATE PROFILE PHOTO
  const updateProfilePhoto = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setLoadingPhoto(true);

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const token = storedUser.token;

      // FORM DATA
      const formData = new FormData();

      formData.append(
        "profilePhoto",
        file
      );

      const response = await axios.put(
        `${process.env.REACT_APP_URL}/user/update-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      // UPDATED USER
      const updatedUser =
        response.data.user;

      // UPDATE LOCAL STORAGE
      const updatedLocalUser = {
        ...storedUser,
        ...updatedUser,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedLocalUser)
      );

      // UPDATE STATE
      setUser(updatedLocalUser);

      alert("Profile photo updated");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed to upload photo"
      );

    } finally {

      setLoadingPhoto(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Account Settings
        </h1>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">

          <img
            src={
              user?.profilePhoto ||
              "/assets/images/default-avatar.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          />

          {/* PHOTO INPUT */}
          <label className="mt-5">

            <span className="cursor-pointer px-5 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#1f3e59] transition">

              {
                loadingPhoto
                  ? "Uploading..."
                  : "Change Photo"
              }

            </span>

            <input
              type="file"
              accept="image/*"
              onChange={updateProfilePhoto}
              className="hidden"
            />

          </label>

        </div>

        {/* USERNAME */}
        <div className="mt-10">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            value={newUsername}
            onChange={(e) =>
              setNewUsername(
                e.target.value
              )
            }
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#265073]"
          />

          {/* UPDATE BUTTON */}
          <button
            onClick={updateUsername}
            disabled={loadingUsername}
            className="mt-5 w-full bg-[#265073] hover:bg-[#1f3e59] text-white py-3 rounded-lg transition disabled:opacity-50"
          >
            {
              loadingUsername
                ? "Updating..."
                : "Update Username"
            }
          </button>

        </div>

      </div>

    </div>
  );
}