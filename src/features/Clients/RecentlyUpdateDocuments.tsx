import { Popover } from "@headlessui/react"
import { Document } from "@prisma/client"
import DocumentView from "../Documents/DocumentView"

const RecentlyUpdatedDocuments = ({ documents }: { documents: Document[] }) => {
  return (
    <div className="container flex flex-col items-start">
      <span className="text-white font-semibold">
        Recently Created Items
      </span>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <Popover >
              <Popover.Button className="text-neutral-400 hover:text-white ml-2">{document.title} - created {document.updatedAt.toLocaleString()}</Popover.Button>
              <Popover.Panel>
                <DocumentView document={document} />
              </Popover.Panel>
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentlyUpdatedDocuments