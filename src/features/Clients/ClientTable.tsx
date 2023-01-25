import Link from "next/link"
import { api } from "../../utils/api"

const ClientTable = () => {
  const { data: clients, isLoading } = api.client.getClients.useQuery()
  return (
    <div className="container flex flex-col justify-center items-center gap-2 p-4">
      <h1 className="text-white font-medium text-3xl">Clients</h1>
      <div className="flex flex-col justify-center items-center overflow-hidden border w-full border-gray-700 rounded-lg sm:mx md:mx-2">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm font-semibold text-white child:px-3 child:py-2">
              <th>Name</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-700 divide-y divide-neutral-800 text-white px-2">
            {isLoading ? (
              <tr>

              </tr>
            ) : (
              clients?.map((client) => (
                <tr key={client.id} className="child:px-3 child:py-2">
                  <td><Link href={`/clients/${client.slug}`}>{client.name}</Link></td>
                  <td>{client.slug}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientTable