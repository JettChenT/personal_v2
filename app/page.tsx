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
        I like building and breaking things.
      </p>
      <div className="prose mt-5">
        <h4>Currently</h4>
        <ul>
          <li>
            Freshman at <a href="https://www.cmu.edu/">CMU</a> - research @{" "}
            <a href="https://www.lti.cs.cmu.edu/">LTI</a>, CTFs @{" "}
            <a href="https://pwning.net/">PPP</a>
            <ul>
              <li>
                New study! {" "}
                <a href="https://arxiv.org/abs/2603.01203">
                  AI Agent development vs Real-world work
                </a>
              </li>
            </ul>
          </li>
          <li>
            Building <a href="https://www.paperboy.ai/">Paperboy</a> - tab tab tab across your mac
          </li>
          <li>
            <a href="https://feedpipe.io/">Explorations</a> on proactive agents and customizable rec systems
          </li>
        </ul>
        <h4>Past</h4>
        <ul>
          <li>
            <a href="https://earthkit.app">EarthKit</a> - Geolocation toolkit
            and multi-modal agent
            <ul>
              <li>
                <a href="https://geo-agent.github.io/">
                  NeurIPS &apos;24 highschool track spotlight
                </a>{" "}
                - independent research on multimodal agents for geolocation
              </li>
            </ul>
          </li>
          <li>
            Agents / Security{" "}
            research at{" "}
            <a href="https://xlab.tencent.com/en/">Tencent</a>
            <ul>
              <li>
                <a href="https://blackhat.com/asia-26/arsenal/schedule/index.html#coderetrx-one-click-to-start-your-journey-of-agentic-bug-hunting-50342">
                  Black Hat Asia 2026
                </a>{" "}
                - Effective codebase context retrieval
              </li>
            </ul>
          </li>
          <li>
            <a href="https://million.dev/">Million</a> - Interned during junior year highschool, coding agents for frontend performance optimization
          </li>
          <li>
            <a href="https://github.com/hackclub/burrow">Burrow</a> -
            Hackclub project, burrow through firewalls
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
