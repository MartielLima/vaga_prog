package com.example;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Pessoa {
    @JsonProperty("Nome")
    private String Nome;
    @JsonProperty("DataNascimento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate DataNascimento;

    public Pessoa() {}

    @JsonCreator
    public Pessoa(@JsonProperty("Nome") String Nome,
                  @JsonProperty("DataNascimento") LocalDate DataNascimento) {
        this.Nome = Nome;
        this.DataNascimento = DataNascimento;
    }

    public String get_Nome() { return Nome; }
    public void set_Nome(String Nome) { this.Nome = Nome; }

    public LocalDate get_DataNascimento() { return DataNascimento; }
    public void set_DataNascimento(LocalDate DataNascimento) { this.DataNascimento = DataNascimento; }
}
