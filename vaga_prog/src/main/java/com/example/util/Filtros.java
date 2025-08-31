package com.example.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.Cor;
import com.example.Funcionario;
import com.example.dados.Funcionario_data;

public class Filtros {
    public static void agrupar_por_funcao(Funcionario_data data) {
        try {
            Map<String, List<Funcionario>> funcionariosPorFuncao = data.get_funcionarios().stream()
                    .collect(Collectors.groupingBy(Funcionario::get_Funcao));

            for (Map.Entry<String, List<Funcionario>> entry : funcionariosPorFuncao.entrySet()) {
                System.out.println("Função: " + entry.getKey());
                for (Funcionario f : entry.getValue()) {
                    System.out.println(" - " + f.get_Nome());
                }
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao agrupar funcionários por função: " + e.getMessage()));
        }
    }

    public static void aniversariantes_do_mes(Funcionario_data data, Integer mes_niv) {
        List<Funcionario> aniversariantes;
        int mes;

        if (mes_niv != null && mes_niv >= 1 && mes_niv <= 12) {
            mes = mes_niv;
        } else {
            mes = LocalDate.now().getMonthValue();
        }

        try {
            aniversariantes = data.get_funcionarios().stream()
                    .filter(f -> f.get_DataNascimento().getMonthValue() == mes)
                    .collect(Collectors.toList());

            if (aniversariantes.isEmpty()) {
                System.out.println("Nenhum funcionário faz aniversário no mês " + mes + ".");
            } else {
                System.out.println("Funcionários que fazem aniversário no mês " + mes + ":");
                for (Funcionario f : aniversariantes) {
                    System.out.println(" - " + f.get_Nome());
                }
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar aniversariantes do mês: " + e.getMessage()));
        }
    }

    public static void funcionario_mais_velho(Funcionario_data data) {
        try {
            Optional<Funcionario> funcionarioMaisVelho = data.get_funcionarios().stream()
                    .max(Comparator.comparing(Funcionario::get_DataNascimento));

            if (funcionarioMaisVelho.isPresent()) {
                System.out.println("Funcionário mais velho:");
                System.out.println(" - Nome: " + funcionarioMaisVelho.get().get_Nome());
                System.out.println(" - Data de Nascimento: " + funcionarioMaisVelho.get().get_DataNascimento());
            } else {
                System.out.println("Nenhum funcionário encontrado.");
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionário mais velho: " + e.getMessage()));
        }
    }

    public static void funcionarios_em_ordem_alfabetica(Funcionario_data data) {
        try {
            List<Funcionario> funcionarios = data.get_funcionarios().stream()
                    .sorted(Comparator.comparing(Funcionario::get_Nome))
                    .collect(Collectors.toList());

            System.out.println("Funcionários em ordem alfabética:");
            for (Funcionario f : funcionarios) {
                System.out.println(" - " + f.get_Nome());
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar funcionários em ordem alfabética: " + e.getMessage()));
        }
    }

    public static void total_de_salario(Funcionario_data data) {
        try {
            double totalSalario = data.get_funcionarios().stream()
                    .mapToDouble(f -> f.get_Salario().doubleValue()).sum();
            System.out.println("Total de salários: " + totalSalario);
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao calcular total de salários: " + e.getMessage()));
        }
    }

    public static void salario_minimo_por_funcionario(Funcionario_data data, double salarioMinimo) {
        try {
            List<Funcionario> funcionarios = data.get_funcionarios();
            for (Funcionario f : funcionarios) {
                 System.out.println(f.get_Nome() + " - " + f.get_Funcao() + " - " + f.get_Salario().divide(BigDecimal.valueOf(salarioMinimo), 2, RoundingMode.HALF_UP) + " - " + f.get_DataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            }
        } catch (SQLException e) {
            System.out.println(Cor.vermelho("Erro ao listar salários mínimos por funcionário: " + e.getMessage()));
        }
    }

}
