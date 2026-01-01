export default function DetailsPanel({ item }) {
  if (!item) return <p>Select a node</p>;

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>
        {item.type?.toUpperCase() || "DETAILS"}
      </h4>

      <table>
        <tbody>
          {Object.entries(item).map(([key, value]) => (
            key !== "hasChildren" && (
              <tr key={key}>
                <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                  {key}
                </td>
                <td>{String(value)}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}
