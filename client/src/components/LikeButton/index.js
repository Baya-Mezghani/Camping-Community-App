import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const LikeButton = ({ post: { _id, likeCount, likes } }) => {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {

  const data = JSON.parse(window.localStorage.getItem('user'));
    setUser(data);
    }
  ,[]);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  
  const likePost = async () => {
    try {
      const username = user.username;
      await axios.post(`http://localhost:4000/posts/like/${_id}`, { username });
      window.location.reload();
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };

  // if user is logged in, give option to like a post; else, like button disabled
  const likeButton = user ? (
    liked ? (
      <HeartIcon className="liked-heart" />
    ) : (
      <HeartIcon className="unliked-heart" />
    ) 
  ) : (
    <HeartIcon className="unliked-heart" />
  );

  return (
    <div className="flex items-center">
      <button className="like-btn" onClick={likePost}>
        {likeButton}
        {likeCount} {likeCount === 1 ? 'like' : 'likes' }
      </button>
    </div>
  );
};

export default LikeButton;