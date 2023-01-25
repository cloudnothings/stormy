import { Document } from "@prisma/client"
import Link from "next/link"

const AllDocuments = ({ documents, clientSlug }: { documents: Document[], clientSlug: string }) => {
  return (
    <div className="container flex flex-col">
      <span className="text-white text-lg font-medium mb-4">All documents</span>
      <table className="min-w-full">
        <thead className="bg-neutral-900">
          <tr className="text-left text-sm font-semibold text-white child:px-3 child:py-2">
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody className="bg-neutral-700 divide-y divide-neutral-800 text-white px-2">
          {documents.map((document) => (
            <tr key={document.id} className="child:px-3 child:py-2">
              <td><Link href={`/clients/${clientSlug}/documents/${document.id}`}>{document.title}</Link></td>
              <td>{document.updatedAt.toLocaleDateString()}</td>
              <td>{document.createdAt.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default AllDocuments