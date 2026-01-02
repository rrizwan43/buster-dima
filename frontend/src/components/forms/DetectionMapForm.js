import { useEffect, useState } from "react";
import { api } from "../../api";

export default function DetectionMapForm({ onClose, onSuccess }) {
  const [failureModes, setFailureModes] = useState([]);
  const [cbmMethods, setCbmMethods] = useState([]);

  const [form, setForm] = useState({
    map_id: "",
    failure_mode_id: "",
    cbm_id: "",
    indicators: ""
  });

  useEffect(() => {
    api.get("/failure-modes").then(res => setFailureModes(res.data));
    api.get("/cbm-methods").then(res => setCbmMethods(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/detection-map", {
        map_id: Number(form.map_id),
        failure_mode_id: Number(form.failure_mode_id),
        cbm_id: Number(form.cbm_id),
        indicators: form.indicators
      });
      onSuccess();
      onClose();
    } catch {
      alert("Invalid data or duplicate Detection Map ID");
    }
  };

  return (
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>Add Detection Map</h3>

        <input
          name="map_id"
          placeholder="Map ID"
          required
          onChange={handleChange}
        />

        <select
          name="failure_mode_id"
          required
          onChange={handleChange}
        >
          <option value="">Select Failure Mode</option>
          {failureModes.map(fm => (
            <option
              key={fm.failure_mode_id}
              value={fm.failure_mode_id}
            >
              {fm.failure_mode}
            </option>
          ))}
        </select>

        <select
          name="cbm_id"
          required
          onChange={handleChange}
        >
          <option value="">Select CBM Method</option>
          {cbmMethods.map(cbm => (
            <option key={cbm.cbm_id} value={cbm.cbm_id}>
              {cbm.method_name}
            </option>
          ))}
        </select>

        <textarea
          name="indicators"
          placeholder="Indicators"
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
