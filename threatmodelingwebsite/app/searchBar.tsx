import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { TreeNode } from "./TreeVisualizer";

interface SearchBarProps {
  treeData: TreeNode;
  setHighlightedNodes: (nodes: TreeNode[]) => void;
}

function searchTree(node: TreeNode, term: string, matches: TreeNode[] = []): TreeNode[] {
  if (node.name.toLowerCase().includes(term.toLowerCase())) {
    matches.push(node);
  }

  if (node.children) {
    node.children.forEach(child => searchTree(child, term, matches));
  }

  return matches;
}

export default function SearchBar({ treeData, setHighlightedNodes }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term: string) => {
    if (term.trim() === '') {
      setHighlightedNodes([]);
      return;
    }

    const matches = searchTree(treeData, term);
    setHighlightedNodes(matches);
  }, [treeData, setHighlightedNodes]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleInputChange}
      id="outlined-basic"
      variant="outlined"
      fullWidth
      label="Search for node"
    />
  );
}
