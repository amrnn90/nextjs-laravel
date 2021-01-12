import 'twin.macro'
import { useQuery } from "react-query";
import Layout from "../components/Layout";
import WithAuth from "../components/WithAuth";
import WithVerify from "../components/WithVerify";
import api from "../utils/api";

export default function Home({ secrets }) {
  const secretsQuery = useQuery("secrets", api.secrets);

  return (
    <WithVerify>
      <Layout>
        <div>
          {secretsQuery.data && (
            <pre>{JSON.stringify(secretsQuery.data, null, 2)}</pre>
          )}
        </div>
      </Layout>
    </WithVerify>
  );
}

// export const getServerSideProps = getServerSidePropsWrapper(async ({ req }) => {
//   const { data: secrets } = await axios(req).get("/api/secrets");

//   return {
//     props: { secrets },
//   };

// });
