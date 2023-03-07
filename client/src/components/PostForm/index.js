import React, { useState } from 'react';
import axios from 'axios';

import { X } from 'react-feather';

const PostForm = () => {
  const getUser = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user : null;
  };


  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/posts/newPost', {
        postTitle,
        postText,
        author:getUser()._id,
        username: getUser().username,
      });

      console.log(response.data);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-1 flex items-center">
      <div className="w-20">
        <img
          src={getUser().avatar || `https://images.unsplash.com/photo-1565588496723-63494874b143?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=866&q=80`}
          alt={getUser().username}
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="post-form">
        <input placeholder="What's on your mind..." onClick={() => setShowModal(true)} className="input" />
        <div className="flex items-center justify-center">
        {showModal ? (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-lg">
                  <div className="mb-4 flex justify-end items-center text-gray-400 hover:text-teal-300 hover:cursor-pointer transition-all ease-in duration-300" onClick={() => setShowModal(false)}>
                    <X width={25} className="inline-flex items-center" />
                  </div>
                  <h1 className="text-3xl">Create New Post</h1>
                  <form className="w-full px-4 pb-2 flex flex-col justify-center" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={postTitle}
                      onChange={(event) => setPostTitle(event.target.value)}
                    />
                    <textarea
                      placeholder="What's on your mind..."
                      value={postText}
                      onChange={(event) => setPostText(event.target.value)}
                      className="h-[14vh] mb-4"
                    ></textarea>
                    <button className="primary mt-2" disabled={postText.trim() === ''}>
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostForm;