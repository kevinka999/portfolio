import React from "react";
import { DataTable, Icon, Tabs } from "@/components";
import { twMerge } from "tailwind-merge";

enum SkillCategory {
  Frontend = "Frontend",
  Backend = "Backend",
  Database = "Database",
}

type Skill = {
  name: string;
  category: SkillCategory;
  years: number;
};

const skills: Skill[] = [
  {
    name: "React",
    category: SkillCategory.Frontend,
    years: 5,
  },
  {
    name: "TypeScript",
    category: SkillCategory.Frontend,
    years: 5,
  },
  {
    name: "TRPC",
    category: SkillCategory.Frontend,
    years: 2,
  },
  {
    name: "GraphQL",
    category: SkillCategory.Frontend,
    years: 4,
  },
  {
    name: "Single-SPA / Micro-Frontend",
    category: SkillCategory.Frontend,
    years: 2,
  },
  {
    name: "Vue.js",
    category: SkillCategory.Frontend,
    years: 2,
  },
  {
    name: "Redux",
    category: SkillCategory.Frontend,
    years: 1,
  },
  {
    name: "Ionic Framework",
    category: SkillCategory.Frontend,
    years: 1,
  },
  {
    name: "jQuery",
    category: SkillCategory.Frontend,
    years: 1,
  },

  {
    name: "Node.js",
    category: SkillCategory.Backend,
    years: 4,
  },
  {
    name: "NestJS",
    category: SkillCategory.Backend,
    years: 3,
  },
  {
    name: ".NET Core",
    category: SkillCategory.Backend,
    years: 2,
  },
  {
    name: "Python (Django)",
    category: SkillCategory.Backend,
    years: 0.5,
  },

  {
    name: "MongoDB",
    category: SkillCategory.Database,
    years: 2,
  },
  {
    name: "PostgreSQL",
    category: SkillCategory.Database,
    years: 1,
  },
  {
    name: "MySQL",
    category: SkillCategory.Database,
    years: 1,
  },
  {
    name: "SQL Server",
    category: SkillCategory.Database,
    years: 1,
  },
  {
    name: "Apache Kafka",
    category: SkillCategory.Backend,
    years: 2,
  },
  {
    name: "AWS",
    category: SkillCategory.Backend,
    years: 2,
  },
];

const typeIcons: Record<
  SkillCategory,
  React.ComponentProps<typeof Icon>["icon"]
> = {
  [SkillCategory.Frontend]: "computer",
  [SkillCategory.Backend]: "network-globe",
  [SkillCategory.Database]: "directory",
};

const skillCategories = Object.values(SkillCategory);
const skillCategoryTabs = skillCategories.map((category) => ({
  label: category,
  value: category,
}));

export const Skills = () => {
  const [selectedType, setSelectedType] = React.useState<SkillCategory>(
    SkillCategory.Frontend,
  );

  const filteredSkills = skills.filter(
    (skill) => skill.category === selectedType,
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <Tabs
        items={skillCategoryTabs}
        value={selectedType}
        onChange={setSelectedType}
      />

      <div className="boxshadow-win95 flex min-h-0 flex-1 flex-col bg-white p-1">
        <div className="bg-win95-gray flex items-center gap-2 border-b border-gray-400 p-2">
          <Icon icon={typeIcons[selectedType]} size="small" />
          <span className="text-sm font-bold">{selectedType} Skills</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <DataTable.Root>
              <DataTable.Head>
                <DataTable.Row className="border-b border-gray-400 text-left">
                  <DataTable.HeaderCell>Skill</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Experience</DataTable.HeaderCell>
                </DataTable.Row>
              </DataTable.Head>

              <DataTable.Body>
                {filteredSkills.map((skill, index) => (
                  <DataTable.Row
                    key={`${skill.name}-${index}`}
                    className={twMerge(
                      "border-b border-gray-200",
                      index % 2 === 0 ? "bg-white" : "bg-gray-100",
                    )}
                  >
                    <DataTable.Cell>{skill.name}</DataTable.Cell>
                    <DataTable.Cell>
                      {skill.years}{" "}
                      {Math.ceil(skill.years) === 1 ? "year" : "years"}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable.Body>
            </DataTable.Root>
          </div>
        </div>

        <div className="bg-win95-gray px-3 py-2 text-sm">
          {filteredSkills.length} {selectedType} skills
        </div>
      </div>
    </div>
  );
};
