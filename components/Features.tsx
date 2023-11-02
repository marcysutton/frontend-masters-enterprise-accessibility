import {
  LightningBoltIcon,
  PuzzleIcon,
  CogIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Minimum Accessible Products",
    icon: PuzzleIcon,
  },
  {
    name: "What Makes an Accessible User Interface?",
    icon: () => <img src="/react.svg" height="24" width="24" />,
  },
  {
    name: "Accessible Naming & Screen Reader Concerns",
    icon: CogIcon,
  },
  {
    name: "Accessibility in JS Apps",
    icon: LightningBoltIcon,
  },
  {
    name: "Test Automation for Accessibility",
    icon: LightningBoltIcon,
  },
  {
    name: "Organizational Skill-Building",
    icon: LightningBoltIcon,
  }
];

function Features() {
  return (
    <>
      <ol className="list-disc my-12">
        {features.map(({ icon: Icon, ...feature }, i) => (
          <li
            className="space-x-4"
            key={feature.name.split(" ").join("-")}
          >
            <div>
              <div className="my-0 font-small dark:text-white">
                {feature.name}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Features;
