
// import { useEffect, useState, useMemo } from "react";
// import Tree from "react-d3-tree";
// import { api } from "../api";

// /**
//  * Recursively attach children using expanded map
//  */
// function attachChildren(node, expanded) {
//   return {
//     ...node,
//     children: (expanded[node.id] || []).map(child =>
//       attachChildren(child, expanded)
//     )
//   };
// }

// export default function HierarchyChart() {
//   const [assets, setAssets] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     api.get("/hierarchy/assets").then(res => setAssets(res.data));
//   }, []);

//   const toggle = async (node, loader) => {
//     if (expanded[node.id]) {
//       const copy = { ...expanded };
//       delete copy[node.id];
//       setExpanded(copy);
//       return;
//     }
//     const res = await loader();
//     setExpanded(prev => ({ ...prev, [node.id]: res.data }));
//   };

//   const handleClick = (node) => {
//     if (node.type === "asset") {
//       const id = node.id.split("_")[1];
//       toggle(node, () =>
//         api.get(`/hierarchy/components?asset_id=${id}`)
//       );
//     }

//     if (node.type === "component") {
//       const id = node.id.split("_")[1];
//       toggle(node, () =>
//         api.get(`/hierarchy/failure-modes?component_id=${id}`)
//       );
//     }

//     if (node.type === "failure_mode") {
//       const id = node.id.split("_")[1];
//       toggle(node, () =>
//         api.get(`/hierarchy/detection-maps?failure_mode_id=${id}`)
//       );
//     }

//     if (node.type === "detection") {
//       const id = node.id.split("_")[1];
//       toggle(node, () =>
//         api.get(`/hierarchy/cbm-methods?map_id=${id}`)
//       );
//     }
//   };

//   const treeData = useMemo(() => {
//     return {
//       name: "All Assets",
//       id: "root",
//       type: "root",
//       children: assets.map(a =>
//         attachChildren(a, expanded)
//       )
//     };
//   }, [assets, expanded]);

//   if (!assets.length) return <p>Loading hierarchy…</p>;

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <Tree
//         data={treeData}
//         orientation="vertical"
//         translate={{ x: 600, y: 120 }}
//         zoomable
//         separation={{ siblings: 2, nonSiblings: 2 }}
//         renderCustomNodeElement={({ nodeDatum }) => (
//           <g
//             style={{ cursor: "pointer" }}
//             onClick={() => handleClick(nodeDatum)}
//           >
//             <circle
//               r={14}
//               fill={
//                 nodeDatum.type === "asset" ? "#4CAF50" :
//                 nodeDatum.type === "component" ? "#2196F3" :
//                 nodeDatum.type === "failure_mode" ? "#FF9800" :
//                 nodeDatum.type === "detection" ? "#9C27B0" :
//                 "#000"
//               }
//             />
//             <text
//               x={20}
//               dy={5}
//               style={{ fontSize: "14px", pointerEvents: "none" }}
//             >
//               {nodeDatum.name}
//             </text>
//           </g>
//         )}
//       />
//     </div>
//   );
// }
// This above code is working properly for expanding and contracting all the NodeList
import { useState, useMemo } from "react";
import Tree from "react-d3-tree";
import { api } from "../api";

/**
 * Recursively attach children using expanded map
 */
function attachChildren(node, expanded) {
  return {
    ...node,
    children: (expanded[node.id] || []).map(child =>
      attachChildren(child, expanded)
    )
  };
}

export default function HierarchyChart() {
  const [expanded, setExpanded] = useState({});

  /**
   * Generic toggle + lazy loader
   */
  const toggle = async (node, loader) => {
    if (expanded[node.id]) {
      const copy = { ...expanded };
      delete copy[node.id];
      setExpanded(copy);
      return;
    }
    const res = await loader();
    setExpanded(prev => ({ ...prev, [node.id]: res.data }));
  };

  /**
   * Click handler for ALL nodes
   */
  const handleClick = (node) => {
    // ROOT → load / hide assets
    if (node.type === "root") {
      toggle(node, () => api.get("/hierarchy/assets"));
    }

    // ASSET → components
    if (node.type === "asset") {
      const id = node.id.split("_")[1];
      toggle(node, () =>
        api.get(`/hierarchy/components?asset_id=${id}`)
      );
    }

    // COMPONENT → failure modes
    if (node.type === "component") {
      const id = node.id.split("_")[1];
      toggle(node, () =>
        api.get(`/hierarchy/failure-modes?component_id=${id}`)
      );
    }

    // FAILURE MODE → detection maps
    if (node.type === "failure_mode") {
      const id = node.id.split("_")[1];
      toggle(node, () =>
        api.get(`/hierarchy/detection-maps?failure_mode_id=${id}`)
      );
    }

    // DETECTION → CBM
    if (node.type === "detection") {
      const id = node.id.split("_")[1];
      toggle(node, () =>
        api.get(`/hierarchy/cbm-methods?map_id=${id}`)
      );
    }
  };

  /**
   * Build tree with ROOT behaving like any other node
   */
  const treeData = useMemo(() => {
    return {
      name: "All Assets",
      id: "root",
      type: "root",
      children: (expanded["root"] || []).map(a =>
        attachChildren(a, expanded)
      )
    };
  }, [expanded]);

  return (
    // <div style={{ width: "100%", height: "80vh", position: "relative",zIndex:1 }}>
    <div style={{ width: "100%", height: "75vh" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 600, y: 120 }}
        zoomable
        separation={{ siblings: 2, nonSiblings: 2 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <g
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(nodeDatum)}
          >
            <circle
              r={14}
              fill={
                nodeDatum.type === "root" ? "#000" :
                nodeDatum.type === "asset" ? "#4CAF50" :
                nodeDatum.type === "component" ? "#2196F3" :
                nodeDatum.type === "failure_mode" ? "#FF9800" :
                nodeDatum.type === "detection" ? "#9C27B0" :
                "#607D8B"
              }
            />
            <text
              x={20}
              dy={5}
              style={{
                fontSize: "14px",
                pointerEvents: "none",
                fontWeight: nodeDatum.type === "root" ? "bold" : "normal"
              }}
            >
              {nodeDatum.name}
            </text>
          </g>
        )}
      />
    </div>
  );
}
