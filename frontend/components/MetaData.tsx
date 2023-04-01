import Head from "next/head";
import React from "react";

function MetaData() {
  return (
    <Head>
      <title>Peregrine</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* @ts-ignore */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@600&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

export default MetaData;
