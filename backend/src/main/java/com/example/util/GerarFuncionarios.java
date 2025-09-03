package com.example.util;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;

public class GerarFuncionarios {

    Funcionario_db db;

    public GerarFuncionarios(Funcionario_db db) {
        this.db = db;
    }

    private static final String[] NOMES = {
        "Maria", "João", "José", "Ana", "Antônio", "Francisco", "Carlos", "Paulo", "Pedro", "Lucas",
        "Luiz", "Marcos", "Gabriel", "Rafael", "Mateus", "Daniel", "Marcelo", "Bruno", "Eduardo", "Felipe",
        "Rodrigo", "Fernando", "Diego", "André", "Vinícius", "Thiago", "Leonardo", "Ricardo", "Gustavo", "Alexandre",
        "Roberto", "Fábio", "Leandro", "Rogério", "Cláudio", "Miguel", "Caio", "Juliano", "Sérgio", "Maurício",
        "Jorge", "Murilo", "Vitor", "Igor", "Samuel", "Enzo", "Otávio", "Davi", "Arthur", "Heitor",
        "Laura", "Helena", "Mariana", "Beatriz", "Camila", "Juliana", "Letícia", "Larissa", "Gabriela", "Aline",
        "Vanessa", "Bruna", "Fernanda", "Carla", "Patrícia", "Renata", "Cláudia", "Eliane", "Simone", "Cristiane",
        "Luciana", "Tatiane", "Priscila", "Marta", "Andressa", "Paula", "Roberta", "Natália", "Carolina", "Sandra",
        "Isabela", "Rafaela", "Daniela", "Sabrina", "Viviane", "Sheila", "Michele", "Alice", "Valéria", "Cecília",
        "Yasmin", "Bianca", "Melissa", "Sofia", "Heloisa", "Manuela", "Isis", "Ester", "Clara", "Luiza", "Martiel"

    };

    private static final String[] SOBRENOMES = {
        "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
        "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
        "Rocha", "Dias", "Nunes", "Castro", "Moreira", "Mendes", "Freitas", "Cardoso", "Ramos", "Cavalcanti",
        "Teixeira", "Correia", "Azevedo", "Moura", "Cruz", "Batista", "Campos", "Leal", "Farias", "Borges",
        "Monteiro", "Macedo", "Sales", "Pinto", "Araújo", "Xavier", "Peixoto", "Amaral", "Rezende", "Coelho"

    };

    private static final String[] FUNCOES = {
        "Operador", "Recepcionista", "Contador", "Gerente",
        "Eletricista", "Coordenador", "Diretor",
        "Desenvolvedor Back-end", "Desenvolvedor Front-end",
        "Engenheiro de Dados", "UI/UX Designer",
        "Analista de Suporte", "Administrador de Redes",
        "Scrum Master", "Product Owner", "Arquiteto de Software"
    };

    private static final Random random = new Random();

    private static LocalDate gerarDataNascimento() {
        int anoAtual = LocalDate.now().getYear();
        int ano = 1955 + random.nextInt((anoAtual - 16) - 1955);
        Month mes = Month.of(1 + random.nextInt(12));
        int dia = 1 + random.nextInt(mes.length(false));
        LocalDate data = LocalDate.of(ano, mes, dia);
        return data;
    }

    public Map<String, String> gerar() {
        List<String> messages = new ArrayList<>();
        int completed = 0;
        int erros = 0;
        Map<String, String> resposta = new HashMap<>();

        for (int i = 0; i < 1200; i++) {
            String nome = NOMES[random.nextInt(NOMES.length)] + " " + SOBRENOMES[random.nextInt(SOBRENOMES.length)];
            LocalDate dataNascimento = gerarDataNascimento();
            BigDecimal salario = BigDecimal.valueOf(1500 + (random.nextDouble() * 20000));
            String funcao = FUNCOES[random.nextInt(FUNCOES.length)];
            Integer id = null;

            Funcionario novoFuncionario = new Funcionario(id, salario, nome, funcao, dataNascimento);

            try {
                this.db.inserir(novoFuncionario, db);
                messages.add(novoFuncionario.toString());
                completed++;
            } catch (SQLException e) {
                System.err.println(e.getMessage());
                messages.add("erro: " + e.getMessage());
                erros++;
            }
        }

        if (erros != 0) {
            for (String message : messages) {
                if (message.contains("erro")) {
                    String ErrMens = "Ao todo foram cadastrados " + String.valueOf(completed) + " Porem constaram" + String.valueOf(erros) + "erros";

                    resposta.put("mensagem", ErrMens);
                    resposta.put("infos", messages.toString());

                    throw new Error(resposta.toString());
                }
            }
        }

        String SuccMens = " Ao todo foram cadastrados " + String.valueOf(completed);

        resposta.put("mensagem", "Success");
        resposta.put("infos", SuccMens + messages.toString());

        return resposta;
    }
}
