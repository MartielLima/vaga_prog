package com.example.util;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import com.example.Funcionario;
import com.example.dados.Funcionario_data;

public class Crud {
    public static void listarFuncionarios(Funcionario_data data) {
        try {
            List<Funcionario> lista = data.listar_todos();
            NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
            for (Funcionario f : lista) {

                System.out.println(f.get_Nome() + " - " + f.get_Funcao() + " - " + format.format(f.get_Salario()) + " - " + f.get_DataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
            System.out.println("Total de funcionários: " + lista.size() + "\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários: " + e.getMessage()));
        }
    }

    public static void atualizarFuncionarios(Funcionario_data data) {
        try (Scanner scan_atualizar = new Scanner(System.in)) {
            String nome = "";
            System.out.println("Quem deseja atualizar?");
            if (scan_atualizar.hasNextLine()) {
                nome = scan_atualizar.nextLine();
            }

            Funcionario funcionario = data.get_funcionario(nome);
            if (funcionario != null) {
                System.out.println("Digite o novo salario do funcionário:");
                
                BigDecimal novoSalario = new BigDecimal(scan_atualizar.nextLine());
                if (novoSalario.compareTo(BigDecimal.ZERO) > 0) {
                    funcionario.set_Salario(novoSalario);
                }
                System.out.println("Digite a nova função do funcionário:");
                String novaFuncao = scan_atualizar.nextLine();
                if (!novaFuncao.isBlank()) {
                    funcionario.set_Funcao(novaFuncao);
                }
                data.atualizar(funcionario);
                System.out.println("Funcionário atualizado com sucesso.\n\n");
            } else {
                System.out.println("Funcionário não encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao atualizar funcionário: " + e.getMessage()));
        }
    }

    public static void registrarFuncionarios(Funcionario_data data) {
        try (Scanner scan = new Scanner(System.in);) {
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
            System.out.println("Funcionário registrado com sucesso.\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao registrar funcionário: " + e.getMessage()));
        }
    }

    public static void removerFuncionarios(Funcionario_data data) {
        try (Scanner scan = new Scanner(System.in)) {
            System.out.println("Digite o nome do funcionário a ser removido:");
            String nome = scan.nextLine();

            Funcionario funcionario = data.get_funcionario(nome);
            if (funcionario != null) {
                data.remover(funcionario);
                System.out.println("Funcionário removido com sucesso\n\n");
            } else {
                System.out.println("Funcionário não encontrado.\n\n");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao remover funcionário: " + e.getMessage()));
        }
    }

    public static void aumentar_salario(Funcionario_data data, BigDecimal percentual , Funcionario funcionario) {
        if (funcionario != null) {
            BigDecimal aumento = funcionario.get_Salario().multiply(percentual).divide(new BigDecimal("100"));
            BigDecimal novoSalario = funcionario.get_Salario().add(aumento);
            funcionario.set_Salario(novoSalario);
            try {
                data.atualizar(funcionario);
                System.out.println("Salário aumentado com sucesso.\n\n");
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

            System.out.println(Cor.verde("Todos os funcionários foram atualizados com sucesso."));
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao aumentar salário: " + e.getMessage()));
        }
    }
}
