import { Button, HStack } from '@chakra-ui/react'
import { Download, Upload } from 'tabler-icons-react'
import useAccounts from '@/stores/accounts'
import { exportJson } from '@/utils/json'

const handleFormatJsonFile = (e: any) => {
  const file = e.target.files[0]
  if (!file) return
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    console.log(e.target?.result)
    try {
      const result = JSON.parse(e.target?.result as string)
      // console.log(result)
    } catch (e) {}
    console.log(JSON.parse(e.target?.result as string))
  }
  fileReader.readAsText(file, 'UTF-8')
}

const handleImportJsonFile = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'application/JSON')
  input.onchange = handleFormatJsonFile
  input.click()
  input.remove()
}

const Toolbar = () => {
  const accounts = useAccounts((state) => state.accounts)

  const handleExportJsonFile = () => {
    exportJson({ accounts }, 'Auth-Manager')
  }

  return (
    <HStack w="full" mb="8">
      <Button leftIcon={<Upload />} onClick={handleImportJsonFile}>
        Upload File
      </Button>

      <Button leftIcon={<Download />} onClick={handleExportJsonFile}>
        Download File
      </Button>
    </HStack>
  )
}

export default Toolbar
