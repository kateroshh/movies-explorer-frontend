import './Top.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function Top({ loggedIn }) {
  return (
    <div className='top'>
      <Header loggedIn={loggedIn} />
      <Promo />
    </div>
  );
}

export default Top;
