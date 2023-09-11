import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditIdea = () => {
  const [title, setTitle] = useState("");
  const [viewsMedian, setViewsMedian] = useState("");
  const [likesMedian, setLikesMedian] = useState("");
  const [commentsMedian, setCommentsMedian] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/ideas/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setViewsMedian(response.data.viewsMedian);
        setLikesMedian(response.data.likesMedian);
        setCommentsMedian(response.data.commentsMedian);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console.");
        console.log(error);
      });
  }, [id]); // maybe need to remove this

  const handleEditIdea = () => {
    const data = {
      title,
      viewsMedian,
      likesMedian,
      commentsMedian,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/ideas/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Idea</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Views Median</label>
          <input
            type="number"
            value={viewsMedian}
            onChange={(e) => setViewsMedian(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Likes Median</label>
          <input
            type="number"
            value={likesMedian}
            onChange={(e) => setLikesMedian(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Comments Median</label>
          <input
            type="number"
            value={commentsMedian}
            onChange={(e) => setCommentsMedian(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditIdea}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditIdea;
