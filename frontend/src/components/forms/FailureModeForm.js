import { useEffect, useState } from "react";
import { api } from "../../api";

export default function FailureModeForm({ onClose, onSuccess }) {
  const [components, setComponents] = useState([]);
  const [form, setForm] = useState({
    failure_mode_id: "",
    component_id: "",
    failure_mode: "",
    mechanism: "",
    cause: "",
    effect: "",
    pf_interval_note: ""
  });

  useEffect(() => {
    api.get("/components").then(res => setComponents(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/failure-modes", {
        failure_mode_id: Number(form.failure_mode_id),
        component_id: Number(form.component_id),
        failure_mode: form.failure_mode,
        mechanism: form.mechanism,
        cause: form.cause,
        effect: form.effect,
        pf_interval_note: form.pf_interval_note
      });
      onSuccess();
      onClose();
    } catch {
      alert("Invalid data or duplicate Failure Mode ID");
    }
  };

  return (
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>Add Failure Mode</h3>

        <input
          name="failure_mode_id"
          placeholder="Failure Mode ID"
          required
          onChange={handleChange}
        />

        <select
          name="component_id"
          required
          onChange={handleChange}
        >
          <option value="">Select Component</option>
          {components.map(c => (
            <option key={c.component_id} value={c.component_id}>
              {c.component_name}
            </option>
          ))}
        </select>

        <input
          name="failure_mode"
          placeholder="Failure Mode"
          onChange={handleChange}
        />

        <textarea
          name="mechanism"
          placeholder="Mechanism"
          onChange={handleChange}
        />

        <textarea
          name="cause"
          placeholder="Cause"
          onChange={handleChange}
        />

        <textarea
          name="effect"
          placeholder="Effect"
          onChange={handleChange}
        />

        <textarea
          name="pf_interval_note"
          placeholder="PF Interval Note"
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
