import React from "react";
import "./DataTable.css";

export default function DataTable({ columns, data, loading, emptyMsg, onRowClick }) {
  if (loading) {
    return (
      <div className="data-table__wrap">
        <table className="data-table">
          <thead>
            <tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key}><div className="data-table__skeleton" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="data-table__empty">
        <p>{emptyMsg || "No data found."}</p>
      </div>
    );
  }

  return (
    <div className="data-table__wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ width: c.width }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? "data-table__row--clickable" : ""}
            >
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
