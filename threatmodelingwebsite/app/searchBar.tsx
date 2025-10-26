import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { TreeNode } from "./TreeVisualizer";

interface SearchBarProps {
  treeData: TreeNode;
  setHighlightedNodes: (nodes: TreeNode[]) => void;
  setCurrentNode: (node: TreeNode) => void; // new prop
}

function searchTree(
  node: TreeNode,
  term: string,
  matches: TreeNode[] = []
): TreeNode[] {
  if (node.name.toLowerCase().includes(term.toLowerCase())) {
    matches.push(node);
  }

  if (node.children) {
    node.children.forEach((child) => searchTree(child, term, matches));
  }

  return matches;
}

export default function SearchBar({
  treeData,
  setHighlightedNodes,
  setCurrentNode,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [matches, setMatches] = useState<TreeNode[]>([]);

  const handleSearch = useCallback(
    (term: string) => {
      if (term.trim() === "") {
        setHighlightedNodes([]);
        setMatches([]);
        setHighlightIndex(0);
        setCurrentNode(undefined as any); // clear current node
        return;
      }

      const found = searchTree(treeData, term);
      setMatches(found);
      setHighlightedNodes(found);
      setHighlightIndex(0);

      if (found.length) {
        setCurrentNode(found[0]); // scroll to first match
      }
    },
    [treeData, setHighlightedNodes, setCurrentNode]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && matches.length > 0) {
      const nextIndex = (highlightIndex + 1) % matches.length;
      setHighlightIndex(nextIndex);
      setCurrentNode(matches[nextIndex]); // scroll to next match
    }
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      id="outlined-basic"
      variant="outlined"
      fullWidth
      label="Search for node"
      slotProps={{
        input: {
          style: {
            backgroundColor: "#9e9e9ed2",
            borderRadius: "6px",
          },
        },
      }}
    />
  );
}
