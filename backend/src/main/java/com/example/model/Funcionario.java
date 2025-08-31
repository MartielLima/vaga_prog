package com.example.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Funcionario extends Pessoa {
    private BigDecimal salario;
    private String funcao;

    public Funcionario() {}

    @JsonCreator
    public Funcionario( 
        int id,
        @JsonProperty("Salario") BigDecimal Salario,
        @JsonProperty("Funcao") String Funcao,
        @JsonProperty("Nome") String Nome,
        @JsonProperty("DataNascimento") LocalDate DataNascimento) {
        super(Nome, DataNascimento, id);
        this.salario = Salario;
        this.funcao = Funcao;
    }


    public BigDecimal getSalario() { return salario; }
    public void setSalario(BigDecimal Salario) { this.salario = Salario; }

    public String getFuncao() { return funcao; }
    public void setFuncao(String Funcao) { this.funcao = Funcao; }
}
