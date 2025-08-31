package com.example.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.db.Funcionario_db;
import com.example.model.Funcionario;

public class Filtros {
    public static void agrupar_por_funcao(Funcionario_db db) {
        try {
            Map<String, List<Funcionario>> funcionariosPorFuncao = db.get_funcionarios().stream()
                    .collect(Collectors.groupingBy(Funcionario::getFuncao));

            System.out.println(Cor.verde("Funcionários agrupados por função:"));
            for (Map.Entry<String, List<Funcionario>> entry : funcionariosPorFuncao.entrySet()) {
                System.out.println(Cor.azul("Função: " + entry.getKey()));
                for (Funcionario f : entry.getValue()) {
                    System.out.println(" - " + f.getNome());
                }
            }
            System.out.println("\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao agrupar funcionários por função: " + e.getMessage()));
        }
    }

    public static void aniversariantes_do_mes(Funcionario_db db, Integer mes_niv) {
        List<Funcionario> aniversariantes;
        int mes;

        if (mes_niv != null && mes_niv >= 1 && mes_niv <= 12) {
            mes = mes_niv;
        } else {
            mes = LocalDate.now().getMonthValue();
        }

        try {
            aniversariantes = db.get_funcionarios().stream()
                    .filter(f -> f.getDataNascimento().getMonthValue() == mes)
                    .collect(Collectors.toList());

            if (aniversariantes.isEmpty()) {
                System.out.println(Cor.vermelho("Nenhum funcionário faz aniversário no mês " + mes + "."));
                System.out.println("\n\n");
            } else {
                System.out.println(Cor.verde("Funcionários que fazem aniversário no mês " + mes + ":"));
                for (Funcionario f : aniversariantes) {
                    System.out.println(" - " + f.getNome());
                }
                System.out.println("\n\n");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar aniversariantes do mês: " + e.getMessage()));
        }
    }

    public static void funcionario_mais_velho(Funcionario_db db) {
        try {
            Optional<Funcionario> funcionarioMaisVelho = db.get_funcionarios().stream()
                    .max(Comparator.comparing(Funcionario::getDataNascimento));

            if (funcionarioMaisVelho.isPresent()) {
                System.out.println(Cor.verde("Funcionário mais velho:"));
                System.out.println(" - Nome: " + funcionarioMaisVelho.get().getNome());
                System.out.println(" - Data de Nascimento: " + funcionarioMaisVelho.get().getDataNascimento());
                System.out.println("\n\n");
            } else {
                System.out.println(Cor.vermelho("Nenhum funcionário encontrado."));
                System.out.println("\n\n");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionário mais velho: " + e.getMessage()));
        }
    }

    public static void funcionarios_em_ordem_alfabetica(Funcionario_db db) {
        try {
            List<Funcionario> funcionarios = db.get_funcionarios().stream()
                    .sorted(Comparator.comparing(Funcionario::getNome))
                    .collect(Collectors.toList());

            System.out.println(Cor.verde("Funcionários em ordem alfabética:"));
            for (Funcionario f : funcionarios) {
                System.out.println(" - " + f.getNome());
            }
            System.out.println("\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários em ordem alfabética: " + e.getMessage()));
        }
    }

    public static void total_de_salario(Funcionario_db db) {
        try {
            NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
            double totalSalario = db.get_funcionarios().stream()
                    .mapToDouble(f -> f.getSalario().doubleValue()).sum();
            System.out.println("Total de salários: " + format.format(totalSalario));
            System.out.println("\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao calcular total de salários: " + e.getMessage()));
        }
    }

    public static void salario_minimo_por_funcionario(Funcionario_db db, double salarioMinimo) {
        try {
            List<Funcionario> funcionarios = db.get_funcionarios();
            for (Funcionario f : funcionarios) {
                 System.out.println(f.getNome() + " - " + f.getFuncao() + " - " + f.getSalario().divide(BigDecimal.valueOf(salarioMinimo), 2, RoundingMode.HALF_UP) + " - " + f.getDataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
            System.out.println("\n\n");
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar salários mínimos por funcionário: " + e.getMessage()));
        }
    }

}
