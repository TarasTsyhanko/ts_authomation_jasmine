// @ts-ignore
import yaml from 'js-yaml'
import * as fs from 'fs';

export function readYml(path: string): any {
    try {
        return yaml.load(fs.readFileSync(path, 'utf8'));
    } catch (e
        ) {
        throw new Error(`There was a problem with parsing ${path}. Ensure it is valid YAML! ${e}`);
    }
}
