import { CONTACT_EMAIL, contactLinks } from "@/const";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: ReactNode;
  subtitle: ReactNode;
};

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="leading-tight">
        <h1 className="font-writing text-[28px] font-bold">{title}</h1>
        <p className="font-writing text-[22px]">{subtitle}</p>
      </div>

      <div className="flex flex-col items-end justify-center text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {contactLinks.map((link, index) => (
            <div key={link.href} className="inline-flex items-center gap-3">
              <a
                href={link.href}
                className="font-writing inline-flex cursor-pointer items-center gap-1 text-[14px] text-blue-600 underline"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {link.label}
                {link.icon}
              </a>

              {index < contactLinks.length - 1 ? (
                <span className="font-writing text-[14px]">/</span>
              ) : null}
            </div>
          ))}
        </div>

        <span className="font-writing inline-flex text-[14px]">
          {CONTACT_EMAIL}
        </span>
      </div>
    </div>
  );
};
