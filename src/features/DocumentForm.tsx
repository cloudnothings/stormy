import { useState } from "react"
import { api } from "../utils/api"

const DocumentForm = ({ clientId, refetchCallback }: { clientId: string, refetchCallback: () => void }) => {
  const [title, setTitle] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const { mutateAsync: createItem, isLoading } = api.document.createDocument.useMutation(
    {
      onSuccess: () => {
        setTitle('')
        setNotes('')
        refetchCallback()
      }
    }
  )
  const handleSubmit = async () => {
    await createItem({
      title,
      clientId,
      notes,
    })
  }
  const handleCancel = () => {
    setTitle('')
    setNotes('')
  }

  return (
    <div className="container border border-black rounded-lg p-2 flex flex-col justify-center items-center bg-neutral-800">
      <h1 className="text-white font-medium">Create a Document</h1>
      <div className="flex flex-col items-start gap-2 p-2 w-full text-white">
        <label className="block text-white">Title</label>
        <input className="border-black border w-full rounded-md bg-transparent p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={'Title'} />
        <label className="block text-white ">Notes</label>
        <textarea className="border-black border w-full rounded-md bg-transparent p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={'Notes'} />
        <div className="flex flex-row self-end gap-2 child:w-24">
          <button className="bg-white rounded-lg p-2 border text-black border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
            disabled={isLoading}
            onClick={handleCancel}
          >Clear</button>
          <button className="bg-white rounded-lg p-2 border text-black border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
            disabled={isLoading}
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentForm