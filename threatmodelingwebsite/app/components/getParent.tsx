import { TreeNode } from "../TreeVisualizer";

export function getImmediateParent(node: TreeNode, root: TreeNode): TreeNode | null {
  let parent: TreeNode | null = null;
  let found = false;

  function traverse(current: TreeNode, currentParent: TreeNode | null) {
    if (found) return;
    if (current === node) {
      parent = currentParent;
      found = true;
      return;
    }
    const children = current.children ?? current._children;
    if (children) {
      children.forEach(child => traverse(child, current)); 
    }
  }
  traverse(root, null);
  return parent;
}

export function getParentsAbove(node: TreeNode, root: TreeNode): TreeNode[] {
  const parents: TreeNode[] = [];
  let currentNode: TreeNode | null = node;
  while (true) {
    const parent = getImmediateParent(currentNode, root);
    if (parent) {
      parents.push(parent);
      currentNode = parent;
    } else {
      break;
    }
  }
  return parents.reverse();
}