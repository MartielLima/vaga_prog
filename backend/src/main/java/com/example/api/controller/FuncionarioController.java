package com.example.api.controller;

import java.sql.SQLException;
import java.util.List;

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
    public ResponseEntity<String> listarFuncionarios() throws JsonProcessingException {
        try {
            this.connectDatabase();
            String json = mapper.writeValueAsString(db.get_funcionarios());
            return ResponseEntity.ok(json);
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao listar funcionários: ", e.getMessage() + " " + List.of()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> listarFuncionario(@PathVariable int id) throws JsonProcessingException {
        try {
            this.connectDatabase();
            Funcionario funcionario = db.get_funcionario(id);
            if (funcionario != null) {
                String json = mapper.writeValueAsString(funcionario);
                return ResponseEntity.ok(json);
            } else {
                throw new Error("A classe funcionario esta vazia!");
            }
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao listar funcionários:", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<String> adicionarFuncionario(@RequestBody Funcionario funcionario) {
        try {
            this.connectDatabase();
            String resultado = db.inserir(funcionario, this.db);
            return ResponseEntity.ok(resultado);
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao adicionar funcionário:", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarFuncionario(@PathVariable int id, @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        try {
            this.connectDatabase();
            return ResponseEntity.ok(db.atualizar(funcionario));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao atualizar funcionário:", e.getMessage()));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerFuncionario(@PathVariable int id) {
        try {
            this.connectDatabase();
            return ResponseEntity.ok(db.remover(id));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao remover funcionário:", e.getMessage()));
        }
    }

    @PostMapping("/cadastrarUsuarios")
    public ResponseEntity<String> cadastrarUsuarios() throws JsonProcessingException, SQLException {
        try {
            this.connectDatabase();
            return ResponseEntity.ok(gerarFuncionarios.gerar().toString());
        } catch (Error e) {
            return ResponseEntity.status(500).body(SendMassage.SendErrorMassage("Erro ao cadastrar os usuários:", e.getMessage()));
        }
    }
}
