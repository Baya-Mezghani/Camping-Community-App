import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

import Auth from '../utils/auth';
import Layout from '../components/Layout/Dashboard';
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const SinglePost = () => {
  const { id: postId } = useParams();
  console.log(postId)
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const current_user = JSON.parse(window.localStorage.getItem('user'));
        setUser(current_user)
        const response = await axios.get(`http://localhost:4000/posts/${postId}`);
        console.log(response.data); // log response data
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    let postMarkup;
    console.log(post)
    const { _id, likes, likeCount } = post;

    function deletePostCallback() {
      window.location.replace('/blog');
    };

    postMarkup = (
      <Layout>
        
        <div className="w-full h-full min-h-screen">
          <div className="px-4 flex flex-col justify-center items-center">
            <article className="max-w-screen-md mt-[130px] bg-gray-50 m-4 p-4 flex flex-col rounded-md shadow-lg">
              <div className="w-full flex items-center">
              {post && (
                <div className="mr-4">
                  <img
                    src={post.author.avatar || `https://images.unsplash.com/photo-1565588496723-63494874b143?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=866&q=80`}
                    alt={post.username}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full"
                  />
                </div>
              )}
              {post && (
                <div>
                  <Link
                    to={`/profile/${post.username}`}
                    className="font-semibold text-teal-400 hover:text-gray-500 uppercase tracking-widest"
                  >
                    {post.username}
                  </Link>
              
                  <p className="text-gray-400 text-sm">{post.createdAt}</p>
                </div>
                )}
              </div>
              <h3 className="w-full my-4">
              {post && (
                <Link
                  to={`/post/${post._id}`}
                  className="text-left hover:text-teal-300"
                >
                  {post.postTitle}
                </Link>
                )}
              </h3>
              {post && (
              <div className="card-body">
                <p>{post.postText}</p>
              </div>
              )}

              <div className="mt-4 pt-4 flex justify-between items-center text-gray-400 text-xs md:text-sm border-t border-gray-200">
              {post && (
                <div className="inline-flex">
                  <Link to={`/post/${post._id}`} className="mr-4 flex items-center hover:text-teal-400">
                    <ChatBubbleLeftRightIcon width={20} className="mr-1" /> {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments' }
                  </Link>

                  <LikeButton user={user} post={{ _id, likes, likeCount}} />
                </div>
                )}
                {post && (
                <div>
                  {/* gives user the option to delete their own post */}
                  {user && user.username === post.username && (
                    <DeleteButton postId={post._id} callback={deletePostCallback} />
                  )}
                  
                </div>
                )}
              </div>
            </article>
            
            {post && post.commentCount > 0 && (
              <CommentList comments={post.comments} />
            )}

            {Auth.loggedIn() && <CommentForm postId={post._id} />}
          </div>
        </div>
      </Layout>
    )
    return postMarkup;
  }
};

export default SinglePost;