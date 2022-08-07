import { Box, useRadio, useRadioGroup } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import type { AccountInterface } from '@/types/account'
import Account from '../common/Account'

const accountsMock: AccountInterface[] = [
  {
    account: 'admin@163.com',
    password: '12345a',
    tags: ['admin'],
  },
  {
    account: 'xcsmall@163.com',
    password: '12345a',
    tags: ['op'],
  },
]

const AccountRadioCard: React.FC<PropsWithChildren> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props as any)

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Box
        {...getCheckboxProps()}
        cursor="pointer"
        _hover={{
          bg: 'gray.100',
        }}
        _checked={{
          bg: 'blue.600',
          color: 'white',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

const Accounts: React.FC = () => {
  const handleChange = (nextValue: string) => {
    // todo
    console.log(nextValue)
    window.close()
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'accounts',
    defaultValue: accountsMock[0].account,
    onChange: handleChange,
  })

  const accountsRender = accountsMock.map((item) => {
    return (
      <AccountRadioCard
        key={item.account}
        {...getRadioProps({ value: item.account })}
      >
        <Account {...item} />
      </AccountRadioCard>
    )
  })

  return (
    <Box as="ul" w="full" {...getRootProps()}>
      {accountsRender}
    </Box>
  )
}

export default Accounts
