import React from "react";

const openGithub = () => {
  window.open("https://github.com/l4mbh/pob-parser-front-end", "_blank");
};

const Footer = () => {
  return (
    <div className="w-screen bottom-0 flex justify-between items-center bg-black p-2 md:p-5">
      <p>Copyright &copy; 2024 - l4mbh</p>
      <p onClick={openGithub} title="Github"><i className="fa-brands fa-github text-2xl hover:cursor-pointer"></i></p>
    </div>
  );
};

export default Footer;
