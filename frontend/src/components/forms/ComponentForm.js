import { useEffect, useState } from "react";
import { api } from "../../api";

export default function ComponentForm({ onClose, onSuccess }) {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    component_id: "",
    asset_id: "",
    component_name: "",
    component_type: "",
    description: ""
  });

  useEffect(() => {
    api.get("/assets").then(res => setAssets(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/components", {
        component_id: Number(form.component_id),
        asset_id: Number(form.asset_id),
        component_name: form.component_name,
        component_type: form.component_type,
        description: form.description
      });
      onSuccess();
      onClose();
    } catch {
      alert("Invalid data or duplicate Component ID");
    }
  };

  return (
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>Add Component</h3>

        <input
          name="component_id"
          placeholder="Component ID"
          required
          onChange={handleChange}
        />

        <select
          name="asset_id"
          required
          onChange={handleChange}
        >
          <option value="">Select Asset</option>
          {assets.map(a => (
            <option key={a.asset_id} value={a.asset_id}>
              {a.asset_code}
            </option>
          ))}
        </select>

        <input
          name="component_name"
          placeholder="Component Name"
          onChange={handleChange}
        />
        <input
          name="component_type"
          placeholder="Component Type"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
