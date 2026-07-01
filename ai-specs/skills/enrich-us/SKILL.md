---
name: enrich-us
description: Analyze and enhance user stories with complete, implementation-ready technical detail from direct ticket input or GitHub Issues.
author: LIDR.co (adapted for GitHub Issues)
version: 1.1.0
---
# enrich-us Skill

Use it when this workflow is required in the project.

## Instructions

Please analyze and enrich the ticket: $ARGUMENTS.

Follow these steps:

1. Determine the ticket input source:
   - **Direct input mode (default when ticket text is provided):** Use the ticket content shared by the user in the prompt/chat.
   - **GitHub Issues mode (optional):** If the user provides an issue number/URL (e.g. `#3`), or asks to use GitHub Issues (including references like "the open one about bricks"), fetch the issue with the `gh` CLI (`gh issue view <number> --comments`) or the GitHub MCP server if available.
2. Act as a product expert with technical knowledge.
3. Understand the problem described in the ticket.
4. Decide whether or not the User Story is completely detailed according to product best practices. Validate that it includes:
   - Full functionality description
   - Comprehensive list of fields/state to update
   - Required interfaces and contracts (endpoints if backend; scenes, objects and events if frontend/game)
   - Files/modules to modify according to architecture and best practices
   - Definition of done (implementation and delivery steps)
   - Documentation and unit test updates
   - Non-functional requirements (security, performance, observability, etc.)
5. If the story lacks enough technical detail for autonomous implementation, provide an improved version that is clearer, more specific, and concise, aligned with step 4. Use project technical context from \`@documentation\`. Return the result in markdown.
6. Output format must always include:
   - \`## Original\`
   - \`## Enhanced\`
7. GitHub write-back is optional and only applies in GitHub Issues mode:
   - Post the enhanced content as a comment on the issue (\`gh issue comment <number> --body-file <file>\`), with clear \`##\` sections \`[original]\` and \`[enhanced]\` and readable formatting (lists/code snippets when useful).
   - Add the label \`refined\` to the issue (\`gh issue edit <number> --add-label refined\`), creating it first if missing (\`gh label create refined\`).

## Notes

- Do not require GitHub access when the user already provided full ticket content directly.
- If input is ambiguous (for example, user gives a short reference without content), ask whether to resolve via GitHub Issues or request the full ticket text.
- Never close or reassign issues from this skill; only comment and label.
