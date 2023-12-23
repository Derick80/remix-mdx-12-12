import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index () {
  return (
    <div >
      <h1>Welcome to Remix</h1>
      <h1>Welcome to Remix</h1>
      <h1>Welcome to Remix</h1>
      <p>wsdf</p>
      <h1>Welcome to Remix</h1>
      <h1>Welcome to Remix</h1>
      <p>wow this is amazing</p>



    </div>
  );
}
