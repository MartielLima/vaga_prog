package com.example.db;

import java.io.IOException;
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
import java.math.BigDecimal;

import com.example.model.Funcionario;
import com.example.util.crud.Read;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

public class Funcionario_db {
    private static Connection conexao;

    public static Connection get_conexao() {
        return conexao;
    }

    public Funcionario_db(String caminho) throws SQLException {
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
            carregar_funcionarios(conexao);
        }

        
    }

    private void carregar_funcionarios(Connection conexao) throws SQLException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.findAndRegisterModules();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            SimpleModule module = new SimpleModule();
            module.addDeserializer(LocalDate.class, new LocalDateDeserializer(formatter));
            mapper.registerModule(module);

            InputStream input = getClass().getClassLoader().getResourceAsStream("funcionarios.json");
            if (input == null) {
                throw new RuntimeException("Arquivo funcionarios.json não encontrado no caminho.");
            }

            List<Funcionario> funcionarios = mapper.readValue(
                input,
                new TypeReference<List<Funcionario>>() {}
            );

            for (Funcionario f : funcionarios) {
                inserir(f, this);
            }
        } catch (IOException | RuntimeException | SQLException e) {
            throw new SQLException("Erro ao carregar funcionários do JSON: " + e.getMessage(), e);
        }
    }

    public String inserir(Funcionario f, Funcionario_db db) throws SQLException {
        Funcionario funcionarioExistente = Read.get_funcionarioByName(f.getNome());

        if (funcionarioExistente != null) {
            System.out.println("Funcionário já existe.");
            return "Funcionário já existe.";
        }

        if (f.getNome() == null || f.getNome().isBlank()) {
            System.out.println("Nome inválido.");
            return "Nome inválido.";
        } else if (f.getDataNascimento() == null) {
            System.out.println("Data de nascimento inválida.");
            return "Data de nascimento inválida.";
        } else if (f.getSalario() == null || f.getSalario().compareTo(BigDecimal.ZERO) <= 0) {
            System.out.println("Salário inválido.");
            return "Salário inválido.";
        } else if (f.getFuncao() == null || f.getFuncao().isBlank()) {
            System.out.println("Função inválida.");
            return "Função inválida.";
        }

        String sql = "INSERT INTO funcionarios(nome, dataNascimento, salario, funcao) VALUES (?, ?, ?, ?)";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, f.getNome());
            ps.setString(2, f.getDataNascimento().toString());
            ps.setBigDecimal(3, f.getSalario());
            ps.setString(4, f.getFuncao());
            ps.executeUpdate();
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        f.setId(null);

        String json;
        try {
            json = mapper.writeValueAsString(f);
        } catch (JsonProcessingException e) {
            throw new SQLException("Erro ao converter funcionário para JSON: " + e.getMessage(), e);
        }

        return json;
    }

    public List<Funcionario> listar_todos() throws SQLException {
        List<Funcionario> lista = new ArrayList<>();
        String sql = "SELECT * FROM funcionarios";
        try (ResultSet rs = conexao.createStatement().executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Funcionario(
                    rs.getInt("id"),
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                ));
            }
        }
        return lista;
    }

    public String remover(int id) throws SQLException {
        Funcionario funcionario = get_funcionario(id);
        if (funcionario == null) {
            System.err.println("Funcionário não encontrado");
            return "Funcionário não encontrado";
        }

        String sql = "DELETE FROM funcionarios WHERE id = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        String json;
        try {
            json = mapper.writeValueAsString(funcionario);
        } catch (JsonProcessingException e) {
            throw new SQLException("Erro ao converter funcionário para JSON: " + e.getMessage(), e);
        }
        return json;
    }

    public Funcionario get_funcionario(int id) throws SQLException {
        String sql = "SELECT * FROM funcionarios WHERE id = ?";
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setInt(1, id);
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

    public List<Funcionario> get_funcionarios() throws SQLException {
        List<Funcionario> lista = new ArrayList<>();
        String sql = "SELECT * FROM funcionarios";
        try (ResultSet rs = conexao.createStatement().executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Funcionario(
                    rs.getInt("id"),
                    rs.getBigDecimal("salario"),
                    rs.getString("funcao"),
                    rs.getString("nome"),
                    LocalDate.parse(rs.getString("dataNascimento"))
                ));
            }
        }
        return lista;
    }

    public String atualizar(Funcionario f) throws SQLException {
        Funcionario funcionarioExistente = get_funcionario(f.getId());
        if (funcionarioExistente == null) {
            System.err.println("Funcionário não encontrado");
            return "Funcionário não encontrado";
        }

        String sql = "UPDATE funcionarios SET salario = ?, funcao = ? WHERE id = ?";
        
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setBigDecimal(1, (f.getSalario() != null) ? f.getSalario() : funcionarioExistente.getSalario());
            ps.setString(2, (f.getFuncao() != null) ? f.getFuncao() : funcionarioExistente.getFuncao());
            ps.setInt(3, funcionarioExistente.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar funcionário: " + e.getMessage());
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        String json;
        try {
            json = mapper.writeValueAsString(get_funcionario(f.getId()));
        } catch (JsonProcessingException e) {
            System.err.println("Erro ao converter funcionário para JSON: " + e.getMessage());
            return "Erro ao converter funcionário para JSON: " + e.getMessage();
        }

        return json;
    }

    public void fechar() throws SQLException {
        conexao.close();
    }

    public Connection getConexao() {
        return conexao;
    }
}
