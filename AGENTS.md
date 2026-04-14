<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# UI Consistency and Component Architecture

Always refer to `components.json` for styling and component structure. You MUST:
1. **Follow Styling Config**: Use the `base-luma` style and `mist` base color as defined.
2. **Path Aliases**: Use `@/components/ui` for UI components, `@/lib/utils` for utilities, and `@/hooks` for custom hooks.
3. **Iconography**: Use the **Tabler** icon library exclusively.
4. **Registries**: Prioritize components from **Aceternity UI** (@aceternity) for advanced interactions.
5. **Tailwind**: Ensure all styles are integrated via `src/app/globals.css` and follow the defined pathing.
<!-- END:nextjs-agent-rules -->
