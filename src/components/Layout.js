import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({children}) => (
  <>
    <Head>
      <title>Data App</title>
    </Head>
    <Navbar/>
    {children}
  </>
);