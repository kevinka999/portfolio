import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiFileText,
  FiDownload,
} from "react-icons/fi";

type BadgeType = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const badges: BadgeType[] = [
  {
    icon: <FiMapPin size={24} />,
    title: "Location",
    value: "San Francisco, CA",
  },
  { icon: <FiMail size={24} />, title: "Email", value: "kevinka99@gmail.com" },
  {
    icon: <FiCalendar size={24} />,
    title: "Availability",
    value: "Open to opportunities",
  },
  { icon: <FiBriefcase size={24} />, title: "Experience", value: "5+ years" },
];

const techStack = ["React", "TypeScript", "Node.js", "Next.js", "AWS"];

export const About = () => {
  const handleEmailClick = () => {
    window.open("mailto:kevinka99@gmail.com", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/kevinkatzer/", "_blank");
  };

  const handleGithubClick = () => {
    window.open("https://github.com/kevinkatzer", "_blank");
  };

  const handleDownloadResume = () => {
    window.open("/cv.pdf", "_blank");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="boxshadow-win95 bg-win95-gray p-2">
          <div className="h-32 w-32 overflow-hidden">
            <img
              src="/images/profile-picture.jpeg"
              alt="Profile"
              className="h-full w-full scale-200 object-cover object-[50%_25%]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <h1 className="text-win95-blue text-xl font-bold">Kevin Katzer</h1>
            <h2 className="text-sm">Full Stack Developer</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm">Available for work</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            className={`boxshadow-win95 cursor-pointer p-2`}
            aria-label="Email"
            onClick={handleEmailClick}
          >
            <FiMail size={18} />
          </button>
          <button
            className={`boxshadow-win95 cursor-pointer p-2`}
            aria-label="LinkedIn"
            onClick={handleLinkedInClick}
          >
            <FiLinkedin size={18} />
          </button>
          <button
            className={`boxshadow-win95 cursor-pointer p-2`}
            aria-label="GitHub"
            onClick={handleGithubClick}
          >
            <FiGithub size={18} />
          </button>
        </div>

        <button
          className={`boxshadow-win95 flex cursor-pointer items-center gap-2 px-4 py-2`}
          onClick={handleDownloadResume}
        >
          <FiDownload size={24} />
          <span className="text-sm">Download Resume</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="boxshadow-win95 flex flex-col gap-3 bg-white p-4">
          <div className="flex items-center gap-2">
            <FiFileText size={20} className="text-win95-blue" />
            <h3 className="text-win95-blue text-lg font-bold">About Me</h3>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              Welcome to my portfolio! I'm a passionate developer with expertise
              in building modern web applications that combine cutting-edge
              technology with intuitive user experiences.
            </p>
            <p className="text-sm">
              With over 5 years of experience in software development, I
              specialize in creating responsive, user-friendly applications
              using the latest technologies and best practices. I love turning
              complex problems into simple, beautiful solutions.
            </p>
          </div>

          <div className="flex gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-win95-gray boxshadow-win95 px-2 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {badges.map((badge, index) => (
            <div key={index} className="boxshadow-win95 bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="text-win95-blue">{badge.icon}</div>
                <div>
                  <h3 className="text-win95-blue text-sm font-bold">
                    {badge.title}
                  </h3>
                  <p className="text-sm">{badge.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
