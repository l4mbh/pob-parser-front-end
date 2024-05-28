import React from "react";
import { useAppContext } from "../../store/AppContext";
import notesUtils from "../../utils/Notes";

const Notes = () => {
  const { notes } = useAppContext();

  if (notes) {
    const notesHTML = notesUtils(notes);
    const notesContent = document.getElementById("notesContent");
    if (notesContent) {
      document.getElementById("notesContent").innerHTML = notesHTML;
    }
    return (
      <div className="bg-content1 dark:bg-backgroundPrimary h-auto rounded-md mt-10 mb-20 p-2">
        <div className="divider text-light dark:text-dark font-extrabold text-2xl my-2">
          NOTES
        </div>
        <div className="text-light dark:text-dark" id="notesContent"></div>
      </div>
    );
  }
  return null;
};

export default Notes;
