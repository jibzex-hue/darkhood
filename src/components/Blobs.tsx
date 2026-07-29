export default function Blobs() {
  return (
    <>
      <div
        className="blob"
        style={{
          top: "-10%",
          left: "-8%",
          width: "38vw",
          height: "38vw",
          background: "var(--periwinkle)",
          animationDelay: "0s",
        }}
      />
      <div
        className="blob"
        style={{
          top: "5%",
          right: "-12%",
          width: "32vw",
          height: "32vw",
          background: "var(--coral)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-15%",
          left: "20%",
          width: "36vw",
          height: "36vw",
          background: "var(--mint)",
          animationDelay: "-9s",
        }}
      />
    </>
  );
}
