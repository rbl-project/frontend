import React from 'react';
import Head from 'next/head'

import DashboardLayout from "/layouts/DashboardLayout";
import GraphicalRepresentationMainSection from "/components/graphicalRepresentation/GraphicalRepresentationMainSection";

const GraphicalRepresentation = () => {
  return (
    <>
      <Head>
        <title> Graphical Representation | DataX </title>
      </Head>
      <DashboardLayout>
        <GraphicalRepresentationMainSection />
      </DashboardLayout>
    </>
  )
}

export default GraphicalRepresentation;
