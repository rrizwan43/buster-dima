import { useState } from "react";
import { api } from "../../api";

export default function AssetForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    asset_id: "",
    asset_code: "",
    asset_type: "",
    process_area: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assets", {
        asset_id: Number(form.asset_id),
        asset_code: form.asset_code,
        asset_type: form.asset_type,
        process_area: form.process_area,
        description: form.description
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Asset ID already exists or invalid data.");
    }
  };

  return (
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>Add Asset</h3>

        <input name="asset_id" placeholder="Asset ID" required onChange={handleChange} />
        <input name="asset_code" placeholder="Asset Code" onChange={handleChange} />
        <input name="asset_type" placeholder="Asset Type" onChange={handleChange} />
        <input name="process_area" placeholder="Process Area" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange} />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
