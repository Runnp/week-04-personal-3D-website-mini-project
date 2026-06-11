export default function SectionContact() {
  return (
    <section id="work" className="bg-paper border-t border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

        <div className="flex items-baseline gap-4 mb-6 border-b border-ink pb-3">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Work</h2>
          <span className="font-mono text-xs text-mid">— contact & links</span>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.65rem] text-mid uppercase tracking-widest mb-2">Links</span>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm text-link" data-cursor>
              github.com/runnp
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm text-link" data-cursor>
              linkedin.com/in/runnp
            </a>
            <a href="mailto:hello@runnp.art"
              className="font-mono text-sm text-link" data-cursor>
              hello@runnp.art
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.65rem] text-mid uppercase tracking-widest mb-2">Currently</span>
            <span className="font-mono text-sm text-ink">Incoming — University of Toronto</span>
            <span className="font-mono text-sm text-ink">CCIT — Communication, Culture,</span>
            <span className="font-mono text-sm text-ink">Information and Technology</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.65rem] text-mid uppercase tracking-widest mb-2">Open to</span>
            <span className="font-mono text-sm text-ink">Research collaboration</span>
            <span className="font-mono text-sm text-ink">Animation & CG work</span>
            <span className="font-mono text-sm text-ink">Technical art roles</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-ink mt-12 pt-4 flex justify-between items-center">
          <span className="font-mono text-[0.65rem] text-mid">
            runnp.art — Nurmuhammad Mirzaahmadov © 2025
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[0.65rem] text-link hover:text-red"
            data-cursor>
            ↑ top
          </button>
        </div>

      </div>
    </section>
  )
}
