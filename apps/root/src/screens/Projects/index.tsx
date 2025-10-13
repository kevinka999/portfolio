import React from "react";
import { Icon } from "@/components/Icon";
import { Carousel, Media } from "@/components/Carousel";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/Badge";
import { projects } from "./mock";

export type Project = {
  id: number;
  title: string;
  description: string;
  media: Media[];
  technologies: string[];
  features: string[];
  url?: string;
  repositoryUrl?: string;
  category: string;
};

export const Project = () => {
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);

  const handleProjectSelect = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex h-full w-full gap-3">
      <div className="flex h-full w-2/5 flex-col">
        <div className="flex items-center gap-2 border-b-2 border-gray-400 p-2">
          <Icon icon="directory" size="small" />
          <h3 className="font-bold">My Projects ({projects.length})</h3>
        </div>

        <div className="flex h-full flex-col overflow-auto bg-white">
          {projects.map((project) => (
            <div
              key={project.id}
              className={twMerge(
                "flex cursor-pointer items-center gap-3 border-b border-gray-400 p-3 hover:bg-blue-100",
                selectedProject.id === project.id && "bg-blue-200",
              )}
              onClick={() => handleProjectSelect(project)}
            >
              <Icon icon="network-globe" size="medium" />

              <div className="flex flex-grow flex-col gap-1">
                <div className="truncate text-sm font-bold">
                  {project.title}
                </div>

                <div className="flex items-center gap-1">
                  <Badge text={project.category} size="small" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-full flex-grow flex-col gap-3">
        <div className="flex flex-col gap-6 bg-gradient-to-r from-blue-50 to-blue-200 p-4 md:grid md:grid-cols-[1fr_max-content] md:items-center">
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon icon="network-globe" size="medium" />
              <h2 className="text-lg font-bold">{selectedProject.title}</h2>
            </div>

            <Badge text={selectedProject.category} size="medium" />

            <p className="text-sm text-gray-800">
              {selectedProject.description}
            </p>
          </div>

          <div className="flex flex-row items-center gap-2 md:flex-col">
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button bg-win95-gray flex cursor-pointer items-center gap-2 px-3 py-2"
            >
              <Icon icon="world-click" size="medium" />
              Visit Website
            </a>

            <a
              href={selectedProject.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button bg-win95-gray flex cursor-pointer items-center gap-2 px-3 py-2"
            >
              <Icon icon="multiple-note" size="medium" />
              View Source
            </a>
          </div>
        </div>

        <Carousel medias={selectedProject.media} />

        <div className="flex flex-grow flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon icon="directory" size="medium" />
              <h3 className="font-bold">KEY FEATURES & CAPABILITIES</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 pl-6">
              {selectedProject.features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-center gap-2"
                >
                  <div className="h-1 w-1 rounded bg-black"></div>
                  <span className="text-sm text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon icon="computer" size="medium" />
              <h3 className="font-bold">TECHNOLOGIES & TOOLS</h3>
            </div>

            <div className="flex flex-row gap-2 pl-2">
              {selectedProject.technologies.map((tech, index) => (
                <Badge key={`${tech}-${index}`} text={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
