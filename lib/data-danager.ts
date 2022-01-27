import {readYml} from './file-reader';

export function getTestData(env: any): Array<any> {
    return readYml(replacePath(env)).data;
}

function replacePath(path: any): string {
    return path.toString()
        .replace('.ts', '.yaml')
        .replace('test', 'test_data');
}

