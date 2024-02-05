import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const url = useLocation().pathname;
  const isFooterHidden =
    url === '/movies' || url === '/saved-movies' ? true : false;

  return (
    <>
      <Header />
      <Outlet />
      {isFooterHidden && <Footer />}
    </>
  );
}

export default Layout;
