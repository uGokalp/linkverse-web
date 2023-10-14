import Header from "@/components/header";
import Landing from "@/components/landing";

export default async function Home() {
  return (
    <div className="background-image">
      <Header />
      <Landing />
    </div>
  );
}
