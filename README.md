# フロントもバックエンドもviteで即時反映されるモノレポテンプレート

## はじめに

ひとつのGitリポジトリで複数のnpmを扱うため、npmのワークスペース (workspaces)を利用して構成する

* モノレポ(monorepo)の作り方は下記を参考に

[npm workspacesとモノレポ探検記](https://zenn.dev/suin/scraps/20896e54419069)

* バックエンドは下記を参考に

[TypeScript+Express+Viteを用いたモダン(？)なWeb APIアプリのボイラーテンプレートを作ってみました。](https://www.neko3cs.net/entry/express-ts-with-vite-template)

* フロントエンド側は自分で作った下記を元に、fetch APIでバックエンドと通信する機能を追加

[Viteでテンプレートを利用せずにVanilla JS環境を作成する](https://qiita.com/murasuke/items/67079163deb2a682d7d0)


## 作成手順

```bash
$ npm init -w back-end -y
$ npm i express cors express-validator -w back-end
$ npm i -D typescript vite vite-plugin-node -w back-end
$ npm i -D @types/cors  @types/express -w back-end
$ npm i lorem-ipsum-japanese -w back-end/
$ npm i -D @types/lorem-ipsum-japanese -w back-end/
```

```bash
$ npm init -w front-end -y
$ npm i -D vite -w front-end/
$ npm i cowsay -w front-end
```
