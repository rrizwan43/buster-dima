// import "./Header.css";
// import logo from "../logo.svg"; // replace later with company logo

// export default function Header() {
//   return (
//     <div className="app-header">
//       <div className="logo">
//         <img src={logo} alt="Logo" />
//       </div>

//       <div className="title">
//         <h2>Hierarchal View of Assets</h2>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import "./Header.css";

export default function Header({ onAdd }) {
  const [open, setOpen] = useState(false);

  const handleClick = (type) => {
    setOpen(false);
    onAdd(type);
  };

  return (
    <div className="app-header">
      <div className="logo">
        <h3>Asset Insight Platform</h3>
      </div>

      <div className="actions">
        <button
          className="add-btn"
          onClick={() => setOpen(!open)}
        >
          + Add Data
        </button>

        {open && (
          <div className="dropdown">
            <div onClick={() => handleClick("asset")}>Asset</div>
            <div onClick={() => handleClick("component")}>Component</div>
            <div onClick={() => handleClick("failure_mode")}>Failure Mode</div>
            <div onClick={() => handleClick("detection_map")}>Detection Map</div>
            <div onClick={() => handleClick("cbm_method")}>CBM Method</div>
          </div>
        )}
      </div>
    </div>
  );
}

