"use client";

import type {} from "@xyflow/react";
import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  type Node,
  type OnNodesChange,
  Panel,
  ReactFlow,
  SelectionMode,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { nodeTypes } from "./nodetypes";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Playground() {
  const cards = useQuery(api.cards.get);
  const displayThis = { cards };
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    if (cards) {
      setNodes(
        cards.map((card: any) => ({
          id: card.id,
          type: "card",
          position: card.Position,
          data: card.data ?? {},
        })),
      );
    }
  }, [cards]);

  const onNodeChanges: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
    [],
  );

  return (
    <main className="w-dvw h-dvh">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodeChanges}
        onNodeDrag={(event, node) => {
          if (node.type === "card") {
            const data = {
              id: node.id,
              type: "card",
              position: {},
              data: {},
            };
          }
        }}
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        translateExtent={[
          [-500, -500],
          [500, 500],
        ]}
        fitView
      >
        <Panel position="top-center">
          <p className="border">{JSON.stringify(displayThis)}</p>
        </Panel>
        <Background
          bgColor="#1c1c1c"
          color="#222"
          variant={BackgroundVariant.Lines}
        />
        <Controls />
      </ReactFlow>
    </main>
  );
}

const panOnDrag = [1, 2];
const initialNodes: Node[] = [
  {
    id: "a",
    type: "card",
    position: { x: 0, y: 0 },
    data: {},
  },
];
