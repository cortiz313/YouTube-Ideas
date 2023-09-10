import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export const ShowIdea = () => {
  const [idea, setIdea] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/ideas/${id}`)
      .then((response) => {
        setIdea(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // fixed from video, needed to add id to dependency array

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Idea</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{idea._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Idea</span>
            <span>{idea.idea}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Views Median</span>
            <span>{idea.viewsMedian}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Likes Median</span>
            <span>{idea.likesMedian}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Comments Median</span>
            <span>{idea.commentsMedian}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(idea.createdAt).toString()}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(idea.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowIdea;
