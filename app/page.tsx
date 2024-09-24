import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 font-mono">
      <h1 className="text-3xl font-bold">Jett Chen</h1>
      <p className="text-lg mt-5">
        I like building and breaking software.
        <br />
        Exploring Cybersecurity, AI, and Systems.
      </p>
    </div>
  );
}
