import { useState, useRef, useEffect } from "react";
import { GoShield, GoShieldCheck } from "react-icons/go";
import { TreeNode } from "../TreeVisualizer";
import { tree } from "d3";

export default function IconSelectorButton({
  treeNode,
  setTreeData,
  data,
}: {
  treeNode: TreeNode;
  setTreeData: (data: TreeNode) => void;
  data: TreeNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const hasChildren = !!(treeNode.children?.length || treeNode._children?.length);

  // 🟢 Determine correct icon color based on node level
  const getDefaultIcon = () => {
    if (treeNode.level.toLowerCase() === "fortunately" && treeNode.statusColor === "green") {
      return <GoShieldCheck size={16} color="green" />;
    } else if (treeNode.level.toLowerCase() === "fortunately" && (treeNode.statusColor === "orange" || treeNode.statusColor === undefined)) {
      return <GoShieldCheck size={16} color="orange" />;
    } else if (treeNode.level.toLowerCase() === "unfortunately" && hasChildren) {
      return <GoShield size={16} color="orange" />;
    } else {
      return <GoShield size={16} color="red" />;
    }
  };

  const [selectedIcon, setSelectedIcon] = useState(getDefaultIcon);

  useEffect(() => {
    setSelectedIcon(getDefaultIcon());
  }, [treeNode.level]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconsGreen = [
    <GoShieldCheck size={16} color="orange" />,
    <GoShieldCheck size={16} color="green" />,
  ];

  const iconsRedNoChild = [
    <GoShield size={16} color="red" />,
    <GoShieldCheck size={16} color="blue" />,
  ];

  const iconsRedChild = [
    <GoShield size={16} color="orange" />,
    <GoShieldCheck size={16} color="green" />,
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="relative cursor-pointer text-black font-bold px-2 py-1 border rounded"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {selectedIcon}

        {hovered && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 z-50 bg-white p-1 rounded shadow">
            {(!treeNode.children && !treeNode._children) && treeNode.level.toLowerCase() === "unfortunately" && treeNode.status === GoShield && (
                <p className="text-xs text-black mt-1">Weakness</p>
            )}
            {(treeNode.children || treeNode._children) && treeNode.level.toLowerCase() === "unfortunately" && treeNode.status === GoShield && (
                <p className="text-xs text-black mt-1">Further investigation</p>
            )}
            {treeNode.status === GoShield && treeNode.level.toLowerCase() === "fortunately" && (
                <p className="text-xs text-black mt-1">Assumption to verify</p>
            )}
            {treeNode.status === GoShieldCheck && (!treeNode._children && !treeNode.children) && treeNode.level.toLowerCase() === "fortunately" && (
                <p className="text-xs text-black mt-1">Verified assumption</p>
            )}
            {treeNode.status === GoShieldCheck && (treeNode._children || treeNode.children) && (
                <p className="text-xs text-black mt-1">Completed node</p>
            )}
          </div>
        )}
      </button>



      {/* fortunately dropdown */}
      {open && treeNode.level.toLowerCase() === "fortunately" && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-black rounded-full flex space-x-2 px-3 py-2 shadow-lg z-50">
          {iconsGreen.map((icon, index) => (
            <button
              key={index}
              className="hover:bg-gray-300 p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon);
                treeNode.status = icon.type;
                treeNode.statusColor = icon.props.color;
                setTreeData({ ...data });
                setOpen(false);
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}

      {/* unfortunately node without children */}
      {open && treeNode.level.toLowerCase() === "unfortunately" && !hasChildren && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-black rounded-full flex space-x-2 px-3 py-2 shadow-lg z-50">
          {iconsRedNoChild.map((icon, index) => (
            <button
              key={index}
              className="hover:bg-gray-300 p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon);
                treeNode.status = icon.type;
                treeNode.statusColor = icon.props.color;
                setTreeData({ ...data });
                setOpen(false);
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}

      {/* unfortunately node with children */}
      {open && treeNode.level.toLowerCase() === "unfortunately" && hasChildren && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-black rounded-full flex space-x-2 px-3 py-2 shadow-lg z-50">
          {iconsRedChild.map((icon, index) => (
            <button
              key={index}
              className="hover:bg-gray-300 p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon);
                treeNode.status = icon.type;
                treeNode.statusColor = icon.props.color;
                setTreeData({ ...data });
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
