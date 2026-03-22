export function BootLoader({ message = 'Preparing the experience.' }) {
  return (
    <div className="boot-loader" role="status" aria-live="polite">
      <span className="loader-dot" />
      <p className="loader-kicker">Initial route load</p>
      <h2>Building the baseline shell.</h2>
      <p>{message}</p>
    </div>
  )
}
