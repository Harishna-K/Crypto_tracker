"use client";

export default function Error({ reset }) {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Something went wrong.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
