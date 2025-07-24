"use client";
import { assets } from "@/public/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import handleNewChat from "@/ExportFunc";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [expand, setExpand] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedChat, createNewChat, user } = useAppContext();
  const containerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(true);
    // Auto-hide after 2 seconds

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="relative flex flex-1 flex-col items-center justify-center bg-[rgb(255,233,221)] px-4 pb-8 text-white">
          <div className="absolute top-6 flex w-full items-center justify-between px-4 md:hidden">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt="menu icon"
            />
            <Image
              onClick={() => handleNewChat({ user, createNewChat })}
              className="mt-2 opacity-70"
              src={assets.chat_icon}
              alt="chat icon"
            />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center gap-16">
                <div
                  onClick={handleClick}
                  className={`group relative mt-26 flex cursor-pointer items-center justify-center gap-2 overflow-visible rounded-xl border-[2px] p-3 text-center text-sm font-bold text-black hover:border-[#fd5c02] sm:w-auto sm:gap-4 sm:text-lg md:mt-14 md:px-6 md:py-2 md:text-xl lg:text-2xl 2xl:text-3xl ${showTooltip ? "border-[#fd5c02]" : "border-[#ffa774]"}`}
                >
                  <Image src={assets.fire} className="size-7" alt="fire gif" />
                  Join $ROBOT Fairlaunch
                  <ArrowRight
                    className={`ml-2 size-6 transition-transform group-hover:translate-x-1 ${showTooltip ? "translate-x-1" : "translate-x-0"}`}
                  />
                  <span
                    className={`absolute left-1/2 z-10 -translate-x-1/2 rounded bg-[#ff6b6b] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-top-10 group-hover:opacity-100 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-x-4 before:border-t-4 before:border-x-transparent before:border-t-[#ff6b6b] before:content-[''] ${showTooltip ? "-top-10 opacity-100" : "top-0 opacity-0"}`}
                  >
                    Coming Soon!
                  </span>
                </div>

                <div className="flex-center flex flex-col gap-2">
                  <div className="flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center lg:justify-center">
                    <Image
                      src={assets.favicon}
                      width={60}
                      alt=""
                      className="mb-2 rounded-full lg:-mt-2 lg:w-12"
                    />
                    <p className="mb-2 text-3xl font-bold text-black">
                      Hi, I'm Atlas.
                    </p>
                  </div>

                  <p className="mb-10 text-xl font-medium text-gray-600">
                    How can i help you today?
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <div className="relative flex items-center justify-center mt-10"> */}
              <div
                onClick={handleClick}
                className={`group relative mt-26 flex cursor-pointer items-center justify-center gap-2 overflow-visible rounded-xl border-[2px] p-3 text-center text-sm font-bold text-black hover:border-[#fd5c02] sm:w-auto sm:gap-4 sm:text-lg md:mt-14 md:px-6 md:py-2 md:text-xl lg:text-2xl 2xl:text-3xl ${showTooltip ? "border-[#fd5c02]" : "border-[#ffa774]"}`}
              >
                <Image src={assets.fire} className="size-7" alt="fire gif" />
                Join $ROBOT Fairlaunch
                <ArrowRight
                  className={`ml-2 size-6 transition-transform group-hover:translate-x-1 ${showTooltip ? "translate-x-1" : "translate-x-0"}`}
                />
                <span
                  className={`absolute left-1/2 z-10 -translate-x-1/2 rounded bg-[#ff6b6b] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-top-10 group-hover:opacity-100 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-x-4 before:border-t-4 before:border-x-transparent before:border-t-[#ff6b6b] before:content-[''] ${showTooltip ? "-top-10 opacity-100" : "top-0 opacity-0"}`}
                >
                  Coming Soon!
                </span>
              </div>
              <div
                ref={containerRef}
                className="relative mt-6 flex max-h-screen w-full flex-col items-center justify-start overflow-y-auto"
              >
                <p className="mb-6 rounded-lg border border-transparent px-2 py-1 text-xl font-semibold text-black hover:border-[#fd5c02]">
                  {selectedChat.name}
                </p>
                {messages.map((msg, index) => (
                  <Message key={index} role={msg.role} content={msg.content} />
                ))}
                {isLoading && (
                  <div className="flex w-full max-w-3xl gap-4 py-3">
                    <Image
                      className="h-9 w-9 rounded-full border border-white/15 p-1"
                      src={assets.favicon}
                      alt="Logo"
                    />
                    <div className="loader flex items-center justify-center gap-1">
                      <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
                      <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
                      <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}
