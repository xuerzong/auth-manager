import { Box, useRadio, useRadioGroup } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import useAccounts from '@/stores/accounts'
import { emptyAccount } from '@/constants/account'
import Account from '../common/Account'

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
  const accounts = useAccounts((state) => state.accounts)

  console.log(accounts)

  const handleChange = (nextValue: string) => {
    // todo
    console.log(nextValue)
    window.close()
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'accounts',
    defaultValue: (accounts[0] || emptyAccount).key,
    onChange: handleChange,
  })

  const accountsRender = accounts.map((item) => {
    return (
      <AccountRadioCard key={item.key} {...getRadioProps({ value: item.key })}>
        <Account accountKey={item.key} {...item} />
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
