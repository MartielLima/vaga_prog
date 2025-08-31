package com.example.util;

import java.util.Scanner;

    public class Util {
        public static void pausa() {
            System.out.println("Pressione ENTER para continuar...");
            try (Scanner scanner = new Scanner(System.in)) {
                scanner.nextLine();
            }
            System.out.println("Continuando o programa...");
        }

        public static void sair() {
            System.out.println("Saindo da aplicação...");
            System.exit(0);
        }
}
