<section align='center'>
  <img src='./assets/hero.png'></img>
  <p>
   🎉 帮助开发者们管理账号
  </p>

  <div>
    <a href='./README.md'>English</a> | 简体中文
  </div>
</section>


## 使用方法

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
