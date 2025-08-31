package com.example.util.crud;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;

public class Read  {
    private static Connection conexao;

    static {
        try {
            conexao = Funcionario_db.get_conexao();
        } catch (Exception e) {
            System.err.println("Erro ao obter conexão: " + e.getMessage());
        }
    }

    public static Funcionario get_funcionarioByName(String nome) throws SQLException {
        String sql = "SELECT * FROM funcionarios WHERE nome = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, nome);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Funcionario(
                    rs.getInt("id"),
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                );
            }
        }
        return null;
    }
}
