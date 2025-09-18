package com.example;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Scanner;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;
import com.example.util.Cor;
import com.example.util.Filtros;
import com.example.util.Util;
import com.example.util.crud.Crud;
import com.example.util.crud.Delete;
import com.example.util.crud.Read;

public class Interface {

    public static void start(String[] args) throws InterruptedException {
        Util.clean();
        System.out.println(Cor.verde("Bem-vindo a minha tentativa de realizar o desafio proposto!"));
        Thread.sleep(2000);
        Util.clean();

        Scanner scan = new Scanner(System.in);

        String opcao = "0";

        while (!opcao.equals("1") && !opcao.equals("2") && !opcao.equals("3") && !opcao.equals("sair")) {
            System.out.println(Cor.azul("Escolha uma das opções abaixo:"));
            System.out.printf("%s: Caso prefira a demostração solicitada no teste selecione\n", Cor.ciano("1"));
            System.out.printf("%s: Caso queria realizar interações\n", Cor.azul("2"));
            System.out.printf("%s: Iniciar servidor WEB\n", Cor.verde("3"));
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
                    try {
                        seguir(new Funcionario_db("funcionarios.db"));
                    } catch (SQLException e) {
                        System.err.println("Erro ao conectar ao banco de dados: " + e.getMessage());
                    }
                }
                case "2" -> {
                    Util.clean();
                    try {
                        interagir(new Funcionario_db("funcionarios.db"));
                    } catch (SQLException e) {
                        System.err.println("Erro ao conectar ao banco de dados: " + e.getMessage());
                    }
                }
                case "3" -> {
                    Util.clean();

                    Server server = new Server();
                    server.start(args);
                }
                case "sair" -> {
                    Util.sair();
                }
                default ->
                    System.out.println(Cor.vermelho("Opção inválida. Tente novamente."));
            }

            scan.close();
            Util.clean();
        }
    }

    public static void seguir(Funcionario_db db) {
        if (db == null) {
            System.out.println(Cor.vermelho("Dados de funcionário não disponíveis."));
            return;
        }

        try {
            System.out.println(Cor.verde("Listando todos os funcionários:"));

            Crud.listarFuncionarios(db);

            Funcionario joao = Read.get_funcionarioByName("João");

            if (joao != null) {
                db.remover(joao.getId());
                System.out.println(Cor.verde("Listando todos os funcionários apos remover o João:"));
            } else {
                System.out.println(Cor.vermelho("Funcionário João não encontrado."));
            }

            Crud.listarFuncionarios(db);

            Crud.aumentar_salario(db, new BigDecimal("10"), null);

            Crud.listarFuncionarios(db);

            Filtros.agrupar_por_funcao(db);

            Filtros.aniversariantes_do_mes(db, 10);
            Filtros.aniversariantes_do_mes(db, 12);

            Filtros.funcionario_mais_velho(db);

            Filtros.funcionarios_em_ordem_alfabetica(db);

            Filtros.total_de_salario(db);

            Filtros.salario_minimo_por_funcionario(db, 1212.00);

            System.out.println(Cor.verde("Execução concluída com sucesso."));

            db.fechar();
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao acessar os dados: " + e.getMessage()));
        }
    }

    public static void interagir(Funcionario_db db) throws InterruptedException {
        Scanner scan = new Scanner(System.in);

        while (true) {
            Util.clean();

            String opcao = "0";

            System.out.println(Cor.verde("Bem-vindo ao Menu!\n"));
            System.out.println(Cor.azul("Escolha uma das opções abaixo:"));

            System.out.printf(Cor.ciano("1") + ": para " + Cor.ciano("listar\n"));
            System.out.printf(Cor.verde("2") + ": para " + Cor.verde("registrar\n"));
            System.out.printf(Cor.vermelho("3") + ": para " + Cor.vermelho("remover\n"));
            System.out.printf(Cor.roxo("4") + ": para  " + Cor.roxo("atualizar\n"));
            System.out.printf(Cor.azul("5") + ": para " + Cor.azul("ver os aniversariantes do mes\n"));
            System.out.printf(Cor.cinza("6") + ": para " + Cor.cinza("ver os funcionarios por cargo\n"));
            System.out.println("Caso prefira sair da aplicação, digite 'sair'.");

            opcao = scan.nextLine();

            switch (opcao) {
                case "1" -> {
                    Crud.listarFuncionarios(db);
                    Util.pausa();
                }
                case "2" -> {
                    Crud.registrarFuncionarios(db);
                    Util.pausa();
                }
                case "3" -> {
                    Delete.removerFuncionariosByNome(db);
                    Util.pausa();
                }
                case "4" -> {
                    Crud.listarFuncionarios(db);
                    Crud.atualizarFuncionarios(db);
                    Util.pausa();
                }
                case "5" -> {
                    System.out.println("Digite o mes para ver os aniversariantes:");
                    String mes = "";
                    if (scan.hasNextLine()) {
                        mes = scan.nextLine();
                    }
                    Filtros.aniversariantes_do_mes(db, Integer.valueOf(mes));
                    Util.pausa();
                }
                case "6" -> {
                    Filtros.agrupar_por_funcao(db);
                    Util.pausa();
                }
                case "sair" ->
                    Util.sair();
                default -> {
                }
            }
        }
    }
}
