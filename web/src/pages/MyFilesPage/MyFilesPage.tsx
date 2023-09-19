import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MyFilesPage = () => {
  return (
    <>
      <MetaTags title="MyFiles" description="MyFiles page" />

      <h1>MyFilesPage</h1>
      <p>
        Find me in <code>./web/src/pages/MyFilesPage/MyFilesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>myFiles</code>, link to me with `
        <Link to={routes.myFiles()}>MyFiles</Link>`
      </p>
    </>
  )
}

export default MyFilesPage
