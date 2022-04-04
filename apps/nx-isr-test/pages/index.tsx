import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    revalidate: 60,
  };
};

const ids = [1, 2, 3];

const IndexPage: NextPage = () => {
  return (
    <>
      {ids.map((id) => (
        <div key={id}>
          <Link href={`/${id}`}>{`Link to ${id}`}</Link>
        </div>
      ))}
      <hr />
      {ids.map((id) => {
        return (
          <div key={id}>
            <input
              type="button"
              value={`reset cache ${id}`}
              onClick={async () => {
                const response = await fetch(`/api/revalidate?id=${id}`, {
                  method: 'POST',
                });
                const text = await response.text();
                console.log(JSON.parse(text));
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default IndexPage;