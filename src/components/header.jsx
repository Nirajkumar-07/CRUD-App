import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import placeholderImage from "../assets/images/product-placeholder.jpg";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="flex justify-between py-3 border-b bg-gray-100 px-2 lg:px-4">
      <h2 className="font-bold text-xl">CRUD App</h2>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center px-2">
          <Avatar className="size-8">
            <AvatarImage src={user.image || placeholderImage} />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>
          {user.firstName}
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={14} className="bg-white">
          <DropdownMenuItem onClick={handleLogout} className="bg-white">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
