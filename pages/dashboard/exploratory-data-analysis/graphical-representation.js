import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import GraphicalRepresentationMainSection from "/components/graphicalRepresentation/GraphicalRepresentationMainSection";

const GraphicalRepresentation = () => {
  return (
    <>
      <Head>
        <title> Graphical Representation | DataTreat </title>
      </Head>
      <DashboardLayout>
        <GraphicalRepresentationMainSection />
      </DashboardLayout>
    </>
  )
}

export default GraphicalRepresentation;
