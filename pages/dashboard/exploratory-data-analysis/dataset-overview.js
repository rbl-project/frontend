import React from 'react';
import Head from 'next/head'

import DashboardLayout from "/layouts/DashboardLayout";
import DatasetOverviewMainSection from '/components/datasetOverview/DatasetOverviewMainSection';

const DatasetOverview = () => {
  return (
    <>
      <Head>
        <title>Data Overview | DataX</title>
      </Head>
      <DashboardLayout>
        <DatasetOverviewMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DatasetOverview;
