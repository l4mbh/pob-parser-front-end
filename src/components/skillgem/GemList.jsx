import React from "react";
import { useAppContext } from "../../store/AppContext";
import GemGroup from "./GemGroup";

const GemList = () => {
  const { skillGems } = useAppContext();

  return (
    skillGems && (
      <>
        <div className="bg-content1 h-auto rounded-sm dark:bg-backgroundPrimary mt-10">
          <div className=" divider uppercase text-light dark:text-dark font-extrabold text-2xl">
            Gems
          </div>
          <div className="row">
            <ul className="text-light dark:text-dark md:columns-2 lg:columns-3 sm:items-center">
              {skillGems.map((gem) => (
                <GemGroup key={gem.slot} gem={gem} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  );
};

export default GemList;
