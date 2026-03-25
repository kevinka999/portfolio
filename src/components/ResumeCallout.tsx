import { Icon } from "./Icon";

type ResumeCalloutProps = {
  title?: string;
  ctaLabel?: string;
};

export const ResumeCallout = ({
  title = "Looking for my resume?",
  ctaLabel = "Click here to download it",
}: ResumeCalloutProps) => {
  return (
    <div className="boxshadow-win95 flex flex-row items-center gap-4 p-3">
      <Icon icon="wordpad" size="medium" alt="Wordpad icon" />

      <div className="flex flex-col leading-snug">
        <p className="text-[16px] font-bold">{title}</p>
        <a
          href="/kevin_katzer_resume.pdf"
          download="kevin_katzer_resume.pdf"
          className="font-writing cursor-pointer bg-transparent text-left text-[14px] text-blue-600 underline"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
};
