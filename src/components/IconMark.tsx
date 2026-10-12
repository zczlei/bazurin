export function IconMark({ size }: { size: number }) {
  const u = size / 32;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9 * u,
        background: "linear-gradient(135deg, #ff2e7e 0%, #ff6a1f 55%, #ffc21a 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          marginLeft: 3 * u,
          borderTop: `${6.5 * u}px solid transparent`,
          borderBottom: `${6.5 * u}px solid transparent`,
          borderLeft: `${10 * u}px solid #fff`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 5 * u,
          right: 5 * u,
          width: 4.6 * u,
          height: 4.6 * u,
          borderRadius: 999,
          background: "#fff",
        }}
      />
    </div>
  );
}
