import toast from "react-hot-toast";

const handleNewChat = ({ user, createNewChat }) => {
  if (!user) {
    toast.error("Login to Create Message");
  } else {
    createNewChat();
  }
};

export default handleNewChat;
