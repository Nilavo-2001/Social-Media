import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  console.log("posts-widget called");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const getPosts = async () => {
    console.log("fetching post from posts widget");
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    console.log("fetching post from posts widget");
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(({ _id, user, description, picturePath, likes, comments }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={user._id}
          name={`${user.firstName} ${user.lastName}`}
          description={description}
          location={user.location}
          picturePath={picturePath}
          userPicturePath={user.picturePath}
          likes={likes}
          comments={comments}
          isProfile={isProfile}
        />
      ))}
    </>
  );
};

export default PostsWidget;
