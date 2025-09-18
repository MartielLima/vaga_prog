import OutsideClick from '../../hooks/OutsideClick';
import { Container, Sidebar } from './styled';
import { FaRegListAlt, FaBirthdayCake, FaMoneyBillWave } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";

type Props = {
    open: boolean;
    toggleOpen: () => void;
}
// TODO Continuar a criação dos Relatorios
export default function Relatorio({ open, toggleOpen }: Props) {
    const ref = OutsideClick(toggleOpen);

    return (
        <>
            <Container ref={ref}>
                <Sidebar open={open}>
                    {/* todos os funcionarios */} <FaRegListAlt />
                    {/* Relatorio por Função */} <TbReportSearch />
                    {/* Funcionarios que fazem aniversario */} <FaBirthdayCake />
                    {/* Salarios */} <FaMoneyBillWave />
                </Sidebar>
            </Container>
        </>
    );
};

/*
    Listando todos os funcionários:
    Maria - Operador - R$ 2.009,44 - 18/10/2000
    João - Operador - R$ 2.284,38 - 12/05/1990
    Caio - Coordenador - R$ 9.836,14 - 02/05/1961
    Miguel - Diretor - R$ 19.119,88 - 14/10/1988
    Alice - Recepcionista - R$ 1.582,72 - 05/01/1995
    Heitor - Operador - R$ 1.582,72 - 19/11/1999
    Arthur - Contador - R$ 4.071,84 - 31/03/1993
    Laura - Gerente - R$ 3.017,45 - 08/07/1994
    Heloisa - Eletricista - R$ 1.606,85 - 24/05/2003
    Helena - Gerente - R$ 2.799,93 - 02/09/1996
    Total de funcionários: 10


    Listando todos os funcionários apos remover o João:
    Maria - Operador - R$ 2.009,44 - 18/10/2000
    Caio - Coordenador - R$ 9.836,14 - 02/05/1961
    Miguel - Diretor - R$ 19.119,88 - 14/10/1988
    Alice - Recepcionista - R$ 1.582,72 - 05/01/1995
    Heitor - Operador - R$ 1.582,72 - 19/11/1999
    Arthur - Contador - R$ 4.071,84 - 31/03/1993
    Laura - Gerente - R$ 3.017,45 - 08/07/1994
    Heloisa - Eletricista - R$ 1.606,85 - 24/05/2003
    Helena - Gerente - R$ 2.799,93 - 02/09/1996
    Total de funcionários: 9


    Todos os funcionários foram atualizados com sucesso.
    Maria - Operador - R$ 2.210,38 - 18/10/2000
    Caio - Coordenador - R$ 10.819,75 - 02/05/1961
    Miguel - Diretor - R$ 21.031,87 - 14/10/1988
    Alice - Recepcionista - R$ 1.740,99 - 05/01/1995
    Heitor - Operador - R$ 1.740,99 - 19/11/1999
    Arthur - Contador - R$ 4.479,02 - 31/03/1993
    Laura - Gerente - R$ 3.319,19 - 08/07/1994
    Heloisa - Eletricista - R$ 1.767,53 - 24/05/2003
    Helena - Gerente - R$ 3.079,92 - 02/09/1996
    Total de funcionários: 9


    Funcionários agrupados por função:
    Função: Operador
    - Maria
    - Heitor
    Função: Eletricista
    - Heloisa
    Função: Recepcionista
    - Alice
    Função: Diretor
    - Miguel
    Função: Gerente
    - Laura
    - Helena
    Função: Coordenador
    - Caio
    Função: Contador
    - Arthur



    Funcionários que fazem aniversário no mês 10:
    - Maria
    - Miguel



    Nenhum funcionário faz aniversário no mês 12.



    Funcionário mais velho:
    - Nome: Heloisa
    - Data de Nascimento: 2003-05-24



    Funcionários em ordem alfabética:
    - Alice
    - Arthur
    - Caio
    - Heitor
    - Helena
    - Heloisa
    - Laura
    - Maria
    - Miguel



    Total de salários: R$ 50.189,67



    Maria - Operador - 1.82 - 18/10/2000
    Caio - Coordenador - 8.93 - 02/05/1961
    Miguel - Diretor - 17.35 - 14/10/1988
    Alice - Recepcionista - 1.44 - 05/01/1995
    Heitor - Operador - 1.44 - 19/11/1999
    Arthur - Contador - 3.70 - 31/03/1993
    Laura - Gerente - 2.74 - 08/07/1994
    Heloisa - Eletricista - 1.46 - 24/05/2003
    Helena - Gerente - 2.54 - 02/09/1996
*/

