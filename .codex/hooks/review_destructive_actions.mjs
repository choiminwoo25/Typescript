#!/usr/bin/env node

/**
 * Add a visible reminder when a pending tool call looks destructive.
 * PreToolUse provides the pending tool name and arguments, not the full prompt.
 */

import { readFileSync } from 'node:fs';

const patterns = [
  [
    'file deletion',
    /\b(?:rm|rmdir|del|erase|remove-item|unlink|shutil\.rmtree|git\s+clean|git\s+rm)\b|\b(?:delete|remove|삭제|지워|제거)\b/i,
  ],
  [
    'library or dependency removal',
    /\b(?:npm|pnpm|yarn|bun)\s+(?:uninstall|remove|rm)\b|\b(?:uninstall|remove|delete)\s+(?:a\s+)?(?:library|package|dependency|feature)\b|\b(?:라이브러리|패키지|기능).{0,20}(?:삭제|제거)\b/i,
  ],
  [
    'database object or data removal',
    /\b(?:drop\s+(?:table|schema|database|policy|function)|truncate\s+table)\b|\bdelete\s+from\b/i,
  ],
];

let event;
try {
  event = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const toolName = String(event.tool_name ?? 'unknown tool');
const inspectedInput = JSON.stringify(event.tool_input ?? {});
const matches = patterns
  .filter(([, pattern]) => pattern.test(inspectedInput))
  .map(([label]) => label);

if (matches.length > 0) {
  const context =
    `Potentially destructive action detected in ${toolName} input (${matches.join(', ')}). ` +
    "Before proceeding, compare this action with the user's request, identify " +
    'the exact target and scope, and report suspicious or unauthorized removal. ' +
    'This hook only flags likely matches; it does not block the tool call and ' +
    'cannot inspect the full user prompt.';

  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: context,
      },
    })}\n`,
  );
}
