import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileUser } from "state";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  console.log("profile-page called");
  const dipatch = useDispatch();
  const user = useSelector((state) => state.profileUser);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    console.log("profile-user-fetched", userId);
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    //console.log(data);
    dipatch(setProfileUser({ user: data }));
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={user._id} isProfile={true} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={user._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
