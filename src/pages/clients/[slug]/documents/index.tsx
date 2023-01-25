import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navbar from "../../../../components/Navbar"
import AllDocuments from "../../../../features/Clients/AllDocuments"
import { api } from "../../../../utils/api"

const ClientPage = () => {
  const { data: sessionData } = useSession()
  const router = useRouter()
  const { slug } = router.query
  const { data: client, isLoading, isError } = api.client.getSlug.useQuery({
    slug: slug as string
  }, {
    enabled: !!slug
  })
  const { data: allDocuments, } = api.document.getRecentlyCreatedDocuments.useQuery({
    clientId: client?.id
  }, {
    initialData: []
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
          <h1 className="text-white font-medium text-3xl mb-4">{client.name}</h1>
          {allDocuments && (
            <AllDocuments clientSlug={client.slug} documents={allDocuments} />
          )}
        </div>
      )}
    </>
  )
}

export default ClientPage