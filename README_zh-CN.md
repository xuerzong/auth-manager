<section align='center'>
  <img src='./assets/hero.png'></img>
  <p>
   🎉 帮助开发者们管理账号
  </p>

  <div>
    <a href='./README.md'>English</a> | 简体中文
  </div>
</section>


## 如何开发

```bash
git clone https://github.com/xuerzong/auth-manager.git
# or
git clone git@github.com:xuerzong/auth-manager.git

cd auth-manager

yarn install
yarn dev
```

```typescript
// src/services/auth.ts
import type { AccountInterface } from '@/types/account'

export const select = async (account: AccountInterface) => {
  // selected
}

export default { select }
```

## 如何使用

```bash
yarn build
```

然后：

- 打开Chrome浏览器，然后输入`chrome://extensions/`

- 打开`开发者模式`

- 点击`加载已解压的拓展程序`按钮，选择项目打包好的`dist`文件夹

## 配置项

- `@/libs/cookies`

```typescript
import cookies from '@/libs/cookies'

cookies.set(KEY, VALUE)
```

- `@/libs/tabs`

```typescript
import tabs from '@/libs/tabs'

tabs.reload() // 重新加载当前tab
```

- `@/libs/storage`

```typescript
import storage from '@/libs/storage'

storage.get(KEY)

storage.set(KEY, VALUE)
```

- `@/libs/router`

```typescript
import router from '@/libs/router'

router.goto(LOCATION)
```

- `@/libs/request`

```typescript
import reuqest from '@/libs/request'
request.get(...args)
request.post(...args)
```
