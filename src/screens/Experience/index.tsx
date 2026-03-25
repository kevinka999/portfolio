import { Divider, PageHeader, ResumeCallout } from "@/components";
import { LuExternalLink } from "react-icons/lu";
import { experiences } from "./mock";

export const Experience = () => {
  return (
    <div className="page">
      <div className="mx-auto flex min-h-full w-full max-w-215 flex-col gap-4 px-8 py-4">
        <PageHeader
          title="Experience"
          subtitle="Products, platforms, and systems I've helped build"
        />

        <Divider />

        <div className="flex flex-col gap-4">
          <p className="font-writing text-[14px]">
            Over the years I&apos;ve worked across product teams, consulting
            projects, and internal platforms, moving between frontend, backend,
            architecture, and delivery. This is a quick overview of where
            I&apos;ve been and the kind of work I&apos;ve been involved with.
          </p>
        </div>

        <ResumeCallout />

        <div className="mt-2 flex flex-col gap-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-writing text-[24px] font-bold">
                    {experience.company}
                  </h2>

                  {experience.externalSource ? (
                    <a
                      href={experience.externalSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer border-b border-current leading-none text-blue-600"
                      aria-label={`Open external source for ${experience.company}`}
                    >
                      <LuExternalLink size={14} />
                    </a>
                  ) : null}
                </div>

                <span className="font-writing text-[14px]">
                  {experience.period}
                </span>
              </div>

              <p className="font-writing text-[14px]">{experience.overview}</p>

              <div className="bg-win95-gray/10 border-win95-blue border-l-4 p-2">
                <ul className="flex list-disc flex-col gap-2 pl-6">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="font-writing text-[14px]">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
