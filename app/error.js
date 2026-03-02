"use client";

export default function Error({ error }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}