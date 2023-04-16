import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import DataTransformationMainSection from '/components/dataTransformation/DataTransformationMainSection';

const DataTransformation = () => {
  return (
    <>
      <Head>
        <title>Data Transformation | DataTreat</title>
      </Head>
      <DashboardLayout>
        <DataTransformationMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DataTransformation;
