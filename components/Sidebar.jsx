import { assets } from "@/public/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLabel from "./ChatLabel";
import handleNewChat from "@/ExportFunc";
import SocialIcons from "./SocialIcons";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignUp, openUserProfile } = useClerk();

  const { user = {}, chats, createNewChat } = useAppContext();

  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  useEffect(() => {
    if (!user) {
      openSignUp();
    }
  }, [user]);
const handleSidebarOpen = (e) =>{

  if(screen.availWidth <= 1024 ){
setExpand(false)
  }

}

  useEffect(()=>{
    window.addEventListener("resize",handleSidebarOpen)
    window.addEventListener("load",handleSidebarOpen)
    return ()=>{
          window.removeEventListener("resize",handleSidebarOpen)
    window.removeEventListener("load",handleSidebarOpen)
    }
  },[])
  return (
    <div
      className={`z-50 flex flex-col justify-between bg-[rgb(254,199,167)] pt-7 transition-all max-md:absolute max-md:h-screen ${
        expand ? "w-66 p-4 lg:w-90 2xl:w-100" : "w-0 max-md:overflow-hidden md:w-20 pb-5"
      }`}
    >
      <div>
        <div
          className={`flex ${
            expand
              ? "flex-row items-center justify-between"
              : "flex-col items-center gap-8"
          }`}
        >
          <Image
            className={`${expand ? "w-36 lg:w-50" : "w-10 rounded-full"} cursor-pointer`}
            src={expand ? assets.logo_text : assets.favicon}
            alt={expand ? "logo_text" : "logo_icon"}
          />

          <div
            onClick={() => (expand ? setExpand(false) : setExpand(true))}
            className="group relative flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-500/20"
          >
            <Image
              src={assets.menu_icon}
              alt="menu icon"
              className="md:hidden"
            />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt={expand ? "sidebar_close_icon" : "sidebar_icon"}
              className="hidden w-7 md:block"
            />
            <div
              className={`absolute w-max ${
                expand ? "top-12 left-1/2 -translate-x-1/2" : "-top-12 left-0"
              } pointer-events-none rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 shadow-lg transition group-hover:opacity-100`}
            >
              {expand ? "Close sidebar" : "Open sidebar"}
              <div
                className={`absolute h-3 w-3 rotate-45 bg-black ${
                  expand
                    ? "-top-1.5 left-1/2 -translate-x-1/2"
                    : "-bottom-1.5 left-4"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleNewChat({ user, createNewChat })}
          className={`mt-8 flex cursor-pointer items-center justify-center ${
            expand
              ? "bg-primary w-max gap-2 rounded-xl px-4 py-2 hover:opacity-90"
              : "group relative mx-auto h-9 w-9 rounded-lg hover:bg-gray-500/30"
          }`}
        >
          {!expand && (
            <Image className="w-7" src={assets.chat_icon} alt="chat-icon" />
          )}

          <div className="shaow-lg pointer-events-none absolute -top-12 -right-12 w-max rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 transition group-hover:opacity-100">
            New chat
            <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 bg-black"></div>
          </div>
          {expand && <p className="text font-medium text-white">New chat</p>}
        </button>

        <div
          className={`mt-8 text-sm text-black ${expand ? "block" : "hidden"}`}
        >
          <p className="mt-1 mb-6 text-lg">Recents</p>
          {chats.map((chat, index) => (
            <ChatLabel
              key={index}
              name={chat.name}
              id={chat._id}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      </div>
      <div>
        {/* Social Icons */}
        {expand && <SocialIcons />}

        {/* Profile Section */}
        <div
          onClick={() => (user ? openUserProfile() : openSignUp())}
          className={`flex items-center ${
            expand ? "rounded-lg hover:bg-[#fd5c02]" : "w-full justify-center"
          } mt-2 cursor-pointer gap-3 p-2 text-xl font-bold text-black`}
        >
          {user ? (
            <UserButton className='w-10' />
          ) : (
            <Image
              src={assets.profile_icon}
              alt="profile_icon"
              
            />
          )}

          {expand && !user ? (
            <span>Login Atlas</span>
          ) : (
            expand && user && <span>Profile</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
