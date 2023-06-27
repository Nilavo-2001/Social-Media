import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setProfileUserFriends } from "state";

const FriendListWidget = ({ userId, isProfile = false }) => {
  console.log("friendslist from profile", isProfile);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  let loggedInUserFriends = useSelector((state) => {
    if (state.user) {
      return state.user.friends;
    } else {
      return null;
    }
  });
  let profileUserFriends = useSelector((state) => {
    if (state.profileUser) {
      return state.profileUser.friends;
    } else {
      return null;
    }
  });
  let finalFriends = isProfile ? profileUserFriends : loggedInUserFriends;
  if (isProfile && !loggedInUserFriends) getFriends();
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log("friends - data", data);
    if (isProfile) {
      dispatch(setProfileUserFriends({ friends: data }));
    } else {
      dispatch(setFriends({ friends: data }));
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connenctions
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {finalFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            isProfile={isProfile}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
