<section align='center'>
  <img src='./assets/hero.png'></img>
  <p>
   🎉 Help developers manage accounts
  </p>

  <div>
    English | <a href='./README_zh-CN.md'>简体中文</a>
  </div>
</section>


## How to dev

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

## Usage

```bash
yarn build
```

then:

- Open the Extension Management page by navigating to `chrome://extensions`

- Enable the `Developer mode`

- Use the `Load unpacked` button to select the `dist` dir.

## Options

- `@/libs/cookies`

```typescript
import { setCookies } from '@/libs/cookies'

setCookies(KEY, VALUE)
```

- `@/libs/tabs`

```typescript
import { reload } from '@/libs/tabs'

reload() // reload current tab
```

- `@/libs/storage`

```typescript
import { set, get } from '@/libs/storage'

await get(KEY)

set(KEY, VALUE)
```

- `@/libs/router`

```typescript
import { goto } from '@/libs/router'

goto(LOCATION)
```

- `@/libs/request`

```typescript
import { get, post } from '@/libs/request'
```