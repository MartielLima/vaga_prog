import SearchBar from '../Search';
import ButtonCreate from '../Button/ButtonCreate';
import ButtonFilter from '../Button/ButtonFilter';
import { Nav, Img, ButtonImg, ButtonContainer } from './styled';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import RightMenu from '../Menu';
import RightMenuFilter from '../Menu/menuFilter';
import Relatorio from "../../components/Relatorios";

export default function Header({ setCreateId, fetchData }:
  {
    setCreateId: React.Dispatch<React.SetStateAction<boolean>>, fetchData: () => object
  }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [showRelatorio, setShowRelatorio] = useState(false);

  const toggleRelatorio = () => {
    setShowRelatorio(!showRelatorio)
    toggleMenu();
  };
  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleFilter = () => setOpenFilter(!openFilter);

  return (
    <>
      <Nav>
        <ButtonImg onClick={() => fetchData()}>
          <div>
            <Img src="https://www.projedata.com.br/wp-content/uploads/elementor/thumbs/logo-projedata-4-e1678804790690-q3urfqxh88c0hursuf2ra2lryx1l6tig5wh5coc3fq.png" alt="Logo" />
          </div>
        </ButtonImg>
        <SearchBar />
        <div className='buttonsContainer'>
          <ButtonCreate setCreateId={setCreateId} />
          <ButtonFilter onClick={toggleFilter} />
        </div>
        <ButtonContainer>
          <button onClick={toggleMenu}><IoMenu /></button>
        </ButtonContainer>
      </Nav>

      {openMenu && <RightMenu open={openMenu} toggleMenu={toggleMenu} toggleRelatorio={toggleRelatorio} />}
      {openFilter && <RightMenuFilter open={openFilter} toggleFilter={toggleFilter} />}
      {showRelatorio && <Relatorio open={showRelatorio} toggleOpen={toggleRelatorio} />}
    </>
  );
}

