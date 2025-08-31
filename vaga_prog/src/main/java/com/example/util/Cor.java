package com.example.util;

public class Cor {

    public static String branco(String palavra) {
        return "\033[1;30m" + palavra + "\033[0m";
    }

    public static String vermelho(String palavra) {
        return "\033[1;31m" + palavra + "\033[0m";
    }

    public static String amarelo(String palavra) {
        return "\033[1;33m" + palavra + "\033[0m";
    }

    public static String verde(String palavra) {
        return "\033[1;32m" + palavra + "\033[0m";
    }

    public static String azul(String palavra) {
        return "\033[1;34m" + palavra + "\033[0m";
    }

    public static String roxo(String palavra) {
        return "\033[1;35m" + palavra + "\033[0m";
    }

    public static String ciano(String palavra) {
        return "\033[1;36m" + palavra + "\033[0m";
    }

    public static String cinza(String palavra) {
        return "\033[1;37m" + palavra + "\033[0m";
    }
}

