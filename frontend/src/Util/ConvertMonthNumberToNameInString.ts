export type month = "Janeiro"|"Fevereiro"|"Março"|"Abril"|"Maio"|"Junho"|
  "Julho"|"Agosto"|"Setembro"|"Outubro"|"Novembro"|"Dezembro"


export default function (month?: number): month {
    if (!month) month = new Date().getMonth() + 1

    switch (month) {
        case 1:
            return "Janeiro"
        case 2:
            return "Fevereiro"
        case 3:
            return "Março"
        case 4:
            return "Abril"
        case 5:
            return "Maio"
        case 6:
            return "Junho"
        case 7:
            return "Junho"
        case 8:
            return "Agosto"
        case 9:
            return "Setembro"
        case 10:
            return "Outubro"
        case 11:
            return "Novembro"
        case 12:
            return "Dezembro"
        default:
            return "Maio" // So pra o typescript para de reclamar, nunca sera executado.
    }
}