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

  return <div>Home</div>;
};

export default Home;
