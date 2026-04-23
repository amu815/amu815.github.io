/* eslint-disable @next/next/no-img-element */
const DEV = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

export function Learning() {
  return (
    <div className="flex gap-4">
      <a href="https://go.dev/" target="_blank" rel="noreferrer">
        <img src={`${DEV}/go/go-original-wordmark.svg`} alt="Go" width={56} height={56} />
      </a>
      <a href="https://www.rust-lang.org/" target="_blank" rel="noreferrer">
        <img src={`${DEV}/rust/rust-original.svg`} alt="Rust" width={56} height={56} />
      </a>
    </div>
  );
}
