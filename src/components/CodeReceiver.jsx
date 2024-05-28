import React, { useCallback, useMemo, useState } from "react";
import { useAppContext } from "../store/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const CodeReceiver = () => {
  const [enteredCode, setEnteredCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSkillGems, setItems, setNotes, appLoading, setAppLoading } = useAppContext();

  const PARSER_HOST = import.meta.env.VITE_PARSER_HOST;
  const CORS_HOST = import.meta.env.VITE_CORS_HOST;

  const codeReceiverHandler = (e) => {
    setEnteredCode(e.target.value);
  };

  const fetchItemData = async (skillId, toastId) => {
    try {
      const response = await axios.get(
        `${CORS_HOST}/https://www.poewiki.net/w/api.php?action=cargoquery&tables=skill_gems,skill,items&where=skill.skill_id="${skillId}"&fields=primary_attribute,name,inventory_icon,skill_id&format=json&join_on=skill._pageID=skill_gems._pageID,skill._pageID=items._pageID`
      );

      const extraData = response.data.cargoquery[0].title;
      extraData["inventory icon"] = extraData["inventory icon"].replace(/^File:/, "");

      const imageResponse = await axios.get(
        `${CORS_HOST}/https://www.poewiki.net/w/api.php?action=query&titles=Image:${extraData["inventory icon"]}&prop=imageinfo&iiprop=url&format=json`
      );

      const pageIds = Object.keys(imageResponse.data.query.pages);
      const imgUrl = imageResponse.data.query.pages[pageIds[0]].imageinfo[0].url;
      extraData.gemIconUrl = imgUrl;

      return extraData;
    } catch (error) {
      toast.update(toastId, {
        render: "Error fetching item data",
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
      });
      throw error;
    }
  };

  const trimItemData = (itemData) => {
    return itemData.map((item) => {
      return item["_"]
    });
  }

  const parseItemData = (itemData) => {
    return itemData.map((item) => {
      const itemInfo = item.trim().split("\n").map((line) => line.trim());
      const parsedItem = {
        rarity: itemInfo[0].split(": ")[1].trim(),
        item_name: itemInfo[1].trim(),
        item_base_name: itemInfo[2].trim(),
        implicits: [],
        fractured: [],
        crafted: [],
        enchant: [],
        pseudo: [],
        additional_info: {},
        item_specific_mods: []
      };

      const implicitsCount = parseInt(item.match(/Implicits: (\d+)/)[1]);
      itemInfo.forEach((line, index) => {
        if (line.startsWith("Implicits:")) {
          for (let i = 1; i <= implicitsCount; i++) {
            parsedItem.implicits.push(itemInfo[index + i]);
          }
        } else if (line.includes("{fractured}")) {
          parsedItem.fractured.push(line.replace("{fractured}", "").trim());
        } else if (line.includes("{crafted}")) {
          if(!parsedItem.implicits.includes(line)) {
            parsedItem.crafted.push(line.replace("{crafted}", "").trim());
          }
        } else if (line.includes("{enchant}")) {
          parsedItem.enchant.push(line.replace("{enchant}", "").trim());
        } else if (/[+\-%]/.test(line)) {
          if (!line.includes("{fractured}") && !line.includes("{crafted}") && !line.includes("{enchant}") && !parsedItem.implicits.includes(line.trim())) {
            parsedItem.pseudo.push(line.trim());
          }
        } else if (line.includes(":")) {
          const [key, value] = line.split(":").map((str) => str.trim());
          parsedItem.additional_info[key] = value;
        } else if(!line.includes(parsedItem.item_name) && !line.includes(parsedItem.item_base_name)) {
          parsedItem.item_specific_mods.push(line.trim());
        }
      });

      return parsedItem;
    });
  };

  const transformData = useCallback(async (data, toastId, totalGems) => {
    const result = [];
    let currentGem = 0;
    for (const groupObj of data) {
      const group = groupObj.$;
      const slot = group.slot;

      let groupData = result.find(item => item.slot === slot);
      if (!groupData) {
        groupData = { slot, gems: [] };
        result.push(groupData);
      }

      for (const gemObj of groupObj.Gem) {
        ++currentGem;
        const gem = gemObj.$;
        toast.update(toastId, {
          render: `Getting data [ ${currentGem}/${totalGems} ] ...`,
          type: "loading",
          autoClose: 2000,
          isLoading: true,
          closeOnClick: false,
        });

        const extraData = await fetchItemData(gem.skillId, toastId);
        groupData.gems.push({ ...group, ...gem, ...extraData });
      }
    }

    return result;
  });

  const pobParser = async (postData) => {
    try {
      const response = await fetch(`${CORS_HOST}/${PARSER_HOST}/pob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: postData })
      });

      if (!response.ok) throw new Error("Failed to parse PoB data");
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: " + error.message);
      throw error;
    }
  };


  const fetchPobData = useCallback( async (pobbUrl, toastId) => {
    toast.update(toastId, {
      render: "Getting Pobb.in data...",
      type: "loading",
      autoClose: 2000,
      isLoading: true,
      closeOnClick: false,
    });

    try {
      const res = await axios.get(`${CORS_HOST}/${pobbUrl}/raw`);
      if (res.statusText !== "OK") throw new Error("Invalid Pobb.in URL or data not found!");
      return res.data;
    } catch (error) {
      toast.update(toastId, {
        render: "Error fetching Pobb.in data",
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
      });
      console.error("Error fetching Pobb.in data:", error);
      throw error;
    }
  });

  const codeConverter = useCallback(async () => {
    if (!enteredCode) return toast.error("Please enter a valid code");
    setIsLoading(true);
    setAppLoading(true);
    const toastId = toast.loading("Loading...");

    try {
      let pobData;
      if (enteredCode.startsWith("https://pobb.in/")) {
        pobData = await fetchPobData(enteredCode, toastId);
      } else {
        pobData = enteredCode;
      }

      const parsedData = await pobParser(pobData);

      
      
      setNotes(parsedData.notes[0]);
      
      toast.update(toastId, {
        render: "Transforming data...",
        type: "loading",
        autoClose: 2000,
        isLoading: true,
        closeOnClick: false,
      });
      
      let totalGems = 0;
      parsedData.skills.forEach((skill) => {
        totalGems += skill.Gem.length;
      });

      console.log(totalGems);
      console.log(parsedData);
      const trimmedItemData = trimItemData(parsedData.items);
      const itemData = parseItemData(trimmedItemData);
      setItems(itemData);

      const transformedData = await transformData(parsedData.skills, toastId, totalGems);
      setSkillGems(transformedData);

      toast.update(toastId, {
        render: "Done!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
      });

      setEnteredCode("");
    } catch (error) {
      console.log(error)
      toast.update(toastId, {
        render: "Failed to fetch data!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
      });
    } finally {
      setIsLoading(false);
      setAppLoading(false);
    }
  });

  return (
    <div className="mt-5 w-full  bg-content1 dark:bg-backgroundPrimary rounded-lg shadow-xl p-2">
      <h1 className="text-light dark:text-dark font-bold">Enter the code:</h1>
      <p className="text-sm italic my-1 text-slate-400 dark:text-dark">
        Can be PoB export code / Pobb.in URL
      </p>
      <textarea
        onChange={codeReceiverHandler}
        value={enteredCode}
        id="code"
        disabled={isLoading}
        className="outline-none focus:outline-slate-700 w-full min-h-40 max-h-40 p-2 rounded-md hide-scrollbar text-light dark:text-dark bg-light border border-gray-400 dark:bg-dark"
      ></textarea>
      <button
        disabled={isLoading}
        className={`btn ${appLoading ? "btn-loading" : "btn-solid-primary"} mx-auto`}
        onClick={() => codeConverter()}
      >
        {!appLoading ? "Start" : "Loading"}
      </button>
    </div>
  );
};

export default CodeReceiver;
