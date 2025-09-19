/* eslint-disable no-irregular-whitespace */
import { FaRegListAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineCake } from "react-icons/hi2";
import { MdOutlinePayments } from "react-icons/md";

import { Container, Content, CardContainer } from './styled';

type Props = {
    open: boolean;
    toggleOpen: () => void;
}

// TODO Continuar a criação dos Relatorios
export default function Relatorio({ open, toggleOpen }: Props) {
    //TODO seguir adicionando as informações necessárias para gerar o relatório quando passar o mouse encima da div

    return (
        <Container open={open} onClick={toggleOpen} >
            <Content open={open} onClick={(e) => e.stopPropagation()}>
                <h1>Relatorios</h1>
                <div className="subContainer">
                    <CardContainer >
                        <FaRegListAlt />
                        <p>
                            Gerar uma lista de todos os colaboradores contendo seus dados.
                        </p>
                    </CardContainer>
                    <CardContainer >
                        <TbReportSearch />
                        <p>
                            Gerar uma lista de todos os colaboradores agrupados por cargo.
                        </p>
                    </CardContainer>
                    <CardContainer >
                        <HiOutlineCake />
                        <p>
                            Gerar uma lista contendo todos os colaboradores que fazem aniversario no mes selecionado.
                        </p>
                    </CardContainer>
                    <CardContainer >
                        <MdOutlinePayments />
                        <p>
                            Ver o investimento mensal em salario, para os colaboradores.
                        </p>
                    </CardContainer>
                </div>
            </Content>
        </Container>
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

