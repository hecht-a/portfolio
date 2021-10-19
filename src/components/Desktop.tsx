export function Desktop() {
  return (
    <div className="desktop">
      {Array.from({ length: 3 }).map((_, i) => (
        <button key={i}>
          <img src="/assets/folder.png" alt="" />
          <div>
            <span>plugins</span>
          </div>
        </button>
      ))}
    </div>
  );
}
