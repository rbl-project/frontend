import React from 'react';
import Head from 'next/head'

import DashboardLayout from "/layouts/DashboardLayout";
import GraphsMainSection from "/components/graphs/GraphsMainSection";

const Graphs = () => {
  return (
    <>
      <Head>
        <title>Graphs | DataX</title>
      </Head>
      <DashboardLayout>
        <GraphsMainSection />
      </DashboardLayout>
    </>
  )
}

export default Graphs;
