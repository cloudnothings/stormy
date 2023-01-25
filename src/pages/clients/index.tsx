import { useSession } from "next-auth/react";
import Head from "next/head"
import Navbar from "../../components/Navbar";
import ClientTable from "../../features/Clients/ClientTable";


const ClientsPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Clients</title>
        <meta name="description" content="Clients Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-neutral-900">
        <Navbar sessionData={sessionData} />
        <ClientTable />
      </main>
    </>
  )
}

export default ClientsPage