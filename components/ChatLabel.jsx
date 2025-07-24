import { assets } from "@/public/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ChatLabel = ({ openMenu, setOpenMenu, id, name }) => {
  const { fetchUsersChats, chats, setSelectedChat } = useAppContext();

  const selectChat = () => {
    const chatData = chats.find((chat) => chat._id === id);
    setSelectedChat(chatData);
  };

  const renameHandler = async () => {
    try {
      const newName = prompt("Enter new name");
      if (!newName) return;
      const { data } = await axios.post("/api/chat/rename", {
        chatId: id,
        name: newName,
      });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this chat?",
      );
      if (!confirm) return;
      const { data } = await axios.post("/api/chat/delete", { chatId: id });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleMouseOver = (e) => {
    if (document.querySelector(".ChatActiveStyle")) {
      document
        .querySelector(".ChatActiveStyle")
        .classList.remove("ChatActiveStyle");
    }
    if (!e.currentTarget.classList.contains("ChatActiveStyle")) {
      e.currentTarget.classList.add("ChatActiveStyle");
    }
  };

  return (
    <div
      onClick={selectChat}
      onMouseOver={handleMouseOver}
      className="hover:bg-primary group flex cursor-pointer items-center justify-between rounded-lg p-2 text-[16px] text-black"
    >
      <p className="truncate group-hover:max-w-5/6">{name}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu({ id: id, open: !openMenu.open });
        }}
        className="group relative flex aspect-square h-6 w-6 items-center justify-center rounded-lg hover:bg-black/80"
      >
        <Image
          src={assets.three_dots}
          alt="three dots"
          id="three-dot"
          className={`w-4 ${
            openMenu.id === id && openMenu.open ? "" : "hidden"
          } `}
        />
        <div
          className={`absolute ${
            openMenu.id === id && openMenu.open ? "block" : "hidden"
          } bg-primary top-10 -right-3 w-max rounded-xl p-2 lg:top-6 lg:-right-40`}
        >
          <div
            onClick={renameHandler}
            className="group hover:bg-secondary flex items-center gap-3 rounded-lg px-3 py-2"
          >
            <Image src={assets.pencil_icon} alt="pencil icon" className="w-5" />

            <p className="">Rename</p>
          </div>
          <div
            onClick={deleteHandler}
            className="hover:bg-secondary flex items-center gap-3 rounded-lg px-3 py-2"
          >
            <Image src={assets.delete_icon} alt="delete icon" className="w-5" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
