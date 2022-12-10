import Posts from '../components/Posts';
const MainPage = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-[70vw]  bg-[#50597b]  rounded-xl flex justify-around">
          <div className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
            <img
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              className="w-40 h-40 rounded-md"
              alt="avatar"
            />
            <p className="mt-10">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              harum corporis praesentium vel tempore. In debitis et quod quos,
              consequuntur numquam iure id doloribus repudiandae veniam nemo
              voluptates minus est.
            </p>
          </div>
          <div className="flex flex-col justify-start w-[50%] p-10 text-white ">
            <p className="font-bold text-2xl ">Daniil galochkin</p>
            <p className="pt-5 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem nobis quae atque blanditiis officiis, ad laborum
              expedita consectetur. Facere, vero.{' '}
            </p>
            <p className="pt-5 text-lg">posts:</p>
            <Posts />
            <button className="border bg-[#13a7ab]">add post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
