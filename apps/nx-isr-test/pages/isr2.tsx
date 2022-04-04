import { GetStaticProps } from 'next';

interface IsrPageProps {
  title: string;
}

export const getStaticProps: GetStaticProps<IsrPageProps> = async () => {
  return {
    props: {
      title: 'ISR2',
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
