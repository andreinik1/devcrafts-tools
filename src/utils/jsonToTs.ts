export interface JsonToTsOptions {
  rootName: string;
  useInterface: boolean;
  exportTypes: boolean;
  makeOptional: boolean;
}

export interface JsonToTsResult {
  tsCode: string;
  zodCode: string;
  isValidJson: boolean;
  errorMessage?: string;
}

function capitalize(str: string): string {
  if (!str) return 'Root';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTypeScriptType(val: any, keyName: string, interfaces: string[], options: JsonToTsOptions): string {
  if (val === null) return 'any';
  if (val === undefined) return 'undefined';

  const type = typeof val;

  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'boolean') return 'boolean';

  if (Array.isArray(val)) {
    if (val.length === 0) return 'any[]';
    const firstType = getTypeScriptType(val[0], keyName + 'Item', interfaces, options);
    return `${firstType}[]`;
  }

  if (type === 'object') {
    const interfaceName = capitalize(keyName);
    generateInterface(val, interfaceName, interfaces, options);
    return interfaceName;
  }

  return 'any';
}

function generateInterface(obj: Record<string, any>, name: string, interfaces: string[], options: JsonToTsOptions) {
  const prefix = options.exportTypes ? 'export ' : '';
  const lines: string[] = [];

  if (options.useInterface) {
    lines.push(`${prefix}interface ${name} {`);
  } else {
    lines.push(`${prefix}type ${name} = {`);
  }

  Object.entries(obj).forEach(([key, val]) => {
    const isOptional = options.makeOptional && (val === null || val === undefined);
    const tsType = getTypeScriptType(val, key, interfaces, options);
    const optionalMark = isOptional ? '?' : '';
    lines.push(`  ${key}${optionalMark}: ${tsType};`);
  });

  lines.push('};');
  interfaces.push(lines.join('\n'));
}

function getZodSchema(val: any, keyName: string, zodSchemas: string[], rootName: string): string {
  if (val === null || val === undefined) return 'z.any()';

  const type = typeof val;

  if (type === 'string') return 'z.string()';
  if (type === 'number') return 'z.number()';
  if (type === 'boolean') return 'z.boolean()';

  if (Array.isArray(val)) {
    if (val.length === 0) return 'z.array(z.any())';
    const inner = getZodSchema(val[0], keyName + 'Item', zodSchemas, rootName);
    return `z.array(${inner})`;
  }

  if (type === 'object') {
    const schemaName = `${capitalize(keyName)}Schema`;
    const lines: string[] = [];
    lines.push(`export const ${schemaName} = z.object({`);
    Object.entries(val).forEach(([key, value]) => {
      const fieldZod = getZodSchema(value, key, zodSchemas, rootName);
      lines.push(`  ${key}: ${fieldZod},`);
    });
    lines.push('});');
    zodSchemas.push(lines.join('\n'));
    return schemaName;
  }

  return 'z.any()';
}

export function convertJsonToTsAndZod(jsonString: string, options: JsonToTsOptions): JsonToTsResult {
  if (!jsonString.trim()) {
    return {
      tsCode: '',
      zodCode: '',
      isValidJson: true,
    };
  }

  try {
    const parsed = JSON.parse(jsonString);
    const interfaces: string[] = [];
    const zodSchemas: string[] = [];

    const rootName = capitalize(options.rootName || 'Root');

    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      generateInterface(parsed, rootName, interfaces, options);
      getZodSchema(parsed, rootName, zodSchemas, rootName);
    } else if (Array.isArray(parsed)) {
      const itemType = parsed.length > 0 ? getTypeScriptType(parsed[0], 'Item', interfaces, options) : 'any';
      const prefix = options.exportTypes ? 'export ' : '';
      interfaces.push(`${prefix}type ${rootName} = ${itemType}[];`);
      zodSchemas.push(`export const ${rootName}Schema = z.array(z.any());`);
    } else {
      const primitiveType = typeof parsed;
      const prefix = options.exportTypes ? 'export ' : '';
      interfaces.push(`${prefix}type ${rootName} = ${primitiveType};`);
      zodSchemas.push(`export const ${rootName}Schema = z.${primitiveType}();`);
    }

    const tsCode = interfaces.reverse().join('\n\n');
    const zodCode = "import { z } from 'zod';\n\n" + zodSchemas.reverse().join('\n\n');

    return {
      tsCode,
      zodCode,
      isValidJson: true,
    };
  } catch (err: any) {
    return {
      tsCode: '',
      zodCode: '',
      isValidJson: false,
      errorMessage: err?.message || 'Invalid JSON syntax',
    };
  }
}
