import { GetStaticPaths, GetStaticProps } from 'next';

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
}

export const getStaticProps: GetStaticProps<
  IsrPageProps,
  { id: string }
> = async ({ params }) => {
  const id = Number(params?.id) ?? '';
  return {
    props: {
      title: `ページタイトル${id}`,
    },
    revalidate: 60 * 60 * 1, // 1時間
  };
};

const IsrPage: React.VFC<IsrPageProps> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{new Date().toString()}</p>
    </>
  );
};

export default IsrPage;
