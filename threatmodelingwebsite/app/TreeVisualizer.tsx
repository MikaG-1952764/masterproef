"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export interface TreeNode {
    name: string;
    children?: TreeNode[];
    _children?: TreeNode[];
}

interface TreeVisualizerProps {
    data: TreeNode;
    setTreeData: (data: TreeNode) => void;
}

interface TreeNodeWithBBox extends d3.HierarchyPointNode<TreeNode> {
    bbox?: DOMRect;
}

export default function TreeVisualizer({ data }: TreeVisualizerProps) {
    const ref = useRef<SVGSVGElement | null>(null);
    const [treeData, setTreeData] = useState<TreeNode>(data);

    useEffect(() => {
        if (!ref.current) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // reset

        const tree = d3.tree<TreeNode>().nodeSize([140, 140]);
        const root = d3.hierarchy(treeData);
        tree(root);

        root.descendants().forEach(d => {
            const temp = d.x;
            d.x = d.y;
            d.y = temp;
        });

        const svgWidth = window.innerWidth;

        // desired position: middle top
        const translateX = svgWidth / 2 - root.y!; // center horizontally
        const translateY = 50 - root.x!;           // some top margin (50px)


        const g = svg
            .append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("transform", `translate(${translateX}, ${translateY})`);

        const nodes = root.descendants() as TreeNodeWithBBox[];

        const nodeGroups = g.selectAll("g.node")
            .data(nodes)
            .join("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y}, ${d.x})`)
            .style("cursor", "pointer")
            .on("click", function (d: TreeNodeWithBBox) {
                const newText = prompt("Enter new text:");
                if (!newText) return;

                const textElem = d3.select(this).select("text");
                textElem.text(newText);

                var bbox = (textElem.node() as SVGTextElement).getBBox();
                d.bbox = bbox;

                d3.select(this).select("rect")
                    .attr("x", -bbox.width / 2 - 6)
                    .attr("y", -bbox.height / 2 - 4)
                    .attr("width", bbox.width + 12)
                    .attr("height", bbox.height + 8);

                d3.select(this).select(".add-button").attr("transform", `translate(${(bbox.width ?? 0) / 2 + 20}, 10)`)
                d3.select(this).select(".collapse-button").attr("transform", `translate(${(bbox.width ?? 0) / 2 + 20}, -20)`)
            });

        // TEXT for node
        nodeGroups.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(d => d.data.name)
            .attr("font-size", 16)
            .on("mouseenter", function () {
                const rect = d3.select(this.parentElement).select("rect")

                if (rect.attr("stroke") == "red") {
                    rect.attr("fill", "red");
                }

                if (rect.attr("stroke") == "green") {
                    rect.attr("fill", "green");
                }
            })
            .on("mouseleave", function () {
                d3.select(this.parentElement).select("rect").attr("fill", "none");
            })
            .each(function (d) {
                const bbox = (this as SVGTextElement).getBBox();
                (d as TreeNodeWithBBox).bbox = bbox;
            });

        // RECT around text
        nodeGroups.append("rect")
            .attr("x", d => -((d as TreeNodeWithBBox).bbox?.width ?? 0) / 2 - 6)
            .attr("y", d => -((d as TreeNodeWithBBox).bbox?.height ?? 0) / 2 - 4)
            .attr("width", d => ((d as TreeNodeWithBBox).bbox?.width ?? 0) + 12)
            .attr("height", d => ((d as TreeNodeWithBBox).bbox?.height ?? 0) + 8)
            .attr("stroke", d => (d.depth % 2 === 0 ? "green" : "red"))
            .attr("fill", "none")
            .on("mouseenter", function () {
                const rect = d3.select(this)

                if (rect.attr("stroke") == "red") {
                    rect.attr("fill", "red");
                }

                if (rect.attr("stroke") == "green") {
                    rect.attr("fill", "green");
                }
            })
            .on("mouseleave", function () {
                d3.select(this).attr("fill", "none");
            })
            .attr("stroke-width", 2);

        nodeGroups.select("rect").lower();

        // + BUTTON attached to each node
        const addButtons = nodeGroups.append("g")
            .attr("class", "add-button")
            .attr("transform", d => `translate(${(d.bbox?.width ?? 0) / 2 + 20}, 10)`)
            .style("cursor", "pointer")
            .on("mouseenter", function (event) {
                event.stopPropagation();
                d3.select(this).select("circle").attr("stroke", "black");
                d3.select(this).select("text").attr("fill", "black");
            })
            .on("mouseleave", function (event) {
                event.stopPropagation()
                d3.select(this).select("circle").attr("stroke", "grey");
                d3.select(this).select("text").attr("fill", "grey");
            })
            .on("click", (event, d) => {
                event.stopPropagation();
                const newNodeName = prompt("Enter name for new child node:");
                if (!newNodeName) return;
                if (!d.data.children) d.data.children = [];
                d.data.children.push({ name: newNodeName });
                setTreeData({ ...treeData });
            });

        addButtons.append("circle")
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("stroke-width", 2);

        addButtons.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "grey")
            .attr("font-size", 14)
            .text("+");

        const collapsButtons = nodeGroups.append("g")
            .attr("class", "collapse-button")
            .attr("transform", d => `translate(${(d.bbox?.width ?? 0) / 2 + 20}, -20)`)
            .style("cursor", "pointer")
            .on("mouseenter", function (event) {
                event.stopPropagation();
                d3.select(this).select("circle").attr("stroke", "black");
                d3.select(this).select("text").attr("fill", "black");
            })
            .on("mouseleave", function (event) {
                event.stopPropagation();
                d3.select(this).select("circle").attr("stroke", "grey");
                d3.select(this).select("text").attr("fill", "grey");
            })
            .on("click", (event, d) => {
                event.stopPropagation();
                
                if (d.data.children) {
                    d.data._children = d.data.children;
                    d.data.children = undefined;
                } else if (d.data._children) {
                    d.data.children = d.data._children;
                    d.data._children = undefined;
                }

                setTreeData({ ...treeData });
            });

            collapsButtons.append("circle")
                .attr("r", 8)
                .attr("fill", "none")
                .attr("stroke", "grey")
                .attr("stroke-width", 2);

            collapsButtons.append("text")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", "grey")
                .attr("font-size", 10)
                .text(d => d.data.children ? "▼" : "▶");
        // LINKS
        g.selectAll("path")
            .data(root.links())
            .join("path")
            .attr("fill", "none")
            .attr("stroke", "#000000ff")
            .attr("d", (d) => {
                const link = d as d3.HierarchyPointLink<TreeNode>;
                const parent = link.source as TreeNodeWithBBox;
                const child = link.target as TreeNodeWithBBox;

                const parentBBox = parent.bbox!;
                const childBBox = child.bbox!;

                const source = {
                    x: parent.x! + parentBBox.height / 2 + 4,
                    y: parent.y!
                } as d3.HierarchyPointNode<TreeNode>;

                const target = {
                    x: child.x! - childBBox.height / 2 - 4,
                    y: child.y!
                } as d3.HierarchyPointNode<TreeNode>;

                const generator = d3.linkVertical<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
                    .x(n => n.y)
                    .y(n => n.x);

                return generator({ source, target }) ?? "";
            });

    }, [treeData]);

    return <svg ref={ref} width="100%" height="500px" />;
}
