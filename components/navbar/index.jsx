import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between mt-2 mx-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-lg text-gray-400">
            ChatGPT <FaAngleDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align={"start"}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
