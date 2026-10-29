import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The prompting guide is an Agent Skill in skills/flow-video-prompting (installable into Claude Code, Copilot, Codex).
// The MCP serves the same files, so clients without skill support get identical guidance.
const SKILL_DIR = fileURLToPath(new URL("../skills/flow-video-prompting/", import.meta.url));
const TEMPLATE_DIR = `${SKILL_DIR}templates/`;

export const TEMPLATE_NAMES = existsSync(TEMPLATE_DIR)
  ? readdirSync(TEMPLATE_DIR).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)).sort()
  : [];

const read = (file: string) => {
  if (!existsSync(file)) throw new Error(`Prompting guide not found at ${file}. Reinstall flow-mcp from the repository.`);
  return readFileSync(file, "utf8");
};

export const promptGuide = () => read(`${SKILL_DIR}SKILL.md`).replace(/^---\n[\s\S]*?\n---\n/, "").trim();

export const promptTemplate = (name: string) => {
  if (!TEMPLATE_NAMES.includes(name)) throw new Error(`Unknown template "${name}". Choose one of: ${TEMPLATE_NAMES.join(", ")}.`);
  return read(`${TEMPLATE_DIR}${name}.md`).trim();
};
