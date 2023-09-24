import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export const IdeasTable = ({ ideas }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md">Views</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Likes
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Comments
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Upload Date
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Subscribers
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            More Views Than Subs
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
              {idea.title}
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
  );
};

export default IdeasTable;
