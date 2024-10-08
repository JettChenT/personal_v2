import { Icon } from "@iconify/react";
import Image from "next/image";

function SocialLink({
  icon,
  href,
  title,
}: {
  icon: string;
  href: string;
  title?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <Icon icon={icon} className="size-5" />
      {title}
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-2 font-mono">
      <p className="text-lg mt-12">
        I like building and breaking software.
        <br />
        Exploring Cybersecurity, AI, and Systems.
      </p>
      <div className="prose mt-5">
        <h4>Working On</h4>
        <ul>
          <li>
            <a href="https://earthkit.app">EarthKit</a> - A nifty toolkit for
            geolocation
          </li>
          <li>
            <a href="https://agent.earthkit.app">EarthKit Agent</a> -
            Multi-modal agent for geolocation and verification
          </li>
          <li>
            <a href="https://github.com/hackclub/burrow">Burrow</a> - Tool for
            burrowing through firewalls
          </li>
        </ul>
        <p>
          You can find me on <a href="https://github.com/JettChenT">GitHub</a>,{" "}
          <a href="https://x.com/jettchen5">Twitter</a>, or email at{" "}
          <span className="border px-1 whitespace-nowrap">
            hi at jettchen dot me
          </span>
        </p>
      </div>
    </div>
  );
}
