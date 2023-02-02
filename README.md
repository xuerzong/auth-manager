<section align='center'>
  <img src='./assets/hero.png'></img>
  <p>
   🎉 Help developers manage accounts
  </p>

  <div>
    English | <a href='./README_zh-CN.md'>简体中文</a>
  </div>
</section>


## Usage

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
