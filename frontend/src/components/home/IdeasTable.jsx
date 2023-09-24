import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export const IdeasTable = ({ videos }) => {
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
        {videos.map((video, index) => (
          <tr key={video.id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {video.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {video.views}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {video.likes}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {video.comments}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {video.uploadDate}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {video.subscribers}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {video.moreViewsThanSubscribers ? "Yes" : "No"}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/ideas/details/${video.id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/ideas/edit/${video.id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/ideas/delete/${video.id}`}>
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
