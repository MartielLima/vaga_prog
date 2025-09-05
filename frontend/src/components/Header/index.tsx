import SearchBar from '../Search';
import ButtonCreate from '../Button/ButtonCreate';
import { Nav, Img, ButtonImg, ButtonContainer } from './styled';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import RightMenu from '../Menu';

export default function Header({ setCreateId, fetchData }: { setCreateId: React.Dispatch<React.SetStateAction<boolean>>, fetchData: () => object }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      <Nav>
        <ButtonImg onClick={() => fetchData()}>
          <div>
            <Img src="https://www.projedata.com.br/wp-content/uploads/elementor/thumbs/logo-projedata-4-e1678804790690-q3urfqxh88c0hursuf2ra2lryx1l6tig5wh5coc3fq.png" alt="Logo" />
          </div>
        </ButtonImg>
        <SearchBar />
        <ButtonCreate setCreateId={setCreateId} />
        <ButtonContainer>
          <button onClick={toggleMenu}><IoMenu /></button>
        </ButtonContainer>
      </Nav>

      {open && <RightMenu open={open} toggleMenu={toggleMenu} />}
    </>
  );
}

