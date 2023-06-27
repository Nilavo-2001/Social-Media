import { Box, Divider, Typography, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
const CommentsList = ({ comments, name, token, postId, palette, main }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handlePostComment = async () => {
    const response = await fetch(`http://localhost:3001/comments/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment, postId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="Type you comment here..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <Button
          disabled={!comment}
          onClick={handlePostComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": { color: "black" },
          }}
        >
          POST
        </Button>
      </FlexBetween>
      <Box mt="0.5rem">
        {comments.map((comment, i) => (
          <Box key={`${name}-${i}`}>
            <Divider />
            <Typography
              sx={{
                color: main,
                m: "0.4rem 0",
                pl: "1rem",
                fontSize: "1.3rem",
                maxWidth: "500px",
                overflow: "auto",
              }}
            >
              {comment.content}
            </Typography>
            <Typography
              sx={{
                color: main,
                m: "0.9rem 0",
                pl: "1rem",
                fontSize: "0.8rem",
              }}
            >
              By {comment.userName}
            </Typography>
          </Box>
        ))}
        <Divider />
      </Box>
    </>
  );
};

export default CommentsList;
