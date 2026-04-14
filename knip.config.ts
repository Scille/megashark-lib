import type { KnipConfig } from 'knip';

// TL;DR: the code below customizes knip's "compiler" for '.vue' files
//
// Knip plugins use custom "compilers" (not actual compilers, but a bunch of regex functions)
// to parse source files. These compilers may fail to extract code (imports, exports, ...)
// from source files depending on how you write code.
// This is the case for the 'vue' plugin which does not manage to extract code from '.vue' files.
// Therefore, the code below overwrite the vue compiler with functions that extracts the required
// code so knip can know what is actually used or not.
// See: https://knip.dev/features/compilers#vue
import { parse, type SFCScriptBlock, type SFCStyleBlock } from 'vue/compiler-sfc';

function getScriptBlockContent(block: SFCScriptBlock | null): string[] {
  if (!block) return [];
  if (block.src) return [`import '${block.src}'`];
  return [block.content];
}

function getStyleBlockContent(block: SFCStyleBlock | null): string[] {
  if (!block) return [];
  if (block.src) return [`@import '${block.src}';`];
  return [block.content];
}

function getStyleImports(content: string): string {
  return [...content.matchAll(/(?<=@)import[^;]+/g)].join('\n');
}

// Knip configuration
const config = {
  tags: ['-lintignore'],
  // Add entry files from "lib/" directory (not added by knip's default entry file patterns)
  // See: https://knip.dev/explanations/entry-files#default-entry-file-patterns
  entry: ['lib/index.ts', 'lib/theme/index.scss'],
  // Enable 'vue' plugin
  // For some reason, knip does not enable it automatically (maybe because 'vue' is listed
  // as a peerDependency instead of a regular dependency?)
  vue: true,
  // Customize compiler for the 'vue' plugin (see comments at the top of the file)
  compilers: {
    vue: (source: string, filename: string): string => {
      const { descriptor } = parse(source, { filename, sourceMap: false });
      return [
        ...getScriptBlockContent(descriptor.script),
        ...getScriptBlockContent(descriptor.scriptSetup),
        ...descriptor.styles.flatMap(getStyleBlockContent).map(getStyleImports),
      ].join('\n');
    },
  },
  ignoreFiles: [
    'lib/components/ms-modal/MsSmallDisplayStepperModal.vue', // TODO: knip reports it as unused, check if still needed?
  ],
  ignoreUnresolved: [
    './@lib/theme', // TODO: knip reports "use ./@lib/theme as ms" in .scss files as unresolved imports, why?
  ],
} satisfies KnipConfig;

export default config;
