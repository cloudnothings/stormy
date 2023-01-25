import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Stormy</title>
        <meta name="description" content="Stormy Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-neutral-900">
        <Navbar sessionData={sessionData} />
        <div className="container">
          <div className="flex flex-col items-center">
            <span className="text-white text-3xl text-center">Welcome to the Stormy documentation system!</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
