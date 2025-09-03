package com.example.api.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/")
public class FuncionarioController {

    private Funcionario_db db;

    // Fazer
    public FuncionarioController() {
        try {
            this.db = new Funcionario_db("funcionarios.db");
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao banco de dados: " + e.getMessage());
        }
    }

    // Fazer
    @GetMapping("/all")
    public ResponseEntity<List<Funcionario>> listarFuncionarios() {
        try {
            return ResponseEntity.ok(db.get_funcionarios());
        } catch (SQLException e) {
            System.err.println("Erro ao listar funcionários: " + e.getMessage());
            return ResponseEntity.status(500).body(List.of());
        }
    }

    // Fazer
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

    // Fazer
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

    // Fazer
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

    // Fazer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerFuncionario(@PathVariable int id) {
        try {
            return ResponseEntity.ok(db.remover(id));
        } catch (SQLException e) {
            System.err.println("Erro ao remover funcionário: " + e.getMessage());
            return ResponseEntity.status(500).body("Erro ao remover funcionário.");
        }
    }

    // Ja feito
    @PostMapping("/cadastrarUsuarios")
    public ResponseEntity<String> cadastrarUsuarios() {
        Map<String, String> response = new HashMap<>();
        try {
            response = new GerarFuncionarios(this.db).gerar();
            return ResponseEntity.ok(response.toString());
        } catch (Error e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
