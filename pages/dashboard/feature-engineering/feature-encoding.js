import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import FeatureEncodingMainSection from '/components/featureEncoding/FeatureEncodingMainSection';

const FeatureEncoding = () => {
  return (
    <>
      <Head>
        <title>Feature Encoding | DataTreat</title>
      </Head>
      <DashboardLayout>
        <FeatureEncodingMainSection/>
      </DashboardLayout>
    </>
  )
}

export default FeatureEncoding;
