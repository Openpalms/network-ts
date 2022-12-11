import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className=" bg-[#50597b]  h-[500px] flex flex-col items-center rounded-md justify-around text-white">
      <Link
        to={'/settings'}
        className="hover:text-[#13a7ab] 
        hover:-mb-[4px]
        hover:border-b-4 border-[#13a7ab]	  transition-all "
      >
        settings
      </Link>
      <Link
        to={'/users'}
        className="hover:text-[#13a7ab] 
        hover:-mb-[4px]
        hover:border-b-4 border-[#13a7ab]	  transition-all "
      >
        Find friends!
      </Link>
      <p>Link</p>
      <p>Link</p>
      <p>Link</p>
    </div>
  );
};

export default Sidebar;
