import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className=" bg-[#04724D] w-[100%] h-[500px] flex flex-col items-center rounded-md justify-around text-white uppercase">
      <Link
        to={'/settings'}
        className="hover:text-[#13a7ab]
        hover:-mb-[4px]
        hover:border-b-4 border-[#13a7ab]	  transition-all 
        "
      >
        settings
      </Link>

      <Link
        to={'/users'}
        className="hover:text-[#13a7ab] 
        hover:-mb-[4px]
        hover:border-b-4 border-[#13a7ab]	  transition-all 
        "
      >
        users
      </Link>
      <Link
        to={'/messages'}
        className="hover:text-[#13a7ab] 
        hover:-mb-[4px]
        hover:border-b-4 border-[#13a7ab]	  transition-all 
        "
      >
        messages
      </Link>
    </div>
  );
};

export default Sidebar;
