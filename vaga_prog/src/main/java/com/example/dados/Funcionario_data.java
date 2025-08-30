package com.example.dados;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.example.Funcionario;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

public class Funcionario_data {
    private Connection conexao;

    public Funcionario_data(String caminho) throws SQLException {
        conexao = DriverManager.getConnection("jdbc:sqlite:" + caminho);
        criar_tabela();
    }

    private void criar_tabela() throws SQLException {

        String tabela = "funcionarios";
        ResultSet rs = conexao.createStatement().executeQuery(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='" + tabela + "'"
        );

        boolean tabelaExistia = rs.next();

        if (!tabelaExistia) {
            String sql = """
                CREATE TABLE IF NOT EXISTS funcionarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT,
                    dataNascimento TEXT,
                    salario REAL,
                    funcao TEXT
                )
            """;
            conexao.createStatement().execute(sql);
            carregar_funcionarios();
        }

        
    }

    private void carregar_funcionarios() throws SQLException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.findAndRegisterModules();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            SimpleModule module = new SimpleModule();
            module.addDeserializer(LocalDate.class, new LocalDateDeserializer(formatter));
            mapper.registerModule(module);

            InputStream input = getClass().getClassLoader().getResourceAsStream("funcionarios.json");
            if (input == null) {
                throw new RuntimeException("Arquivo funcionarios.json não encontrado no classpath.");
            }

            List<Funcionario> funcionarios = mapper.readValue(
                input,
                new TypeReference<List<Funcionario>>() {}
            );

            for (Funcionario f : funcionarios) {
                inserir(f);
            }
        } catch (Exception e) {
            throw new SQLException("Erro ao carregar funcionários do JSON: " + e.getMessage(), e);
        }
    }

    public void inserir(Funcionario f) throws SQLException {
        String sql = "INSERT INTO funcionarios(nome, dataNascimento, salario, funcao) VALUES (?, ?, ?, ?)";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, f.get_Nome());
            ps.setString(2, f.get_DataNascimento().toString());
            ps.setBigDecimal(3, f.get_Salario());
            ps.setString(4, f.get_Funcao());
            ps.executeUpdate();
        }
    }

    public List<Funcionario> listar_todos() throws SQLException {
        List<Funcionario> lista = new ArrayList<>();
        String sql = "SELECT * FROM funcionarios";
        try (ResultSet rs = conexao.createStatement().executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Funcionario(
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                ));
            }
        }
        return lista;
    }

    public void remover(Funcionario funcionario) throws SQLException {
        String sql = "DELETE FROM funcionarios WHERE nome = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, funcionario.get_Nome());
            ps.executeUpdate();
        }
    }

    public Funcionario get_funcionario(String nome) throws SQLException {
        String sql = "SELECT * FROM funcionarios WHERE nome = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, nome);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Funcionario(
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                );
            }
        }
        return null;
    }

    public List<Funcionario> get_funcionarios() throws SQLException {
        List<Funcionario> lista = new ArrayList<>();
        String sql = "SELECT * FROM funcionarios";
        try (ResultSet rs = conexao.createStatement().executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Funcionario(
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                ));
            }
        }
        return lista;
    }

    public void atualizar(Funcionario f) throws SQLException {
        String sql = "UPDATE funcionarios SET salario = ?, funcao = ? WHERE nome = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setBigDecimal(1, f.get_Salario());
            ps.setString(2, f.get_Funcao());
            ps.setString(3, f.get_Nome());
            ps.executeUpdate();
        }
    }

    public void fechar() throws SQLException {
        conexao.close();
    }
}
