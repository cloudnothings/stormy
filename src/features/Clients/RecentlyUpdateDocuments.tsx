import { Document } from "@prisma/client"
import Link from "next/link"


const RecentlyUpdatedDocuments = ({ clientSlug, documents }: { clientSlug: string, documents: Document[] }) => {
  return (
    <div className="container flex flex-col items-start">
      <div className="flex flex-col">
        <span className="text-white font-semibold">
          Recently Updated Items
        </span>
        <ul>
          {documents.map((document) => (
            <li key={document.id} className="child:text-neutral-400 child:hover:text-white ml-2">
              <Link href={`/clients/${clientSlug}/documents/${document.id}`}>
                {document.title} - updated {document.updatedAt.toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RecentlyUpdatedDocuments