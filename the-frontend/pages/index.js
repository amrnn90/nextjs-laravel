import Head from "next/head";
import axios from "../utils/axios";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { Router } from "next/router";
import { getServerSidePropsWrapper } from "../utils/getServerSidePropsWrapper";
import "twin.macro"

export default function Home() {
  return (
    <Layout>
      <div tw="bg-red-500">Home</div>
    </Layout>
  );
}

// export const getServerSideProps = getServerSidePropsWrapper(async ({ req }) => {
//   const { data: secrets } = await axios(req).get("/api/secrets");

//   return {
//     props: { secrets },
//   };

// });
