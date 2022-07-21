import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    revalidate: 60,
  };
};

const ids = [1, 2, 3, 'hoge'];

const IndexPage: NextPage = () => {
  const [text, setText] = useState('');
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
                setText(`${id} cache is revalidated`);
              }}
            />
          </div>
        );
      })}
      <textarea readOnly value={text} />
    </>
  );
};

export default IndexPage;
