import './Main.css';
import Top from '../Top/Top';
import Footer from '../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <>
      <Top />
      <main className='main'>
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
