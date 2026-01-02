import { useState } from "react";
import { api } from "../../api";

export default function CBMMethodForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    cbm_id: "",
    cbm_code: "",
    method_name: "",
    description: "",
    cbm_notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cbm-methods", {
        cbm_id: Number(form.cbm_id),
        cbm_code: form.cbm_code,
        method_name: form.method_name,
        description: form.description,
        cbm_notes: form.cbm_notes
      });
      onSuccess();
      onClose();
    } catch {
      alert("Invalid data or duplicate CBM ID");
    }
  };

  return (
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>Add CBM Method</h3>

        <input
          name="cbm_id"
          placeholder="CBM ID"
          required
          onChange={handleChange}
        />

        <input
          name="cbm_code"
          placeholder="CBM Code"
          onChange={handleChange}
        />

        <input
          name="method_name"
          placeholder="Method Name"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <textarea
          name="cbm_notes"
          placeholder="CBM Notes"
          onChange={handleChange}
        />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
