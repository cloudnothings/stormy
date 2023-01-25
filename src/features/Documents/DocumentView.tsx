import { Document as DocumentView } from '@prisma/client'
import { useState } from 'react'
import { api } from '../../utils/api'
const DocumentView = ({ document }: { document: DocumentView }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(document?.title)
  const [notes, setNotes] = useState(document?.notes)
  const [lastSaved, setLastSaved] = useState(document?.updatedAt)
  const cancelAction = () => {
    setEditMode(false)
    setTitle(document?.title)
    setNotes(document?.notes)
  }
  const { mutate: updateDocument, isLoading: changesPending } = api.document.updateDocument.useMutation({
    onSuccess: (data) => {
      setEditMode(false)
      setTitle(data.title)
      setNotes(data.notes)
      setLastSaved(data.updatedAt)
    }
  })
  const saveHandler = () => {
    updateDocument({ id: document.id, title, notes })
  }
  if (!editMode) {
    return (
      <div className='flex flex-col max-w-lg'>
        <div className="border border-neutral-700 rounded-lg p-4 flex flex-col">
          <span className="text-white font-medium mb-4 text-xl">{title} - last edited {lastSaved.toLocaleDateString()}</span>
          <body className="text-white  mb-4">{notes}</body>
          <div className="flex flex-row justify-end">
            <button className="bg-white rounded-lg w-32 p-2 border hover:border-white border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
              onClick={() => setEditMode(!editMode)}
            >Edit document</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='flex flex-col max-w-lg'>
        <div className="border border-neutral-700 rounded-lg p-4 flex flex-col">
          <input className="text-white bg-transparent font-medium mb-4 text-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={changesPending}
          ></input>
          <textarea className="text-white bg-transparent mb-4"
            value={notes}
            cols={94}
            onChange={(e) => setNotes(e.target.value)}
            disabled={changesPending}
          ></textarea>
          <div className="flex flex-row justify-end gap-2">
            <button className="bg-white rounded-lg w-32 p-2 border hover:border-white border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
              onClick={saveHandler}
              disabled={changesPending}
            >Save</button>
            <button className="bg-white rounded-lg w-32 p-2 border hover:border-white border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
              onClick={cancelAction}
              disabled={changesPending}
            >Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentView