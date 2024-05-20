/**
 * JavaScriptのモジュールをREST APIとして公開するexpressミドルウェア
 * 機能
 * ・/api/にあるファイル(module)を動的に読み込み、下記ルールでURLとマッピングする
 * 　http(s)://<host_name>/<ファイル名(拡張子抜き)>/<関数名>
 * ・(get:クエリストリング|post:リクエストbody)から関数の引数と同じ名前で取り出して、関数を呼び出す
 * ex.
 *  api/api.ts に `export const add = (lhv, rhv) => lhv + rhv;` という関数が宣言すると
 *  localhost/api/add?lhv=1&rhv=2 で呼び出すことができる
 */

import type express from 'express';
import type QueryString from 'qs';
import fs from 'fs';
import path from 'path';
import fnArgs from 'fn-args';

type Callable = (...args: any) => any;
// インデックスシグネチャのvalueの型情報を取り出すユーティリティー型
type ValueType<T> = T extends { [key: string]: infer U } ? U : never;
type Mapper = (
  req: express.Request
) => (arg: string) => ValueType<QueryString.ParsedQs>;

const handler = (func: Callable, arg_mapper: Mapper) => {
  return (req: express.Request, res: express.Response) => {
    func['Request'] = req; // requestを呼び出し元で参照できるようにする
    const result = func(...fnArgs(func).map(arg_mapper(req)));
    res.json(result);
  };
};

const apiModuleLoader = async (express: express.Express) => {
  const api_files = fs.readdirSync('./api');
  for (let file_name of api_files) {
    file_name = path.parse(file_name).name;
    const module = await import(/* @vite-ignore */ `./api/${file_name}`);
    for (const key of Object.keys(module)) {
      const func = module[key];
      const route = `/${file_name}/${key}`;
      if (typeof func === 'function') {
        express.get(
          route,
          handler(func, (req) => (arg) => req.query[arg])
        );
        express.post(
          route,
          handler(func, (req) => (arg) => req.body[arg])
        );
      }
    }
  }
  const requestHandler = async (req, res, next) => {
    next();
  };
  return requestHandler;
};

export default apiModuleLoader;
