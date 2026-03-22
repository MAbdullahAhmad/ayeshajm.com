export default function ScenePlaceholder({ title, scenePath, note }) {
  return (
    <section className="scene-placeholder" aria-label={`${title} placeholder`}>
      <div className="scene-placeholder__visual">
        <div className="scene-orb" />
        <div className="scene-grid" />
      </div>

      <div className="scene-placeholder__copy">
        <p className="scene-placeholder__eyebrow">3D route boundary</p>
        <h3>{title}</h3>
        <p>{note}</p>
        <code>{scenePath}</code>
      </div>
    </section>
  )
}
