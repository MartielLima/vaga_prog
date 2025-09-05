package com.example.api.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;
import com.example.util.GerarFuncionarios;
import com.example.util.SendMassage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/")
public class FuncionarioController {

    @Autowired
    private ObjectMapper mapper;

    private Funcionario_db db;
    private final GerarFuncionarios gerarFuncionarios = new GerarFuncionarios(mapper);

    private void connectDatabase() throws SQLException {
        if (this.db == null) {
            this.db = new Funcionario_db("funcionarios.db");
            gerarFuncionarios.setDB(this.db);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> listarFuncionarios() throws JsonProcessingException {
        try {
            this.connectDatabase();
            Map<String, Object> response = SendMassage.SendSuccessMassage("funcionario", db.get_funcionarios());
            return ResponseEntity.ok(response);
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao listar funcionários: ", e.getMessage() + " " + List.of()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> listarFuncionario(@PathVariable int id) throws JsonProcessingException {
        try {
            this.connectDatabase();
            Funcionario funcionario = db.get_funcionario(id);
            if (funcionario != null) {
                Map<String, Object> response = SendMassage.SendSuccessMassage("funcionario", funcionario);
                return ResponseEntity.ok(response);
            } else {
                throw new Error("A classe funcionario esta vazia!");
            }
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao listar funcionários:", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> adicionarFuncionario(@RequestBody Funcionario funcionario) {
        try {
            this.connectDatabase();
            return ResponseEntity.ok(db.inserir(funcionario, this.db));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao adicionar funcionário:", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizarFuncionario(@PathVariable int id, @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        try {
            this.connectDatabase();
            return ResponseEntity.ok(db.atualizar(funcionario));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao atualizar funcionário:", e.getMessage()));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> removerFuncionario(@PathVariable int id) {
        try {
            this.connectDatabase();
            return ResponseEntity.ok(db.remover(id));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao remover funcionário:", e.getMessage()));
        }
    }

    @PostMapping("/cadastrarUsuarios")
    public ResponseEntity<Map<String, Object>> cadastrarUsuarios() throws JsonProcessingException, SQLException {
        try {
            this.connectDatabase();
            return ResponseEntity.ok(gerarFuncionarios.gerar());
        } catch (Error e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao cadastrar os usuários:", e.getMessage()));
        }
    }
}
