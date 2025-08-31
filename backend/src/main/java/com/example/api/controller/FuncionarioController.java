package com.example.api.controller;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;

import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/")
public class FuncionarioController {
    private Funcionario_db db;

    public FuncionarioController() {
        try {
            this.db = new Funcionario_db("funcionarios.db");
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao banco de dados: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Funcionario>> listarFuncionarios() {
        try {
            return ResponseEntity.ok(db.get_funcionarios());
        } catch (SQLException e) {
            System.err.println("Erro ao listar funcionários: " + e.getMessage());
            return ResponseEntity.status(500).body(List.of());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> listarFuncionario(@PathVariable int id) {
        try {
            Funcionario funcionario = db.get_funcionario(id);
            if (funcionario != null) {
                return ResponseEntity.ok(funcionario);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar funcionários: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<String> adicionarFuncionario(@RequestBody Funcionario funcionario) {
        try {
            String resultado = db.inserir(funcionario, this.db);
            return ResponseEntity.ok(resultado);
        } catch (SQLException e) {
            System.err.println("Erro ao adicionar funcionário: " + e.getMessage());
            return ResponseEntity.status(500).body("Erro ao adicionar funcionário.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarFuncionario(@PathVariable int id, @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        try {
            return ResponseEntity.ok(db.atualizar(funcionario));
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar funcionário: " + e.getMessage());
            return ResponseEntity.status(500).body("Erro ao atualizar funcionário.");
        }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerFuncionario(@PathVariable int id) {
        try {
            return ResponseEntity.ok(db.remover(id));
        } catch (SQLException e) {
            System.err.println("Erro ao remover funcionário: " + e.getMessage());
            return ResponseEntity.status(500).body("Erro ao remover funcionário.");
        }
    }
}
