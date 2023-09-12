import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { IdeaSingleCard } from "./IdeaSingleCard";

export const IdeasCard = ({ ideas }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {ideas.map((item) => (
        <IdeaSingleCard key={item._id} idea={item} />
      ))}
    </div>
  );
};

export default IdeasCard;
