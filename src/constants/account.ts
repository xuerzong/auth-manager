import type { AccountInterface } from '@/types/account'

export enum AccountModalModes {
  Edit = 'Edit',
  Add = 'Add',
}

export const emptyAccount: AccountInterface = {
  key: '',
  password: '',
}
