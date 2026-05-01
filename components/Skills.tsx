/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

const DEV = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

type Icon =
  | { kind: "devicon"; href: string; alt: string; path: string }
  | {
      kind: "shield";
      href: string;
      alt: string;
      label: string;
      color: string;
      logo?: string;
      logoColor?: string;
    };

const aiml: Icon[] = [
  { kind: "devicon", href: "https://www.python.org", alt: "Python", path: "python/python-original.svg" },
  { kind: "devicon", href: "https://pytorch.org/", alt: "PyTorch", path: "pytorch/pytorch-original.svg" },
  {
    kind: "shield",
    href: "https://huggingface.co/docs/transformers",
    alt: "HuggingFace Transformers",
    label: "HuggingFace",
    color: "FFD21E",
    logo: "huggingface",
    logoColor: "black",
  },
  {
    kind: "shield",
    href: "https://huggingface.co/docs/peft",
    alt: "PEFT / LoRA",
    label: "PEFT_LoRA",
    color: "F59E0B",
  },
  {
    kind: "shield",
    href: "https://github.com/jbloomAus/SAELens",
    alt: "SAE Lens",
    label: "SAE_Lens",
    color: "8B5CF6",
  },
  { kind: "devicon", href: "https://scikit-learn.org/", alt: "scikit-learn", path: "scikitlearn/scikitlearn-original.svg" },
  { kind: "devicon", href: "https://pandas.pydata.org/", alt: "Pandas", path: "pandas/pandas-original.svg" },
  {
    kind: "shield",
    href: "https://optuna.org/",
    alt: "Optuna",
    label: "Optuna",
    color: "1E40AF",
  },
  {
    kind: "shield",
    href: "https://lightgbm.readthedocs.io/",
    alt: "LightGBM",
    label: "LightGBM",
    color: "0EA5E9",
  },
  {
    kind: "shield",
    href: "https://wandb.ai/",
    alt: "Weights & Biases",
    label: "W%26B",
    color: "FFBE00",
    logo: "weightsandbiases",
    logoColor: "black",
  },
  { kind: "shield", href: "https://docs.vllm.ai/", alt: "vLLM", label: "vLLM", color: "006DAA" },
  { kind: "shield", href: "https://ollama.com/", alt: "Ollama", label: "Ollama", color: "000000", logo: "ollama" },
  { kind: "shield", href: "https://github.com/ml-explore/mlx", alt: "MLX", label: "MLX", color: "000000", logo: "apple" },
];

const backend: Icon[] = [
  { kind: "devicon", href: "https://fastapi.tiangolo.com/", alt: "FastAPI", path: "fastapi/fastapi-original.svg" },
  { kind: "devicon", href: "https://nodejs.org/", alt: "Node.js", path: "nodejs/nodejs-original.svg" },
  {
    kind: "shield",
    href: "https://bun.sh/",
    alt: "Bun",
    label: "Bun",
    color: "FBF0DF",
    logo: "bun",
    logoColor: "black",
  },
  { kind: "devicon", href: "https://flask.palletsprojects.com/", alt: "Flask", path: "flask/flask-original.svg" },
  { kind: "devicon", href: "https://www.java.com/", alt: "Java", path: "java/java-original.svg" },
  {
    kind: "shield",
    href: "https://click.palletsprojects.com/",
    alt: "Click",
    label: "Click",
    color: "1E1E1E",
  },
];

const frontend: Icon[] = [
  { kind: "devicon", href: "https://www.typescriptlang.org/", alt: "TypeScript", path: "typescript/typescript-original.svg" },
  { kind: "devicon", href: "https://reactjs.org/", alt: "React", path: "react/react-original.svg" },
  { kind: "devicon", href: "https://nextjs.org/", alt: "Next.js", path: "nextjs/nextjs-original.svg" },
  { kind: "devicon", href: "https://tailwindcss.com/", alt: "Tailwind CSS", path: "tailwindcss/tailwindcss-original.svg" },
  { kind: "devicon", href: "https://flutter.dev/", alt: "Flutter", path: "flutter/flutter-original.svg" },
  { kind: "devicon", href: "https://dart.dev/", alt: "Dart", path: "dart/dart-original.svg" },
];

const infra: Icon[] = [
  { kind: "devicon", href: "https://www.docker.com/", alt: "Docker", path: "docker/docker-original-wordmark.svg" },
  { kind: "devicon", href: "https://www.linux.org/", alt: "Linux", path: "linux/linux-original.svg" },
  { kind: "shield", href: "https://developer.nvidia.com/cuda-toolkit", alt: "CUDA", label: "CUDA", color: "76B900", logo: "nvidia" },
  {
    kind: "shield",
    href: "https://github.com/features/actions",
    alt: "GitHub Actions",
    label: "GH_Actions",
    color: "2088FF",
    logo: "githubactions",
  },
  { kind: "devicon", href: "https://www.latex-project.org/", alt: "LaTeX", path: "latex/latex-original.svg" },
  { kind: "devicon", href: "https://www.cloudflare.com/", alt: "Cloudflare", path: "cloudflare/cloudflare-original.svg" },
];

function IconRow({ items }: { items: Icon[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {items.map((i) => (
        <a
          key={i.alt}
          href={i.href}
          target="_blank"
          rel="noreferrer"
          title={i.alt}
          className="transition-transform hover:-translate-y-0.5"
        >
          {i.kind === "devicon" ? (
            <img src={`${DEV}/${i.path}`} alt={i.alt} width={40} height={40} />
          ) : (
            <img
              src={`https://img.shields.io/badge/${i.label}-${i.color}?style=for-the-badge${
                i.logo ? `&logo=${i.logo}&logoColor=${i.logoColor ?? "white"}` : "&logoColor=white"
              }`}
              alt={i.alt}
              height={26}
            />
          )}
        </a>
      ))}
    </div>
  );
}

export function Skills({ lang }: { lang: Lang }) {
  const t = dict[lang].skills;
  const cols = [
    { header: t.headers[0], items: aiml },
    { header: t.headers[1], items: backend },
    { header: t.headers[2], items: frontend },
    { header: t.headers[3], items: infra },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cols.map((c) => (
        <div key={c.header} className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 text-center text-sm font-semibold text-muted">{c.header}</h3>
          <IconRow items={c.items} />
        </div>
      ))}
    </div>
  );
}
