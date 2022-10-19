import { useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  Alert,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Input,
  InputRightElement,
  InputGroup,
  List,
  ListItem,
  AlertIcon,
} from '@chakra-ui/react'
import { Plus, Tags as TagsIcon } from 'tabler-icons-react'
import { DeleteIcon } from '@chakra-ui/icons'
import useAccounts, { setAccounts } from '@/stores/accounts'
import useTags, { createOrUpdateTag, deleteTagByValue } from '@/stores/tags'

const Tags: React.FC = () => {
  const [newTag, setNewTag] = useState('')
  const [error, setError] = useState('')
  const tags = useTags((state) => state.tags)
  const accounts = useAccounts((state) => state.accounts)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target.value || '').trim()
    if (value.length > 10) {
      setError(`Tag's value is too long`)
    } else if (error) {
      setError('')
    }
    setNewTag(value)
  }

  const handleAdd = async () => {
    if (!newTag.trim()) {
      return setError(`Tag's value is required`)
    }

    if (tags.find((item) => item === newTag.trim())) {
      return setError(`Tag has been exsited`)
    }

    await createOrUpdateTag('', newTag)
    setNewTag('')
  }

  const handleDelete = async (tag: string) => {
    setAccounts(
      accounts.map((item) => ({
        ...item,
        tags: item.tags?.filter((o) => o !== tag),
      }))
    )
    await deleteTagByValue(tag)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="tags" icon={<Icon as={TagsIcon} />} />
      </PopoverTrigger>
      <PopoverContent w={250}>
        <PopoverHeader fontWeight="bold">Manage tags</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {error && (
            <Alert mb="2" fontSize="xs" status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <InputGroup>
            <Input
              value={newTag}
              placeholder="Add tag"
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                aria-label="add-tags"
                colorScheme="green"
                icon={<Icon as={Plus} />}
                onClick={handleAdd}
              />
            </InputRightElement>
          </InputGroup>

          <List mt="2" spacing="2">
            {tags.map((tag) => (
              <ListItem key={tag}>
                <Flex>
                  <span>{tag}</span>
                  <Spacer />
                  <IconButton
                    size="xs"
                    colorScheme="red"
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    onClick={handleDelete.bind(null, tag)}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Tags
