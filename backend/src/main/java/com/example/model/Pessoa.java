package com.example.model;

import java.sql.SQLException;
import java.time.LocalDate;

import com.example.util.crud.Read;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Pessoa {
    private String nome;
    private LocalDate dataNascimento;
    private Integer id;
    
    public Pessoa() {}
    
    @JsonCreator
    public Pessoa(@JsonProperty("Nome") String Nome,
    @JsonProperty("DataNascimento") LocalDate DataNascimento,
                  Integer id) {
        this.nome = Nome;
        this.dataNascimento = DataNascimento;
        this.id = id;
    }
    
    public String getNome() { return nome; }
    public void setNome(String Nome) { this.nome = Nome; }
    
    public int getId() {
        if (this.id != null) {
            return this.id.intValue();
        } else {
            this.setId(null);
            return this.id.intValue();
        }
    }
    public void setId(Integer id) {
        if (id != null) {
            this.id = id;
        } else {
            try {
                this.id = Read.get_funcionarioByName(this.nome).getId();
            } catch (SQLException e) {
                throw new IllegalArgumentException("Funcionário não encontrado");
            }
        }
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate DataNascimento) { this.dataNascimento = DataNascimento; }
}
