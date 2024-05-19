import { loremIpsum as lorem } from 'lorem-ipsum';

type Units = 'paragraph' | 'sentence' | 'word';

export function loremIpsum(count: number, units: Units): string {
  const message = lorem({ count, units });
  return message;
}

export const test1 = () => {
  // 関数自体にreqをセットして呼び出すので、必要があれば参照可能
  if (test1['Request']['method'] == 'GET') {
    return 'test1 get';
  } else {
    return { message: 'test1 post' };
  }
};
