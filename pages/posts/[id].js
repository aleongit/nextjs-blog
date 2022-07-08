import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"

//getStaticPaths which returns an array of possible values of id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

//getStaticProps which fetches necessary data for the post with id
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  }
}

//react component to render this page
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* Replace {postData.date} with this */}
          <Date dateString={postData.date} />
        </div>
        {postData.links && (
          <ul className={utilStyles.list}>
            {postData.links.map((link, index) => (
              <li key={index}>
                <a href={link}>{link}</a>
              </li>
            ))}
          </ul>
        )}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
