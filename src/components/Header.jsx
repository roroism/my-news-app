import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { HiddenH1, HiddenH2 } from "./MainPage";

const ButtonDiv = styled.div`
  padding: 1rem 0;
  a {
    button {
      cursor: pointer;
      width: 120px;
      &:hover {
        background-color: #666;
        color: #fff;
        border: 1px solid #666;
      }
      color: #666;
      background-color: #fff;
      border: 1px solid #666;
      transition: all 0.3s;
      padding: 10px 0;
    }
  }
`;

const HeaderDiv = styled.header`
  width: 80%;
  margin: 0 auto;
  padding: 0 4%;
`;

const Header = ({ match }) => {
  const { pathname } = useLocation();

  return (
    <HeaderDiv>
      <HiddenH1>Searching News App</HiddenH1>
      <nav>
        <HiddenH2>Navigation Area</HiddenH2>
        <ButtonDiv>
          {pathname === "/" ? (
            <Link to="/clip">
              <button type="button">Clipped News</button>
            </Link>
          ) : pathname === "/clip" ? (
            <Link to="/">
              <button type="button">Search News</button>
            </Link>
          ) : null}
        </ButtonDiv>
      </nav>
    </HeaderDiv>
  );
};

export default Header;
