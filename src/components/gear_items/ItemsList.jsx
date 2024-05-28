import React, { useEffect, useState } from "react";

import { useAppContext } from "../../store/AppContext";
import Item from "./Item";

const ItemsList = () => {
  const [itemsData, setItemsData] = useState(null);

  const { items } = useAppContext();

  useEffect(() => {
    if (items) {
      setItemsData(items);
    }
  }, []);

  if (items) {
    return (
      <>
        <div className="wrapper container mx-auto mt-5 py-3">
          <div className=" divider uppercase text-light dark:text-dark font-extrabold text-2xl">
            Items
          </div>
          <div className="row py-5">
            <div className="columns-1 md:columns-2 lg:columns-3">
              {itemsData &&
                itemsData.map((item) => (
                  <Item key={item.additional_info["Unique ID"]} item={item} />
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default ItemsList;
