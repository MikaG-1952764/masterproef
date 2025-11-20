import { TreeNode } from "../TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

/**
 * Haal alle laatste rode ('unfortunate') nodes op uit de boomstructuur.
 */
export function getLastRedNodes(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return;

    const allChildren = [
      ...(current.children || []),
      ...(current._children || []),
    ];
    const hasChildren = allChildren.length > 0;

    // red leaf
    if (current.level === "unfortunate" && !hasChildren) {
      result.push(current);
    }

    allChildren.forEach(child => traverse(child));
  }

  traverse(node);
  result.sort((a, b) => (b.dangerRating || 0) - (a.dangerRating || 0));
  console.log(result);
  return result;
}

/**
 * Rode nodes met kinderen (nog te controleren)
 */
export function getRedNodesToCheck(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return;

    const allChildren = [
      ...(current.children || []),
      ...(current._children || []),
    ];
    const hasChildren = allChildren.length > 0;

    if (current.level === "unfortunate" && hasChildren) {
      result.push(current);
    }

    allChildren.forEach(child => traverse(child));
  }

  traverse(node);
  console.log(result);
  return result;
}

/**
 * Groene nodes met schildstatus die nog gecontroleerd moeten worden
 */
export function getGreenNodesToCheck(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return;

    const allChildren = [
      ...(current.children || []),
      ...(current._children || []),
    ];

    if (current.level === "fortunate" && current.status === GoShield) {
      result.push(current);
    }

    allChildren.forEach(child => traverse(child));
  }

  traverse(node);
  console.log(result);
  return result;
}

/**
 * Laatste groene nodes (zonder kinderen) die als voltooid zijn gemarkeerd
 */
export function getLastGreenNodesFinished(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return;

    const allChildren = [
      ...(current.children || []),
      ...(current._children || []),
    ];
    const hasChildren = allChildren.length > 0;

    if (
      current.level === "fortunate" &&
      !hasChildren &&
      current.status === GoShieldCheck
    ) {
      result.push(current);
    }

    allChildren.forEach(child => traverse(child));
  }

  traverse(node);
  console.log(result);
  return result;
}
