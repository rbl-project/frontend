import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import TabularRepresentationMainSection from '/components/tabularRepresentation/TabularRepresentationMainSection';

const DatasetOverview = () => {
  return (
    <>
      <Head>
        <title>Tabular Representation | DataX</title>
      </Head>
      <DashboardLayout>
        <TabularRepresentationMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DatasetOverview;
