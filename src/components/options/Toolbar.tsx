import { HStack, Icon, IconButton, Tooltip } from '@chakra-ui/react'
import { FileExport, FileImport } from 'tabler-icons-react'

const Toolbar = () => {
  return (
    <HStack w="full">
      <Tooltip label="Import json file">
        <IconButton aria-label="import-json" icon={<Icon as={FileImport} />} />
      </Tooltip>

      <Tooltip label="Export json file">
        <IconButton aria-label="export-json" icon={<Icon as={FileExport} />} />
      </Tooltip>
    </HStack>
  )
}

export default Toolbar
