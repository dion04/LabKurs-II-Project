import AppLogo from '../../assets/AppLogo.png'

function Footer() {
  return (
    <footer className='footer grid-flow-row md:grid-flow-col md:grid-cols-4 p-10 bg-base-200 text-base-content mt-8'>
      <aside className='md:col-span-1 gap-6'>
        <img src={AppLogo} alt='App Logo' className='w-32' />
        <p>
          The People's Voice Ltd.
          <br />
          Providing reliable news since 2023
        </p>
      </aside>
      <nav className='md:col-span-1'>
        <header className='footer-title'>Services</header>
        <a className='link link-hover'>Breaking News</a>
        <a className='link link-hover'>Top Stories</a>
        <a className='link link-hover'>Popular</a>
        <a className='link link-hover'>Categories</a>
      </nav>
      <nav className='md:col-span-1'>
        <header className='footer-title'>Company</header>
        <a className='link link-hover'>About us</a>
        <a className='link link-hover'>Contact</a>
        <a className='link link-hover'>Jobs</a>
        <a className='link link-hover'>Press kit</a>
      </nav>
      <nav className='md:col-span-1'>
        <header className='footer-title'>Legal</header>
        <a className='link link-hover'>Terms of use</a>
        <a className='link link-hover'>Privacy policy</a>
        <a className='link link-hover'>Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer
