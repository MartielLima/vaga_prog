package com.example.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Funcionario extends Pessoa {
    private BigDecimal Salario;
    private String Funcao;

    public Funcionario() {}

    @JsonCreator
    public Funcionario( 
        int id,
        @JsonProperty("Salario") BigDecimal Salario,
        @JsonProperty("Funcao") String Funcao,
        @JsonProperty("Nome") String Nome,
        @JsonProperty("DataNascimento") LocalDate DataNascimento) {
        super(Nome, DataNascimento, id);
        this.Salario = Salario;
        this.Funcao = Funcao;
    }


    public BigDecimal get_Salario() { return Salario; }
    public void set_Salario(BigDecimal Salario) { this.Salario = Salario; }

    public String get_Funcao() { return Funcao; }
    public void set_Funcao(String Funcao) { this.Funcao = Funcao; }
}
