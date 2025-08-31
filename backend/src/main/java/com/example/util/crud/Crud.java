package com.example.util.crud;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;
import com.example.util.Cor;

public class Crud {
    public static void listarFuncionarios(Funcionario_db db) {
        try {
            List<Funcionario> lista = db.listar_todos();
            NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
            for (Funcionario f : lista) {

                System.out.println(f.getNome() + " - " + f.getFuncao() + " - " + format.format(f.getSalario()) + " - " + f.getDataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
            System.out.println("Total de funcionários: " + lista.size() + "\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários: " + e.getMessage()));
        }
    }

    public static void atualizarFuncionarios(Funcionario_db db) {
        try (Scanner scan_atualizar = new Scanner(System.in)) {
            String nome = "";
            System.out.println("Quem deseja atualizar?");
            if (scan_atualizar.hasNextLine()) {
                nome = scan_atualizar.nextLine();
            }

            Funcionario funcionario = Read.get_funcionarioByName(nome);
            if (funcionario != null) {
                System.out.println("Digite o novo salario do funcionário:");
                
                BigDecimal novoSalario = new BigDecimal(scan_atualizar.nextLine());
                if (novoSalario.compareTo(BigDecimal.ZERO) > 0) {
                    funcionario.setSalario(novoSalario);
                }
                System.out.println("Digite a nova função do funcionário:");
                String novaFuncao = scan_atualizar.nextLine();
                if (!novaFuncao.isBlank()) {
                    funcionario.setFuncao(novaFuncao);
                }
                db.atualizar(funcionario);
                System.out.println("Funcionário atualizado com sucesso.\n\n");
            } else {
                System.out.println("Funcionário não encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao atualizar funcionário: " + e.getMessage()));
        }
    }

    public static void registrarFuncionarios(Funcionario_db db) {
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
            novoFuncionario.setNome(nome);
            novoFuncionario.setDataNascimento(dataNascimento);
            novoFuncionario.setSalario(salario);
            novoFuncionario.setFuncao(funcao);

            db.inserir(novoFuncionario, db);
            System.out.println("Funcionário registrado com sucesso.\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao registrar funcionário: " + e.getMessage()));
        }
    }

    public static void removerFuncionarios(Funcionario_db db, int id) {
        try {
            Funcionario funcionario = db.get_funcionario(id);
            if (funcionario != null) {
                db.remover(funcionario.getId());
                System.out.println("Funcionário removido com sucesso\n\n");
            } else {
                System.out.println("Funcionário não encontrado.\n\n");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao remover funcionário: " + e.getMessage()));
        }
    }

    public static void aumentar_salario(Funcionario_db db, BigDecimal percentual , Funcionario funcionario) {
        if (funcionario != null) {
            BigDecimal aumento = funcionario.getSalario().multiply(percentual).divide(new BigDecimal("100"));
            BigDecimal novoSalario = funcionario.getSalario().add(aumento);
            funcionario.setSalario(novoSalario);
            try {
                db.atualizar(funcionario);
                System.out.println("Salário aumentado com sucesso.\n\n");
            } catch (SQLException e) {
                System.out.println(Cor.vermelho("Erro ao atualizar salário: " + e.getMessage()));
            }
        }

        try {
            List<Funcionario> funcionarios = db.get_funcionarios();
            for (Funcionario f : funcionarios) {
                BigDecimal aumento = f.getSalario().multiply(percentual).divide(new BigDecimal("100"));
                BigDecimal novoSalario = f.getSalario().add(aumento);
                f.setSalario(novoSalario);
                db.atualizar(f);
            }

            System.out.println(Cor.verde("Todos os funcionários foram atualizados com sucesso."));
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao aumentar salário: " + e.getMessage()));
        }
    }
}
