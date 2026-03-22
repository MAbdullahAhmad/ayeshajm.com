export function RouteLoader({
  compact = false,
  label = 'Loading route content.',
}) {
  return (
    <div
      className={compact ? 'route-loader route-loader--compact' : 'route-loader'}
      role="status"
      aria-live="polite"
    >
      <span className="loader-dot" />
      <p>{label}</p>
    </div>
  )
}
