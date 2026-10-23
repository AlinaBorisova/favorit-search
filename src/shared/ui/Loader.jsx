export function Loader({ label = "Загрузка…" }) {
  return (
    <div className="d-flex align-items-center gap-2 py-3" role="status">
      <div
        className="spinner-border spinner-border-sm text-primary"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
