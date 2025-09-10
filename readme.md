# Comandos para iniciar a aplicação

Aplicação ainda em desenvolvimento, próximos passos:

- Implementar Load nas chamadas de API
- Adicionar um timer para fechar o erro
- implementar filtros e relatórios solicitado no desafio
- Reset do bd
- Mostrar sucesso das requisições da API

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
