import SearchBar from '../Search';
import { Nav, Img, ImgContainer, ButtonContainer  } from './styled';
import { IoMenu } from "react-icons/io5";

export default function Header() {
  return (
    <Nav>
      <ImgContainer>
        <Img src="https://www.projedata.com.br/wp-content/uploads/elementor/thumbs/logo-projedata-4-e1678804790690-q3urfqxh88c0hursuf2ra2lryx1l6tig5wh5coc3fq.png" alt="Logo" />
      </ImgContainer>
      <SearchBar />
      <ButtonContainer>
        <button><IoMenu /></button>
      </ButtonContainer>
    </Nav>
  );
}

