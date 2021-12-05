# backlog-watcher
Backlogで予め定義したメンバーリストに従って、担当のチケットを期間で分けてslackに通知するアプリ。

※公開用に、gitlab別レポジトリからの移植、及び個人情報等削除しての掲載のため、そのままでは動きません。

## Repository structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── definitions
│   │   ├── apiDefinition.ts
│   │   ├── searchConditionDefinition.ts
│   │   └── userDefinition.ts
│   ├── fetchData.ts
│   ├── index.ts
│   ├── sendMessage.ts
│   ├── types
│   │   ├── comments.d.ts
│   │   └── issues.d.ts
│   ├── util
│   │   ├── dateUtil.ts
│   │   └── typeUtil.ts
│   └── view-data
│       ├── comments.ts
│       ├── issues.ts
│       └── sendMessage.ts
└── tsconfig.json
```

## Type-Checking the repo

```shell
npm run type-check
```

And to run in --watch mode:

```shell
npm run type-check:watch
```

## Start Node JS server

```shell
npm run start
```