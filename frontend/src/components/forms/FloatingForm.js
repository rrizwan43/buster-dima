export default function FloatingForm({
  title,
  onClose,
  onSubmit,
  children
}) {
  return (
    <>
      <div className="panel-overlay" onClick={onClose} />

      <div className="panel">
        <div className="panel-header">
          {title}
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="panel-body">
            {children}
          </div>

          <div className="panel-footer">
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
