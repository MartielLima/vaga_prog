# Comandos para iniciar a aplicação

Aplicação ainda em desenvolvimento, próximos passos:

- mostrar erros / alertas no frontend
    E nesscessario converter todas as resposta em um objeto, como iniciado no Gerar Funcionario, e retornar ao FrontEnd;
- Implementar Load nas chamadas de API
- implementar filtros e relatórios solicitado no desafio

## Iniciar Backend

```shell
    cd ./backend
    mvn spring-boot:run
```

## Iniciar Frontend

```shell
    cd ./frontend
    bun run dev
```

## Comandos uteis

### Comando para instalação de dependencias JAVA mavin

```shell
    # Devido a um bug do mavin com powershell usar CMD
    mvn clean install
```

### Comando para instalação de dependencias

```shell
    bun install
```
