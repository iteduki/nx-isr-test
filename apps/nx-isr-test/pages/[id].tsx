import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths<{
  id: string;
}> = async (context) => {
  const paths = [1, 2, 3].map((id) => {
    return { params: { id: String(id) } };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IsrPageProps {
  title: string;
  content: string;
}

export const getStaticProps: GetStaticProps<
  IsrPageProps,
  { id: string }
> = async ({ params }) => {
  const id = Number(params?.id) ?? '';
  return {
    props: {
      title: `ページタイトル${id}`,
      content: new Date().toString(),
    },
    revalidate: 60 // 1分
  };
};

const IsrPage: React.VFC<IsrPageProps> = ({ title, content }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <p>{content}</p>
    </>
  );
};

export default IsrPage;
