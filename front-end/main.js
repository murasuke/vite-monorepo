//@ts-check
import * as cowsay from 'cowsay';

const response = await fetch('http://localhost:3000/');
const loremIpsum = await response.text();
const said = cowsay.say({
  text: loremIpsum,
});

// @ts-ignore
document.querySelector('#app pre').textContent = said;

// やりたいこと
// api.tsに書いてある関数を、そのままま呼び出すイメージでREST APIの呼び出しをしたい
// 例えば下記のようなイメージで
// const api = createAPI();
// api.loremIpsum(1, 'paragraph');

/**
 * @returns {any}
 */
function createAPI(api) {
  return {};
}

// jsdocを使うと戻り型指定はできるが、コメントが必要になってしまう
/**
 * @type { import("../back-end/api/api") }
 */
const api = createAPI('api');
const message = api.loremIpsum(1, 'paragraph');

// アンビエント宣言(global.d.ts)を作るのがよさそうか？
// declare var api2: typeof import('../back-end/api/api');

// グローバル空間にapiモジュールをこさえて入れておくみたいな
