import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/survey/1">Quiz</Link>
      <Link to="/freelances">Profils</Link>
    </nav>
  );
}

export default Header;
