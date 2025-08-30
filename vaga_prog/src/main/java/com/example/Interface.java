package com.example;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.stream.Collectors;

import com.example.dados.Funcionario_data;



public class Interface {
    public static void start(Funcionario_data data ) throws InterruptedException {
        Cor.clean();
        System.out.println(Cor.verde("Bem-vindo a minha tentativa de realizar o desafio proposto!"));
        Thread.sleep(2000);
        Cor.clean();

        Scanner scan = new Scanner(System.in);

        String opcao = "0";

        while (!opcao.equals("1") && !opcao.equals("2")) {
            System.out.printf("Caso prefira a demostração solicitada no teste selecione: %s %n", Cor.ciano("1"));
            System.out.printf("Caso queria realizar interações: %s %n", Cor.verde("2"));
            if (scan.hasNextLine()) {
                opcao = scan.nextLine();
            } else {
                opcao = "";
            }

            if (opcao.equals("1")) {
                Cor.clean();
                seguir(data);
            } else if (opcao.equals("2")) {
                Cor.clean();
                interagir(data);
            } else {
                System.out.println(Cor.vermelho("Opção inválida. Tente novamente."));
            }

            scan.close();
        }
    }

    public static void seguir(Funcionario_data data){
        if (data == null) {
            System.out.println(Cor.vermelho("Dados de funcionário não disponíveis."));
            return;
        }

        try {
            System.out.println(Cor.verde("Listando todos os funcionários:"));

            listarFuncionarios(data);

            Funcionario joao = data.get_funcionario("João");
            if (joao != null) {
                data.remover(joao);
                System.out.println(Cor.verde("Listando todos os funcionários apos remover o João:"));
            } else {
                System.out.println(Cor.vermelho("Funcionário João não encontrado."));
            }

            listarFuncionarios(data);

            aumentar_salario(data, new BigDecimal("10"), null);

            listarFuncionarios(data);

            agrupar_por_funcao(data);

            aniversariantes_do_mes(data, 10);
            aniversariantes_do_mes(data, 12);

            funcionario_mais_velho(data);

            funcionarios_em_ordem_alfabetica(data);

            total_de_salario(data);

            salario_minimo_por_funcionario(data, 1212.00);

            data.fechar();
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao acessar os dados: " + e.getMessage()));
        }
    }

    public static void interagir(Funcionario_data data) throws InterruptedException {
        while (true) {
            Cor.clean();
            Scanner scan = new Scanner(System.in);

            String opcao = "0";

            while (!opcao.equals("1") && !opcao.equals("2") && !opcao.equals("3") &&
                     !opcao.equals("4") && !opcao.equals("5") && !opcao.equals("6") && 
                        !opcao.equalsIgnoreCase("sair")) {
                System.out.println(Cor.verde("Bem-vindo ao Menu!\n"));
                System.out.println(Cor.azul("Escolha uma das opções abaixo:"));

                System.out.printf(Cor.ciano("1") + ": para " + Cor.ciano("listar\n"));
                System.out.printf(Cor.verde("2") + ": para " + Cor.verde("registrar\n"));
                System.out.printf(Cor.vermelho("3") + ": para " + Cor.vermelho("remover\n"));
                System.out.printf(Cor.roxo("4") + ": para  " + Cor.roxo("atualizar\n"));
                System.out.printf(Cor.azul("5") + ": para " + Cor.azul("ver os aniversariantes do mes\n"));
                System.out.printf(Cor.cinza("6") + ": para " + Cor.cinza("ver os funcionarios por cargo\n"));
                System.out.println("Caso prefira sair da aplicação, digite 'sair'.");

                if (scan.hasNextLine()) {
                    opcao = scan.nextLine();
                } else {
                    opcao = "";
                }
            }

            if (opcao.equals("1")) {
                listarFuncionarios(data);
                pausa();
            } else if (opcao.equals("2")) {
                registrarFuncionarios(data);
                pausa();
            } else if (opcao.equals("3")) {
                removerFuncionarios(data);
                pausa();
            } else if (opcao.equals("4")) {
                listarFuncionarios(data);
                atualizarFuncionarios(data);
                pausa();
            } else if (opcao.equals("5")) {
                Scanner scan_aniv = new Scanner(System.in);
                System.out.println("Digite o mes para ver os aniversariantes:");
                String mes = "";
                if (scan_aniv.hasNextLine()) {
                    mes = scan_aniv.nextLine();
                }
                aniversariantes_do_mes(data, Integer.parseInt(mes));
                pausa();
            } else if (opcao.equals("6")) {
                agrupar_por_funcao(data);
                pausa();
            } else if (opcao.equals("sair")) {
                System.out.println("Saindo da aplicação...");
                System.exit(0);
            }
        }

    }

    private static void listarFuncionarios(Funcionario_data data) {
        try {
            List<Funcionario> lista = data.listar_todos();
            NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
            for (Funcionario f : lista) {

                System.out.println(f.get_Nome() + " - " + f.get_Funcao() + " - " + format.format(f.get_Salario()) + " - " + f.get_DataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários: " + e.getMessage()));
        }
    }

    private static void atualizarFuncionarios(Funcionario_data data) {
        try {
            Scanner scan_atualizar = new Scanner(System.in);

            String nome = "";
            System.out.println("Quem deseja atualizar?");
            if (scan_atualizar.hasNextLine()) {
                nome = scan_atualizar.nextLine();
            }

            Funcionario funcionario = data.get_funcionario(nome);
            if (funcionario != null) {
                System.out.println("Digite o novo salario do funcionário:");
                
                BigDecimal novoSalario = new BigDecimal(scan_atualizar.nextLine());
                System.out.println("Digite a nova função do funcionário:");
                String novaFuncao = scan_atualizar.nextLine();

                funcionario.set_Salario(novoSalario);
                funcionario.set_Funcao(novaFuncao);

                data.atualizar(funcionario);
                System.out.println("Funcionário atualizado com sucesso.");
            } else {
                System.out.println("Funcionário não encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao atualizar funcionário: " + e.getMessage()));
        }
    }

    private static void registrarFuncionarios(Funcionario_data data) {
        try {
            Scanner scan = new Scanner(System.in);
            System.out.println("Digite o nome do funcionario:");
            String nome = scan.nextLine();
            System.out.println("Digite a data de nascimento do funcionário (YYYY-MM-DD):");
            LocalDate dataNascimento = LocalDate.parse(scan.nextLine());
            System.out.println("Digite o salario do funcionário:");
            BigDecimal salario = new BigDecimal(scan.nextLine());
            System.out.println("Digite a função do funcionário:");
            String funcao = scan.nextLine();

            Funcionario novoFuncionario = new Funcionario();
            novoFuncionario.set_Nome(nome);
            novoFuncionario.set_DataNascimento(dataNascimento);
            novoFuncionario.set_Salario(salario);
            novoFuncionario.set_Funcao(funcao);

            data.inserir(novoFuncionario);
            System.out.println("Funcionário registrado com sucesso.");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao registrar funcionário: " + e.getMessage()));
        }
    }

    private static void removerFuncionarios(Funcionario_data data) {
        try {
            Scanner scan = new Scanner(System.in);
            System.out.println("Digite o nome do funcionário a ser removido:");
            String nome = scan.nextLine();

            Funcionario funcionario = data.get_funcionario(nome);
            if (funcionario != null) {
                data.remover(funcionario);
                System.out.println("Funcionário removido com sucesso.");
            } else {
                System.out.println("Funcionário não encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao remover funcionário: " + e.getMessage()));
        }
    }

    private static void aumentar_salario(Funcionario_data data, BigDecimal percentual , Funcionario funcionario) {
        if (funcionario != null) {
            BigDecimal aumento = funcionario.get_Salario().multiply(percentual).divide(new BigDecimal("100"));
            BigDecimal novoSalario = funcionario.get_Salario().add(aumento);
            funcionario.set_Salario(novoSalario);
            try {
                data.atualizar(funcionario);
                System.out.println("Salário aumentado com sucesso.");
            } catch (SQLException e) {
                System.out.println(Cor.vermelho("Erro ao atualizar salário: " + e.getMessage()));
            }
        }

        try {
            List<Funcionario> funcionarios = data.get_funcionarios();
            for (Funcionario f : funcionarios) {
                BigDecimal aumento = f.get_Salario().multiply(percentual).divide(new BigDecimal("100"));
                BigDecimal novoSalario = f.get_Salario().add(aumento);
                f.set_Salario(novoSalario);
                data.atualizar(f);
            }

            System.out.println("Todos os funcionários foram atualizados com sucesso.");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao aumentar salário: " + e.getMessage()));
        }
    }

    private static void agrupar_por_funcao(Funcionario_data data) {
        try {
            Map<String, List<Funcionario>> funcionariosPorFuncao = data.get_funcionarios().stream()
                    .collect(Collectors.groupingBy(Funcionario::get_Funcao));

            for (Map.Entry<String, List<Funcionario>> entry : funcionariosPorFuncao.entrySet()) {
                System.out.println("Função: " + entry.getKey());
                for (Funcionario f : entry.getValue()) {
                    System.out.println(" - " + f.get_Nome());
                }
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao agrupar funcionários por função: " + e.getMessage()));
        }
    }

    private static void aniversariantes_do_mes(Funcionario_data data, Integer mes_niv) {
        List<Funcionario> aniversariantes;
        int mes;

        if (mes_niv != null && mes_niv >= 1 && mes_niv <= 12) {
            mes = mes_niv;
        } else {
            mes = LocalDate.now().getMonthValue();
        }

        try {
            aniversariantes = data.get_funcionarios().stream()
                    .filter(f -> f.get_DataNascimento().getMonthValue() == mes)
                    .collect(Collectors.toList());

            if (aniversariantes.isEmpty()) {
                System.out.println("Nenhum funcionário faz aniversário no mês " + mes + ".");
            } else {
                System.out.println("Funcionários que fazem aniversário no mês " + mes + ":");
                for (Funcionario f : aniversariantes) {
                    System.out.println(" - " + f.get_Nome());
                }
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar aniversariantes do mês: " + e.getMessage()));
        }
    }

    private static void funcionario_mais_velho(Funcionario_data data) {
        try {
            Optional<Funcionario> funcionarioMaisVelho = data.get_funcionarios().stream()
                    .max(Comparator.comparing(Funcionario::get_DataNascimento));

            if (funcionarioMaisVelho.isPresent()) {
                System.out.println("Funcionário mais velho:");
                System.out.println(" - Nome: " + funcionarioMaisVelho.get().get_Nome());
                System.out.println(" - Data de Nascimento: " + funcionarioMaisVelho.get().get_DataNascimento());
            } else {
                System.out.println("Nenhum funcionário encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionário mais velho: " + e.getMessage()));
        }
    }

    private static void funcionarios_em_ordem_alfabetica(Funcionario_data data) {
        try {
            List<Funcionario> funcionarios = data.get_funcionarios().stream()
                    .sorted(Comparator.comparing(Funcionario::get_Nome))
                    .collect(Collectors.toList());

            System.out.println("Funcionários em ordem alfabética:");
            for (Funcionario f : funcionarios) {
                System.out.println(" - " + f.get_Nome());
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários em ordem alfabética: " + e.getMessage()));
        }
    }

    private static void total_de_salario(Funcionario_data data) {
        try {
            double totalSalario = data.get_funcionarios().stream()
                    .mapToDouble(f -> f.get_Salario().doubleValue()).sum();
            System.out.println("Total de salários: " + totalSalario);
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao calcular total de salários: " + e.getMessage()));
        }
    }

    private static void salario_minimo_por_funcionario(Funcionario_data data, double salarioMinimo) {
        try {
            List<Funcionario> funcionarios = data.get_funcionarios();
            for (Funcionario f : funcionarios) {
                 System.out.println(f.get_Nome() + " - " + f.get_Funcao() + " - " + f.get_Salario().divide(BigDecimal.valueOf(salarioMinimo), 2, RoundingMode.HALF_UP) + " - " + f.get_DataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar salários mínimos por funcionário: " + e.getMessage()));
        }
    }

    
    public static void pausa() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Pressione ENTER para continuar...");
        scanner.nextLine();
        System.out.println("Continuando o programa...");
    }
    
}