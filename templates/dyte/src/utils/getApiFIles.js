import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default async function getApiFiles() {
  try {
    // eslint-disable-next-line no-undef
    const context = require.context('/apis', true, /\.(yaml|json)$/);
    const files = await Promise.all(
      context.keys().map(async (key) => {
        const fileContent = await context(key);
        let parsedContent;

        // Se for YAML, precisamos fazer o parse
        if (key.endsWith('.yaml') || key.endsWith('.yml')) {
          parsedContent = yaml.load(fileContent);
        } else {
          // Se for JSON, o webpack já faz o parse automaticamente
          parsedContent = fileContent;
        }

        return {
          path: key,
          name: key
            .split('/')
            .pop()
            .replace(/\.(yaml|json)$/, ''),
          content: parsedContent,
        };
      }),
    );

    return files;
  } catch (error) {
    console.error('Error loading API files:', error);
    return [];
  }
}
