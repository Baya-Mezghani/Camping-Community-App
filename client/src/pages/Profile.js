import React, { useState, useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { UserPlus, UserMinus, Settings, X } from 'react-feather';
import axios from 'axios';

import Auth from '../utils/auth';
import Layout from '../components/Layout/Dashboard';
import UserWidget from '../components/UserWidget';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Profile = () => {
  // retrieve user information
  const { username: userParam } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(userParam ? `/api/users/${userParam}` : '/api/users/me', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
        });
        setUser(data.user);
        setPosts(data.user.posts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userParam]);

  // follow users feature
  const [following, setFollowing] = useState(false);
  const handleAddFriend = async () => {
    try {
      await axios.post(`/api/users/${user._id}/friends`, null, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      });
      setFollowing(true);
    } catch (err) {
      console.error(err);
    }
  };

  // unfollow users feature
  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`/api/users/${user._id}/friends`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      });
      setFollowing(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const { data } = await axios.get(`/api/users/${user._id}/friends`, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
        });
        if (data.friends.find((friend) => friend.username && userParam)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (user._id) {
      fetchFollowing();
    }
  }, [user._id, userParam]);

  // update profile feature
  const [showModal, setShowModal] = useState(false);
  const [userPic, setUserPic] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userBio, setUserBio] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/users/${Auth.getProfile().data._id}`, {
        avatar: userPic,
        location: userLocation,
        description: userBio,
      }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      });
      setUserPic('');
      setUserLocation('');
      setUserBio('');
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  return (
    <Layout>
      <div className="w-full h-full min-h-screen">
        <div className="profile w-full max-w-screen-xl mx-auto pt-[120px] px-8 flex flex-col-reverse md:flex-row justify-center items-start">
          <div className="w-full max-w-screen-md py-8 pr-0 md:pr-4">
            {/* IF USER IS LOGGED IN, DISPLAY POST FORM */}
            {!userParam && <PostForm />}
            {/* DISPLAY USER'S POSTS */}
            {user.username && posts?.map(post => (
              <div key={post._id}>
                <PostList post={post} />
              </div>
            ))}
          </div>
          {/* DISPLAY USER INFO */}
          <div className="w-full md:w-80 mt-12 mb-4 bg-gray-50 flex flex-wrap justify-center items-center rounded-lg shadow-lg">
            <UserWidget
              username={user.username}
              location={user.location}
              description={user.description}
              avatar={user.avatar}
              friendCount={user.friendCount}
              friends={user.friends}
            />
            {userParam ? (
              <div className="w-full flex justify-start pb-4 px-4">
                <button onClick={following ? handleRemoveFriend : handleAddFriend} className="btn">
                  <div className="w-full h-full inline-flex items-center font-normal">
                    {following ? (
                      <>
                        <UserMinus width={13} className="mr-1" /> Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus width={13} className="mr-1" /> Follow
                      </>
                    )}
                  </div>
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-start pb-4 px-4">
                <button className="btn" onClick={() => setShowModal(true)}>
                  <div className="w-full h-full inline-flex items-center font-normal">
                    <Settings width={13} className="mr-1" /> Update Profile
                  </div>
                </button>
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
                            <h1 className="text-3xl">Update Profile</h1>
                            <div className="update-form">
                            <form className="w-full px-4 pb-2 flex flex-col justify-center" onSubmit={handleFormSubmit}>
                              <input
                                type="text"
                                placeholder="Profile Picture URL"
                                value={userPic}
                                onChange={(e) => setUserPic(e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Update Location"
                                value={userLocation}
                                onChange={(e) => setUserLocation(e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Update Bio"
                                value={userBio}
                                onChange={(e) => setUserBio(e.target.value)}
                              />
                              <button className="primary mt-2">
                                Update
                              </button>
                            </form>
                            </div>
                          </div>
                        </div>
                      </div>
                     </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;