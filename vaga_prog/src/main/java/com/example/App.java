package com.example;

import com.example.dados.Funcionario_data;

public class App{
    public static void main(String[] args) throws Exception {
        Funcionario_data data = new Funcionario_data("funcionarios.db");
        Interface.start(data);
    }
}