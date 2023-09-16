type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <h1>Ha</h1>
      {children}
    </>
  )
}

export default HomeLayout
