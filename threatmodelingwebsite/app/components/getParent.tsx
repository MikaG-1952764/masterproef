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
      if (current.children) {
        current.children.forEach(child => traverse(child, current));
      }
    }

    traverse(root, null);
    return parent;
  }