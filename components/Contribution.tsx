/* eslint-disable @next/next/no-img-element */
export function Contribution() {
  return (
    <div className="flex flex-col gap-4">
      <img
        src="https://streak-stats.demolab.com/?user=amu815&theme=tokyonight&hide_border=true&border_radius=20"
        alt="github streak stats"
        className="w-full max-w-3xl self-center rounded-2xl"
      />
      <img
        src="https://github-readme-activity-graph.vercel.app/graph?username=amu815&theme=tokyo-night&hide_border=true&radius=16"
        alt="contribution activity graph"
        className="w-full max-w-3xl self-center rounded-2xl"
      />
    </div>
  );
}
