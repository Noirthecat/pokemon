import React from "react";

export default function TypeList({ types }) {
  return (
    <div>
      {types.map((p) => (
        <h3 key={p}>{p} </h3>
      ))}
    </div>
  );
}
