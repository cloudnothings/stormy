import { useState } from "react"
import { api } from "../../utils/api"

const ClientForm = () => {
  const [name, setTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const { mutateAsync: createClient, isLoading } = api.client.createClient.useMutation({
    onSuccess: () => {
      setTitle('')
      setSlug('')
    }
  })
  const handleSubmit = async () => {
    await createClient({ name, slug })
  }
  return (
    <div className="container flex flex-col justify-center items-center bg-neutral-700 border rounded-xl border-black ">
      <h1 className="text-white font-medium">Create a Client</h1>
      <div className="grid grid-cols-2 gap-2 p-2">
        <div>
          <label></label>
          <input className="border-black border rounded-md bg-transparent text-white p-2"
            value={name}
            disabled={isLoading}
            autoComplete="no"
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Name'} />
        </div>
        <div>
          <label></label>
          <input className="border-black border rounded-md text-white bg-transparent p-2"
            value={slug}
            disabled={isLoading}
            autoComplete="no"
            onChange={(e) => setSlug(e.target.value)}
            placeholder={'Slug'} />
        </div>
        <button className="bg-white rounded-lg p-2 border border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
          disabled={isLoading}
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  )
}

export default ClientForm