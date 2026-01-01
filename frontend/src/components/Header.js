import "./Header.css";
import logo from "../logo.svg"; // replace later with company logo

export default function Header() {
  return (
    <div className="app-header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="title">
        <h2>Hierarchal View of Assets</h2>
      </div>
    </div>
  );
}
