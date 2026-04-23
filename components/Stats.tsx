/* eslint-disable @next/next/no-img-element */
const BASE =
  "https://raw.githubusercontent.com/amu815/amu815/main/profile-summary-card-output/tokyonight";

export function Stats() {
  return (
    <div className="flex flex-col gap-4">
      <img
        src={`${BASE}/0-profile-details.svg`}
        alt="profile details"
        className="w-full max-w-3xl self-center rounded-2xl"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <img
          src={`${BASE}/2-most-commit-language.svg`}
          alt="most commit language"
          className="w-full rounded-2xl"
        />
        <img
          src={`${BASE}/4-productive-time.svg`}
          alt="productive time"
          className="w-full rounded-2xl"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[55%_45%]">
        <img
          src="https://github-readme-stats-sigma-five.vercel.app/api?username=amu815&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true&border_radius=20"
          alt="github readme stats"
          className="w-full rounded-2xl"
        />
        <img
          src={`${BASE}/1-repos-per-language.svg`}
          alt="repos per language"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
