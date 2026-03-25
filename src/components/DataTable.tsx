import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type TableElementProps = ComponentPropsWithoutRef<"table">;
type TableSectionProps = ComponentPropsWithoutRef<"thead">;
type TableBodyProps = ComponentPropsWithoutRef<"tbody">;
type TableRowProps = ComponentPropsWithoutRef<"tr">;
type TableCellProps = ComponentPropsWithoutRef<"th">;
type TableDataCellProps = ComponentPropsWithoutRef<"td">;

const Root = ({ className, ...props }: TableElementProps) => (
  <table className={twMerge("w-full", className)} {...props} />
);

const Head = ({ className, ...props }: TableSectionProps) => (
  <thead className={twMerge("bg-win95-gray", className)} {...props} />
);

const Body = ({ className, ...props }: TableBodyProps) => (
  <tbody className={className} {...props} />
);

const Row = ({ className, ...props }: TableRowProps) => (
  <tr className={className} {...props} />
);

const HeaderCell = ({ className, ...props }: TableCellProps) => (
  <th className={twMerge("px-4 py-2 text-sm font-bold", className)} {...props} />
);

const Cell = ({ className, ...props }: TableDataCellProps) => (
  <td className={twMerge("p-3 text-sm", className)} {...props} />
);

export const DataTable = {
  Root,
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
};
