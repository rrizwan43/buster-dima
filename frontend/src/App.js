
import { useState } from "react";
import Header from "./components/Header";
import HierarchyChart from "./components/HierarchyChart";
import AssetForm from "./components/forms/AssetForm";
import ComponentForm from "./components/forms/ComponentForm";
import FailureModeForm from "./components/forms/FailureModeForm";
import DetectionMapForm from "./components/forms/DetectionMapForm";
import CBMMethodForm from "./components/forms/CBMMethodForm";

// function App() {
//   const [formType, setFormType] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [selectedNode, setSelectedNode] = useState(null);

//   return (
//     <>
//       <Header
//         onAdd={setFormType}
//         onEdit={() => setFormType("edit_asset")}
//         selectedNode={selectedNode}
//       />

//       <HierarchyChart
//         key={refreshKey}
//         onSelect={setSelectedNode}
//       />

//       {formType === "asset" && (
//         <AssetForm
//           onClose={() => setFormType(null)}
//           onSuccess={() => setRefreshKey(k => k + 1)}
//         />
//       )}

//       {formType === "edit_asset" && selectedNode?.type === "asset" && (
//         <AssetForm
//           initialData={selectedNode}
//           onClose={() => setFormType(null)}
//           onSuccess={() => setRefreshKey(k => k + 1)}
//         />
//       )}

      // {formType === "component" && (
      //   <ComponentForm
      //     onClose={() => setFormType(null)}
      //     onSuccess={() => setRefreshKey(k => k + 1)}
      //   />
      // )}

      // {formType === "failure_mode" && (
      //   <FailureModeForm
      //     onClose={() => setFormType(null)}
      //     onSuccess={() => setRefreshKey(k => k + 1)}
      //   />
      // )}

      // {formType === "detection_map" && (
      //   <DetectionMapForm
      //     onClose={() => setFormType(null)}
      //     onSuccess={() => setRefreshKey(k => k + 1)}
      //   />
      // )}

      // {formType === "cbm_method" && (
      //   <CBMMethodForm
      //     onClose={() => setFormType(null)}
      //     onSuccess={() => setRefreshKey(k => k + 1)}
      //   />
      // )}
//     </>
//   );
// }

// export default App;





function App() {
  const [formType, setFormType] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Header onAdd={setFormType} />

      {/* FULL SCREEN CHART */}
      <HierarchyChart key={refreshKey} />

      {formType === "asset" && (
        <AssetForm
          onClose={() => setFormType(null)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}
      {formType === "component" && (
        <ComponentForm
          onClose={() => setFormType(null)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}

      {formType === "failure_mode" && (
        <FailureModeForm
          onClose={() => setFormType(null)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}

      {formType === "detection_map" && (
        <DetectionMapForm
          onClose={() => setFormType(null)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}

      {formType === "cbm_method" && (
        <CBMMethodForm
          onClose={() => setFormType(null)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}
    </>
  );
}

export default App;
