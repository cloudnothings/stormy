import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Navbar from "../../../components/Navbar"
import RecentlyCreatedDocuments from "../../../features/Clients/RecentlyCreatedDocument"
import RecentlyUpdatedDocuments from "../../../features/Clients/RecentlyUpdateDocuments"
import DocumentForm from "../../../features/DocumentForm"
import { api } from "../../../utils/api"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import AllDocuments from "../../../features/Clients/AllDocuments"

const ClientPage = () => {
  const { data: sessionData } = useSession()
  const [animationParent] = useAutoAnimate()
  const router = useRouter()
  const { slug } = router.query
  const { data: client, isLoading, isError } = api.client.getSlug.useQuery({
    slug: slug as string
  }, {
    enabled: !!slug
  })
  const { data: recentlyCreatedDocuments, refetch: refetchCreatedDocs } = api.document.getRecentlyCreatedDocuments.useQuery({
    clientId: client?.id
  }, {
    initialData: []
  })
  const { data: recentlyUpdatedDocuments, refetch: refetchUpdatedDocs } = api.document.getRecentlyUpdatedDocuments.useQuery({
    clientId: client?.id
  }, {
    initialData: []
  })
  const { data: allDocuments, } = api.document.getRecentlyCreatedDocuments.useQuery({
    clientId: client?.id
  }, {
    initialData: []
  })
  const [showCreateDocument, setShowCreateDocument] = useState(false)
  const refetchCallback = async () => {
    await refetchCreatedDocs()
    await refetchUpdatedDocs()
  }
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
          {/* @ts-expect-error - Autoanimate bad */}
          <div className="container flex flex-col items-center p-4 gap-2" ref={animationParent}>
            <h1 className="text-white font-medium text-3xl mb-4">{client.name}</h1>
            <div className="self-end">
              <button className="bg-white rounded-lg w-48 p-2 border hover:border-white border-black hover:bg-black hover:text-white ease-in-out duration-300 active:text-black active:bg-white"
                onClick={() => setShowCreateDocument(!showCreateDocument)}
              >{showCreateDocument ? 'Cancel' : 'Create a document'}</button>
            </div>
            {showCreateDocument && (
              <DocumentForm clientId={client.id} refetchCallback={refetchCallback} />)}
            {recentlyCreatedDocuments && (
              <RecentlyCreatedDocuments documents={recentlyCreatedDocuments} />
            )}
            {recentlyUpdatedDocuments && (
              <RecentlyUpdatedDocuments documents={recentlyUpdatedDocuments} />
            )}
            {allDocuments && (
              <AllDocuments clientSlug={client.slug} documents={allDocuments} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ClientPage