const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 8 + 5) % 92}%`,
  top: `${(i * 7 + 10) % 85}%`,
  delay: `${(i * 0.4) % 3}s`,
  size: i % 3 === 0 ? "text-lg" : i % 3 === 1 ? "text-xl" : "text-sm",
}));

export default function RomanticFooter() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-stone-900 to-stone-950 py-16 text-center">
      {/* Subtle floating hearts background */}
      <div className="pointer-events-none absolute inset-0">
        {HEARTS.map((h) => (
          <span
            key={h.id}
            className={`animate-float-heart absolute text-rose-500/30 ${h.size}`}
            style={{
              left: h.left,
              top: h.top,
              animationDelay: h.delay,
            }}
            aria-hidden
          >
            ❤
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4">
        <p className="mb-6 font-serif text-lg leading-relaxed text-rose-100/90 md:text-xl italic">
          &ldquo;两情若是久长时，又岂在朝朝暮暮。&rdquo;
        </p>
        <p className="mb-6 text-sm text-rose-200/80">——秦观</p>
        <div className="mx-auto mb-4 h-px w-24 bg-rose-500/40" />
        <p className="text-sm text-stone-500">
          © 2026 Love 0403 · Built with ❤️ by 小鱼 for 长颈鹿小姐
        </p>
      </div>
    </footer>
  );
}
