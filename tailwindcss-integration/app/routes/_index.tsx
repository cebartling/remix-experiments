import type { MetaFunction } from "@remix-run/node";
import LandingPageLayout from "../components/layouts/LandingPageLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <LandingPageLayout>
      <h1>Index</h1>
    </LandingPageLayout>
  );
}
