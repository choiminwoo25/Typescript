"""Add a visible reminder when a pending tool call looks destructive.

This is a lightweight keyword heuristic. PreToolUse supplies the pending tool
name and arguments; it does not supply the full conversation or user prompt.
"""

import json
import re
import sys


PATTERNS = {
    "file deletion": re.compile(
        r"\b(?:rm|rmdir|del|erase|remove-item|unlink|shutil\.rmtree|git\s+clean|git\s+rm)\b"
        r"|\b(?:delete|remove|삭제|지워|제거)\b",
        re.IGNORECASE,
    ),
    "library or dependency removal": re.compile(
        r"\b(?:npm|pnpm|yarn|bun)\s+(?:uninstall|remove|rm)\b"
        r"|\b(?:uninstall|remove|delete)\s+(?:a\s+)?(?:library|package|dependency|feature)\b"
        r"|\b(?:라이브러리|패키지|기능).{0,20}(?:삭제|제거)\b",
        re.IGNORECASE,
    ),
    "database object or data removal": re.compile(
        r"\b(?:drop\s+(?:table|schema|database|policy|function)|truncate\s+table)\b"
        r"|\bdelete\s+from\b",
        re.IGNORECASE,
    ),
}


def main() -> None:
    try:
        event = json.load(sys.stdin)
    except (json.JSONDecodeError, OSError):
        return

    tool_name = str(event.get("tool_name", "unknown tool"))
    tool_input = event.get("tool_input", {})
    inspected = json.dumps(tool_input, ensure_ascii=False, sort_keys=True)
    matches = [label for label, pattern in PATTERNS.items() if pattern.search(inspected)]
    if not matches:
        return

    reasons = ", ".join(matches)
    context = (
        f"Potentially destructive action detected in {tool_name} input ({reasons}). "
        "Before proceeding, compare this action with the user's request, identify "
        "the exact target and scope, and report suspicious or unauthorized removal. "
        "This hook only flags likely matches; it does not block the tool call and "
        "cannot inspect the full user prompt."
    )
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "additionalContext": context,
                }
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
