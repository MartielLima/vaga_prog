package com.example.util.crud;

import java.sql.SQLException;
import java.util.Scanner;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;
import com.example.util.Cor;

public class Delete {
    public static void removerFuncionariosByNome(Funcionario_db db) {
        try (Scanner scan = new Scanner(System.in)) {
            System.out.println("Digite o nome do funcionário a ser removido:");
            String nome = scan.nextLine();

            Funcionario funcionario = Read.get_funcionarioByName(nome);
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
}
