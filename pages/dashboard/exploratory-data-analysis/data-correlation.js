import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import DataCorrelationMainSection from '/components/dataCorrelation/DataCorrelationMainSection';

const DatasetOverview = () => {
  return (
    <>
      <Head>
        <title>Data Correlation | DataX</title>
      </Head>
      <DashboardLayout>
        <DataCorrelationMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DatasetOverview;
