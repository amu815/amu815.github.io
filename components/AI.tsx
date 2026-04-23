/* eslint-disable @next/next/no-img-element */
const badges = [
  { href: "https://claude.ai/", label: "Claude", color: "D4A574", logo: "anthropic" },
  { href: "https://gemini.google.com/", label: "Gemini", color: "8E75B2", logo: "googlegemini" },
  { href: "https://chatgpt.com/", label: "ChatGPT", color: "74aa9c", logo: "openai" },
  { href: "https://qwenlm.github.io/", label: "Qwen", color: "6F42C1" },
  { href: "https://github.com/salesforce/BLIP", label: "BLIP", color: "00A1E0" },
];

export function AI() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((b) => (
        <a key={b.label} href={b.href} target="_blank" rel="noreferrer">
          <img
            src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=for-the-badge${
              b.logo ? `&logo=${b.logo}&logoColor=white` : "&logoColor=white"
            }`}
            alt={b.label}
            height={32}
          />
        </a>
      ))}
    </div>
  );
}
