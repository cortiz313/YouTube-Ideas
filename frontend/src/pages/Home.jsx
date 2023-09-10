import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

// To continue with this, make sure you npm run dev frontend and backend

export const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/ideas")
      .then((response) => {
        setIdeas(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Ideas List</h1>
        <Link to="/ideas/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Idea</th>
              <th className="border border-slate-600 rounded-md">
                Views Median
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Likes Median
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Comments Median
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea, index) => (
              <tr key={idea._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {idea.idea}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {idea.viewsMedian}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {idea.likesMedian}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {idea.commentsMedian}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/ideas/details/${idea._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/ideas/edit/${idea._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/ideas/delete/${idea._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
