/* eslint-disable @next/next/no-img-element */
export function Contact() {
  return (
    <div className="flex flex-wrap gap-2">
      <a href="https://x.com/amu_Humano_Dev" target="_blank" rel="noreferrer">
        <img
          src="https://img.shields.io/badge/-@amu__Humano__Dev-000000?style=flat-square&logo=x&logoColor=white"
          alt="X: @amu_Humano_Dev"
          height={20}
        />
      </a>
      <a href="https://qiita.com/Humanophilic_development" target="_blank" rel="noreferrer">
        <img
          src="https://img.shields.io/badge/-Qiita-55C500?style=flat-square&logo=qiita&logoColor=white"
          alt="Qiita"
          height={20}
        />
      </a>
    </div>
  );
}
