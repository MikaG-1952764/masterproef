import { useState, useRef, useEffect } from "react";
import { GoShield, GoShieldCheck } from "react-icons/go";
import { TreeNode } from "../TreeVisualizer";

export default function IconSelectorButton({treeNode} : {treeNode: TreeNode}) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(<GoShield size={16} />);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const icons = [
    <GoShield size={16} color="black"/>,
    <GoShieldCheck size={16} color="black"/>,
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="cursor-pointer text-black font-bold px-2 py-1 border rounded"
        onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
        }}
      >
        {selectedIcon}
      </button>

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-black rounded-full flex space-x-2 px-3 py-2 shadow-lg z-50">
          {icons.map((icon, index) => (
            <button
              key={index}
              className="hover:bg-red p-1 rounded-full"
              onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIcon(icon);
                    treeNode.status=icon.type;
                    setOpen(false);
                }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
