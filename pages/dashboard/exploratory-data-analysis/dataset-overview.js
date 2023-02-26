import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import DatasetOverviewMainSection from '/components/datasetOverview/DatasetOverviewMainSection';

const DatasetOverview = () => {
  return (
    <>
      <Head>
        <title>Dataset Overview | DataX</title>
      </Head>
      <DashboardLayout>
        <DatasetOverviewMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DatasetOverview;
