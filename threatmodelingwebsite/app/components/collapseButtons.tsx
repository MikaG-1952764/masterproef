import { TreeNode } from "../TreeVisualizer";

function collapseAllNodes(node: TreeNode, depth=0) {
    if (node.children) {
        if(depth >=1){
            node._children = node.children;
            node.children.forEach((child) => collapseAllNodes(child, depth=2));
            node.children = undefined;
        } else {
            node.children.forEach((child) => collapseAllNodes(child, depth + 1));    
        }
    }
}

function expandAllNodes(node: TreeNode) {
    if (node._children) {
        node.children = node._children;
        node._children.forEach(expandAllNodes);
        node._children = undefined;
    } else {
        node.children?.forEach(expandAllNodes);
    }
}

export function CollapseButtons({
    treeData,
    setTreeData,}: {
    treeData: TreeNode;
    setTreeData: (data: TreeNode) => void;}) {
    return (
        <div className="flex space-x-2 mb-4"> 
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    const newData = { ...treeData };
                    collapseAllNodes(newData);
                    setTreeData(newData);
                }}
            >
                Collapse All
            </button>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    const newData = { ...treeData };
                    expandAllNodes(newData);
                    setTreeData(newData);
                }}
            >
                Expand All
            </button>
        </div>
    );
}