import React from "react";

const Gem = ({ gem }) => {
  const POE_TRADE_URL = import.meta.env.VITE_POE_TRADE_HOST;

  const getGemColor = (gemAttr) => {
    switch (gemAttr) {
      case "strength":
        return "text-str";
      case "dexterity":
        return "text-dex";
      case "intelligence":
        return "text-int";
      default:
        return "";
    }
  };


  // replace string "Abc of efg" to "Abc"
  const getGemType = () => {
    if (gem.skillId.includes("AltY")) {
      return {
        option: `${gem.name.replace(/^(.+) of (.+)$/, "$1")}`,
        discriminator: "alt_y",
      };
    } else if (gem.skillId.includes("AltX")) {
      return {
        option: `${gem.name.replace(/^(.+) of (.+)$/, "$1")}`,
        discriminator: "alt_x",
      };
    }
    return `${gem.name}`;
  };

  const gemSearch = () => {
    const gemSearchQuery = {
      query: {
        status: {
          option: "online",
        },
        type: getGemType(),
        stats: [
          {
            type: "and",
            filters: [],
          },
        ],
        filters: {
          misc_filters: {
            filters: {
              quality: {
                min: `${gem.quality}`,
              },
              gem_level: {
                min: `${gem.level}`,
              },
            },
          },
        },
      },
      sort: {
        price: "asc",
      },
    };

    // console.log(gemSearchQuery);

    return window.open(
      `${POE_TRADE_URL}/search?q=${JSON.stringify(gemSearchQuery)}`,
      "_blank"
    );
  };

  return (
    <div
      title={gem.name}
      onClick={gemSearch}
      className="group transition-all  hover:cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-300 mx-2 p-1 rounded-md flex items-center justify-between"
    >
      <div className="flex flex-row items-center">
        <span>
          <img
            className="mx-1"
            src={gem.gemIconUrl}
            width={24}
            height={24}
            alt={gem.name}
          />
        </span>
        <span
          className={` font-fontin text-lg mx-3 ${getGemColor(
            gem["primary attribute"]
          )}`}
        >
          {gem.name}
        </span>
      </div>
      <span className="float-right text ml-3 font-bold group-hover:text-slate-600">
        {gem.level + "/" + gem.quality}
      </span>
    </div>
  );
};

export default Gem;
