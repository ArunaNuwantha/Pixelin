import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import SideBar from "./SideBar";

export default function Layout({ children }) {

  return (
    <div className="h-screen w-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pixelin</title>
        {/* <Link href={"https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&display=swap"} type="stylesheet"></Link> */}
      </Head>
      <div className="flex">
        <div className={`h-screen max-w-sm`}>
          <SideBar />
        </div>
        <div className="bg-primary-1 w-screen h-screen overflow-auto overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
