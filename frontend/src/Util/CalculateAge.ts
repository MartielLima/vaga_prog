export default function CalculateAge(dataNascimento: string): number {
  const hoje = new Date();
  const [ano, mes, dia] = dataNascimento.split("-").map(Number);

  const nascimento = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  if (mesAtual < nascimento.getMonth() || 
     (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())) {
    idade--;
  }

  return idade;
}