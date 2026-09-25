import { Server, Database, ShieldCheck, Cpu, Code2, Boxes, Coffee, Briefcase } from "lucide-react";

export const ICON_MAP = {
  server: Server,
  database: Database,
  shield: ShieldCheck,
  cpu: Cpu,
  code: Code2,
  boxes: Boxes,
  coffee: Coffee,
  briefcase: Briefcase,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(name) {
  return ICON_MAP[name] || Code2;
}
