/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

const DEV = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

type Icon =
  | { kind: "devicon"; href: string; alt: string; path: string }
  | { kind: "shield"; href: string; alt: string; label: string; color: string; logo?: string };

const aiml: Icon[] = [
  { kind: "devicon", href: "https://www.python.org", alt: "Python", path: "python/python-original.svg" },
  { kind: "devicon", href: "https://pytorch.org/", alt: "PyTorch", path: "pytorch/pytorch-original.svg" },
  { kind: "devicon", href: "https://pandas.pydata.org/", alt: "Pandas", path: "pandas/pandas-original.svg" },
  { kind: "devicon", href: "https://scikit-learn.org/", alt: "scikit-learn", path: "scikitlearn/scikitlearn-original.svg" },
  { kind: "shield", href: "https://docs.vllm.ai/", alt: "vLLM", label: "vLLM", color: "006DAA" },
  { kind: "shield", href: "https://github.com/ml-explore/mlx", alt: "MLX", label: "MLX", color: "000000", logo: "apple" },
  { kind: "shield", href: "https://ollama.com/", alt: "Ollama", label: "Ollama", color: "000000", logo: "ollama" },
];

const backend: Icon[] = [
  { kind: "devicon", href: "https://fastapi.tiangolo.com/", alt: "FastAPI", path: "fastapi/fastapi-original.svg" },
  { kind: "devicon", href: "https://flask.palletsprojects.com/", alt: "Flask", path: "flask/flask-original.svg" },
  { kind: "devicon", href: "https://nodejs.org/", alt: "Node.js", path: "nodejs/nodejs-original.svg" },
  { kind: "devicon", href: "https://www.java.com/", alt: "Java", path: "java/java-original.svg" },
];

const frontend: Icon[] = [
  { kind: "devicon", href: "https://reactjs.org/", alt: "React", path: "react/react-original.svg" },
  { kind: "devicon", href: "https://www.typescriptlang.org/", alt: "TypeScript", path: "typescript/typescript-original.svg" },
];

const infra: Icon[] = [
  { kind: "devicon", href: "https://www.docker.com/", alt: "Docker", path: "docker/docker-original-wordmark.svg" },
  { kind: "devicon", href: "https://www.linux.org/", alt: "Linux", path: "linux/linux-original.svg" },
  { kind: "shield", href: "https://developer.nvidia.com/", alt: "NVIDIA", label: "NVIDIA", color: "76B900", logo: "nvidia" },
  { kind: "devicon", href: "https://www.cloudflare.com/", alt: "Cloudflare", path: "cloudflare/cloudflare-original.svg" },
];

function IconRow({ items }: { items: Icon[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {items.map((i) => (
        <a key={i.alt} href={i.href} target="_blank" rel="noreferrer">
          {i.kind === "devicon" ? (
            <img src={`${DEV}/${i.path}`} alt={i.alt} width={44} height={44} />
          ) : (
            <img
              src={`https://img.shields.io/badge/${encodeURIComponent(i.label)}-${i.color}?style=for-the-badge${
                i.logo ? `&logo=${i.logo}&logoColor=white` : "&logoColor=white"
              }`}
              alt={i.alt}
              height={28}
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
