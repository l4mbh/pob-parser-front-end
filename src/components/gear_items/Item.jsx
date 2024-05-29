import React, { memo, useState } from "react";

const Item = ({ item }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleIsCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      {item && (
        <div
          onClick={toggleIsCollapsed}
          className={`hover:shadow-xl w-100 rounded-md group hover:border-white transition-all bg-light-800 dark:bg-backgroundPrimary item-name mx-auto mb-3 p-2 shadow-md font-fontin hover:cursor-pointer break-after-avoid-all break-inside-avoid-column`}
        >
          <div className="break-inside-avoid-column flex items-center">
            <div className="">
              <img
                className="object-contain h-20 w-20"
                src={item.item_img_url}
                alt=""
              />
            </div>
            <div className={`w-100  font-bold item-name mx-auto mt-3 p-2`}>
              <div className={`text-center`}>
                <div
                  className={`${item.rarity === "UNIQUE" && "text-amber-600"} ${
                    item.rarity === "RARE" && "text-yellow-500"
                  } ${item.rarity === "MAGIC" && "text-blue-500"}`}
                >
                  {item.item_name}
                  {item.item_base_name &&
                  !item.item_base_name.includes("Unique")
                    ? `, ${item.item_base_name}`
                    : ""}
                </div>
                {/* <div
                  className={`${item.rarity === "UNIQUE" && "text-amber-600"} ${
                    item.rarity === "RARE" && "text-yellow-400"
                  } ${item.rarity === "MAGIC" && "text-blue-500"}`}
                >
                  {!item.item_base_name.includes("Unique")
                    ? `${item.item_base_name}`
                    : ""}
                </div> */}
              </div>
            </div>
          </div>
          {!isCollapsed && (
            <div
              className={`transition-transform animate-[drop-down_0.5s_ease-in-out] `}
            >
              <div>
                <div
                  className={`mods text-center text-blue-500  font-fontin bg-opacity-75`}
                >
                  <div className={`mt-2`}>
                    {(item.implicits.length > 0 || item.enchant.length > 0) && (
                      <div className="divider m-0"></div>
                    )}
                    {item.implicits.length > 0 &&
                      item.implicits.map((imp) => (
                        <>
                          <p
                            className={`${
                              imp.includes("Allocates") ||
                              imp.includes("{crafted}")
                                ? "text-blue-300"
                                : ""
                            }`}
                          >
                            {imp.replace("{crafted}", "")}
                          </p>
                        </>
                      ))}
                    {item.enchant.length > 0 &&
                      item.enchant.map((enchantMod) => {
                        return (
                          <>
                            <p>{enchantMod}</p>
                          </>
                        );
                      })}
                  </div>
                  <div className="explicits">
                    <div className="divider m-0"></div>
                    {item.pseudo.map((explicits) => {
                      return (
                        <>
                          <p>{explicits}</p>
                        </>
                      );
                    })}
                    {item.fractured.map((explicits) => {
                      return (
                        <>
                          <p>{explicits}</p>
                        </>
                      );
                    })}

                    {item.item_specific_mods.map((explicits) => {
                      return (
                        <>
                          <p
                            className={`${
                              explicits.includes("Cannot Be") && "text-blue-300"
                            } ${
                              explicits.includes("Corrupted") && "text-rose-800"
                            }`}
                          >
                            {explicits}
                          </p>
                        </>
                      );
                    })}
                    {item.crafted.map((explicits) => {
                      return (
                        <>
                          <p className="text-blue-300">{explicits}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const ItemMemo = memo(Item);

export default ItemMemo;
