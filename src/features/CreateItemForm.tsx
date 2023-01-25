import { Client } from "@prisma/client"
import { useState } from "react"
import SelectClient from "../components/SelectClient"
import { api } from "../utils/api"


const CreateItemForm = () => {
  const [title, setTitle] = useState<string>('')
  const [client, setClient] = useState<Client | null>(null)
  const [notes, setNotes] = useState<string>('')
  const { mutate: createItem, isLoading } = api.document.createDocument.useMutation(
    {
      onSuccess: () => {
        setTitle('')
        setClient(null)
        setNotes('')
      }
    }
  )
  const handleSubmit = () => {
    if (client) {
      createItem({
        title,
        clientId: client.id,
        notes,
      })
    }
  }
  return (
    <div className="container border border-black rounded-lg p-2 flex flex-col justify-center items-center bg-neutral-700 ">
      <h1 className="text-white font-medium">Create an Item</h1>
      <div className="grid grid-cols-2 gap-2 p-2 text-white">
        <div className="">
          <label className="block text-white">Client</label>
          <SelectClient selected={client} setSelected={setClient} />
        </div>
        <div>
          <label className="block text-white ">Title</label>
          <input className="border-black border rounded-md bg-transparent p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Title'} />
        </div>
        <div>
          <label className="block text-white ">Note</label>
          <input className="border-black border rounded-md bg-transparent p-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={'Note'} />
        </div>
        <div>
          <label className="block text-white">Submit</label>
          <button className="bg-white rounded-lg p-2 border text-black border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
            disabled={isLoading}
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateItemForm