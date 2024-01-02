import React from "react";

const Card = ({title, message}) => {
    
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        {/* <input type="text" name="" placeholder="Title" id="" className="bg-transparent w-full py-2 outline-none text-2xl"/> */}
        {title}
        {/* <textarea
          name=""
          placeholder="Take a note..."
          id=""
          cols="30"
          rows="10"
          className="bg-transparent w-full py-2 outline-none"
        ></textarea> */}
        {message}
      </div>
      <div class="px-6 pt-4 pb-2 flex justify-between items-center">
        <span>May 21,2023</span>
        <button className="bg-black rounded-md p-1 w-3/12 text-white">Done</button>
      </div>
    </div>
  );
};

export default Card;
