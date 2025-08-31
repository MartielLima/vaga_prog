package com.example;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Scanner;

import com.example.dados.Funcionario_data;
import com.example.util.Cor;
import com.example.util.Crud;
import com.example.util.Filtros;
import com.example.util.Util;



public class Interface {
    public static void start(Funcionario_data data ) throws InterruptedException {
        Util.clean();
        System.out.println(Cor.verde("Bem-vindo a minha tentativa de realizar o desafio proposto!"));
        Thread.sleep(2000);
        Util.clean();

        Scanner scan = new Scanner(System.in);

        String opcao = "0";

        while (!opcao.equals("1") && !opcao.equals("2")) {
            System.out.println(Cor.azul("Escolha uma das opções abaixo:"));
            System.out.printf("%s: Caso prefira a demostração solicitada no teste selecione\n", Cor.ciano("1"));
            System.out.printf("%s: Caso queria realizar interações\n", Cor.verde("2"));
            System.out.printf("%s: Para sair\n", Cor.vermelho("sair"));
            System.out.printf(Cor.verde("> "));
            if (scan.hasNextLine()) {
                opcao = scan.nextLine();
            } else {
                opcao = "";
            }

            switch (opcao) {
                case "1" -> {
                    Util.clean();
                    seguir(data);
                }
                case "2" -> {
                    Util.clean();
                    interagir(data);
                }
                case "sair" -> {
                    Util.sair();
                }
                default -> System.out.println(Cor.vermelho("Opção inválida. Tente novamente."));
            }

            scan.close();
            Util.clean();
        }
    }

    public static void seguir(Funcionario_data data){
        if (data == null) {
            System.out.println(Cor.vermelho("Dados de funcionário não disponíveis."));
            return;
        }

        try {
            System.out.println(Cor.verde("Listando todos os funcionários:"));

            Crud.listarFuncionarios(data);

            Funcionario joao = data.get_funcionario("João");
            if (joao != null) {
                data.remover(joao);
                System.out.println(Cor.verde("Listando todos os funcionários apos remover o João:"));
            } else {
                System.out.println(Cor.vermelho("Funcionário João não encontrado."));
            }

            Crud.listarFuncionarios(data);

            Crud.aumentar_salario(data, new BigDecimal("10"), null);

            Crud.listarFuncionarios(data);

            Filtros.agrupar_por_funcao(data);

            Filtros.aniversariantes_do_mes(data, 10);
            Filtros.aniversariantes_do_mes(data, 12);

            Filtros.funcionario_mais_velho(data);

            Filtros.funcionarios_em_ordem_alfabetica(data);

            Filtros.total_de_salario(data);

            Filtros.salario_minimo_por_funcionario(data, 1212.00);

            data.fechar();
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao acessar os dados: " + e.getMessage()));
        }
    }

    public static void interagir(Funcionario_data data) throws InterruptedException {
        while (true) {
            Util.clean();
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
                    scan.close();
                } else {
                    opcao = "";
                }
            }

            switch (opcao) {
                case "1" -> {
                    Crud.listarFuncionarios(data);
                    Util.pausa();
                }
                case "2" -> {
                    Crud.registrarFuncionarios(data);
                    Util.pausa();
                }
                case "3" -> {
                    Crud.removerFuncionarios(data);
                    Util.pausa();
                }
                case "4" -> {
                    Crud.listarFuncionarios(data);
                    Crud.atualizarFuncionarios(data);
                    Util.pausa();
                }
                case "5" -> {
                    try (Scanner scan_aniv = new Scanner(System.in)) {
                        System.out.println("Digite o mes para ver os aniversariantes:");
                        String mes = "";
                        if (scan_aniv.hasNextLine()) {
                            mes = scan_aniv.nextLine();
                        }
                        Filtros.aniversariantes_do_mes(data, Integer.valueOf(mes));
                        Util.pausa();
                    }
                }
                case "6" -> {
                    Filtros.agrupar_por_funcao(data);
                    Util.pausa();
                }
                case "sair" -> Util.sair();
                default -> {
                }
            }
        }
    }    
}