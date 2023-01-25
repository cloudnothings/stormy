import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navbar from "../../../../components/Navbar"
import DocumentView from "../../../../features/Documents/DocumentView"
import { api } from "../../../../utils/api"

const DocumentPage = () => {
  const { data: sessionData } = useSession()
  const router = useRouter()
  const { slug, id } = router.query
  const { data: document, isLoading, isError } = api.document.getDocument.useQuery({
    id: id as string
  }, {
    enabled: !!id
  })
  const { data: client } = api.client.getSlug.useQuery({
    slug: slug as string
  }, {
    enabled: !!slug
  })
  if (isError) {
    return <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <h1 className="text-white font-medium">Client does not exist.</h1>
    </div>
  }
  return (
    <>
      {isLoading ? (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
          <h1 className="text-white font-medium">Loading...</h1>
        </div>
      ) : (
        <div className="min-h-screen bg-black flex flex-col items-center">
          <Navbar sessionData={sessionData} />
          <h1 className="text-white font-medium text-3xl mb-4">{client?.name}</h1>
          <DocumentView document={document} />
        </div>
      )}
    </>
  )
}

export default DocumentPage