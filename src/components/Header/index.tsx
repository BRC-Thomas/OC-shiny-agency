import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors.js';
import DarkLogo from '../../assets/dark-logo.png';

interface StyledLinkProps {
  $isFullLink?: boolean;
}

const StyledLink = styled(Link)<StyledLinkProps>`
  padding: 15px;
  color: ${colors.secondary};
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`;

const HomeLogo = styled.img`
  height: 70px;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={DarkLogo} />
      </Link>
      <div>
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/freelances">Profils</StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </div>
    </NavContainer>
  );
}

export default Header;
