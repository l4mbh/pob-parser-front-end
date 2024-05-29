import React, { useEffect, useState } from "react";

const ToTop = ({ propClasses }) => {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`z-10 transition-all group hover:cursor-pointer ${propClasses} fixed bottom-20 right-5 bg-black dark:bg-light rounded-sm dark:text-light text-white p-2 uppercase font-fontin`}
      onClick={toTop}
    >
      <i class="group-hover:text-light/95 dark:group-hover:text-black  fa-solid fa-chevron-up"></i>
    </div>
  );
};

export default ToTop;
