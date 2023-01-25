import { Document } from "@prisma/client"
import Link from "next/link"


const RecentlyCreatedDocuments = ({ clientSlug, documents }: { clientSlug: string, documents: Document[] }) => {
  return (
    <div className="container flex flex-col items-start">
      <div className="flex flex-col">
        <span className="text-white font-semibold">
          Recently Created Items
        </span>
        <ul>
          {documents.map((document) => (
            <li key={document.id} className="child:text-neutral-400 child:hover:text-white ml-2">
              <Link href={`/clients/${clientSlug}/documents/${document.id}`}>
                {document.title} - created {document.createdAt.toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RecentlyCreatedDocuments