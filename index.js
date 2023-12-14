
const Discord = require('discord.js');
const client = new Discord.Client();

//aqui voce ira pegar o id do chat que você quer que as perguntas apareça
const canalProvasID = '1184281598695329825'; // aqui o usuario ira entrar no chat e dizer !iniciarprova , ai as perguntas irá aparecer
const canalResultadosID = '1184521816920838185'; // aqui o resultado irá aparecer somente para o administrador responsavel. nennhum membro irá ter acesso

// você pode colocar suas perguntas e respostas, pode ser perguntas normais ou perguntas com ALTERNATIVAS EXEMPLO: A B C D E 
const perguntas = [
  {
    pergunta: 'Pergunta 1: Ao atender um paciente que apresenta falta de ar intensa, como você procederia inicialmente?',
    opcoes: ['a) Iniciaria um protocolo de RCP imediatamente', 'b) Realizaria uma ausculta pulmonar para avaliar a presença de crepitações', 'c) Priorizaria a administração de um descongestionante', 'd) Encaminharia o paciente para uma consulta ambulatorial posterior'],
    resposta: 'c' 
  },
  {
    pergunta: 'Pergunta 2: Em uma situação virtual de atendimento de emergência, como você deve se comunicar efetivamente com a equipe?',
    opcoes: ['a) Utilizando linguagem técnica complexa e abreviações específicas', 'b) Mantendo informações cruciais para si mesmo para evitar sobrecarregar a equipe', 'c) Fornecendo informações claras e concisas, adaptando a comunicação à compreensão da equipe', 'd) Ignorando instruções e priorizando ações individuais sem coordenação'],
    resposta: 'c'
  },
  {
    pergunta: 'Pergunta 3: Qual medida é essencial para prevenir infecções durante o atendimento a pacientes no hospital?',
    opcoes: ['a) Utilização de luvas descartáveis e troca frequente durante o atendimento', 'b) Ignorar a lavagem das mãos, confiando apenas na utilização de luvas', 'c) Reutilizar materiais para evitar desperdício e reduzir custos', 'd) Descartar resíduos em qualquer lugar para simplificar o processo de limpeza'],
    resposta: 'a' 
  },
  {
    pergunta: 'Pergunta 4: Ao atender um paciente que relata ter uma bala alojada, qual seria uma ação inicial apropriada?',
    opcoes: ['a) Retirar a bala imediatamente, mesmo sem avaliação', 'b) Realizar uma avaliação visual rápida e decidir sobre a remoção', 'c) Ignorar a presença da bala, pois não representa uma ameaça', 'd) Prescrever analgésicos antes de qualquer avaliação'],
    resposta: 'b' 
  },
  {
    pergunta: 'Pergunta 5: Em uma situação virtual de múltiplas vítimas, qual é uma diretriz importante para a triagem de pacientes?',
    opcoes: ['a) Priorizar pacientes mais jovens devido à maior expectativa de vida', 'b) Priorizar pacientes que estão conscientes e respirando, independente da gravidade da lesão', 'c) Aleatorizar a ordem de atendimento para evitar qualquer viés', 'd) Priorizar pacientes com lesões visíveis e externas para intervenção imediata'],
    resposta: 'b' 
  },
  {
    pergunta: 'Pergunta 6: Qual é um exemplo de um medicamento de primeira linha frequentemente utilizado em situações de emergência?',
    opcoes: ['a) Analgésico', 'b) Antibiótico', 'c) Vasodilatador', 'd) Antipirético'],
    resposta: 'b' 
  },
  {
    pergunta: 'Pergunta 7: Qual dos seguintes medicamentos é comumente utilizado como anti-inflamatório?',
    opcoes: ['a) Analgésico', 'b) Antibiótico', 'c) Antiácido', 'd) Anti-hipertensivo'],
    resposta: 'a' 
  },
  {
    pergunta: 'Pergunta 8: Em uma simulação de atendimento a queimaduras, qual é a primeira medida a ser tomada?',
    opcoes: ['a) Aplicar um curativo', 'b) Resfriar a área afetada com água fria', 'c) Administrar analgésicos', 'd) Realizar uma avaliação visual rápida'],
    resposta: 'b' 
  },
  {
    pergunta: 'Pergunta 9: Durante uma ocorrência de SAMU, ao abordar o atendimento a um paciente em estado de choque, qual abordagem seria mais apropriada?',
    opcoes: ['a) Elevar as pernas do paciente', 'b) Administrar água para reidratação rápida', 'c) Realizar massagem cardíaca contínua para estimular a circulação sanguínea', 'd) Utilizar um desfibrilador externo automático (DEA) para corrigir ritmos cardíacos anormais'],
    resposta: 'a' 
  },
  {
    pergunta: 'Pergunta 10: Em um atendimento, um paciente expressa preocupações e emoções. Como você aplicaria a técnica de escuta humanizada para garantir uma interação eficaz?',
    opcoes: ['a) Validar as emoções do paciente e expressar empatia, buscando compreender suas experiências', 'b) Oferecer imediatamente soluções práticas para os problemas mencionados, demonstrando ação imediata', 'c) Ignorar as emoções do paciente para manter a objetividade e focar apenas nos aspectos técnicos', 'd) Sugerir ao paciente que resolva suas preocupações emocionais fora do ambiente hospitalar, buscando desvincular a situação do atendimento'],
    resposta: 'a'
  },

];

let indicePerguntaAtual = 0;
let respostasUsuario = {};

client.on('message', (message) => {
  if (message.channel.id === canalProvasID) {
    if (message.content.toLowerCase() === '!iniciarprova') {
   
      respostasUsuario = {};
      enviarProximaPergunta(message.channel);
    } else if (indicePerguntaAtual < perguntas.length) {
      const resposta = message.content.toLowerCase();
      if (['a', 'b', 'c', 'd'].includes(resposta)) {
      
        respostasUsuario[perguntas[indicePerguntaAtual].pergunta] = resposta;

    
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
          enviarProximaPergunta(message.channel);
        } else {
          finalizarProva(message.channel);
        }
      }
    } else if (message.content.toLowerCase() === '!finalizado') {
    
      enviarResultados(message.guild.channels.cache.get(canalResultadosID));
    }
  }
  
});



function enviarProximaPergunta(channel) {
  const perguntaAtual = perguntas[indicePerguntaAtual];
  const textoPergunta = `${perguntaAtual.pergunta}\n${perguntaAtual.opcoes.join('\n')}`;
  channel.send(textoPergunta);
}

function finalizarProva(channel) {
  channel.send('Prova finalizada! Aguarde os resultados.');
}

function enviarResultados(channel) {
  let mensagemResultados = 'Resultados da prova:\n\n';
  for (const pergunta of perguntas) {
    const respostaUsuario = respostasUsuario[pergunta.pergunta] || 'Não respondida';
    const correta = respostaUsuario === pergunta.resposta;
    mensagemResultados += `${pergunta.pergunta}\nResposta do usuário: ${respostaUsuario.toUpperCase()}\nCorreta: ${correta ? 'Sim' : 'Não'}\n\n`;
  }
  channel.send(mensagemResultados);
}

const prefix = '!';

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'limpar') {
    limparMensagens(message);
  }
});

function limparMensagens(message) {
  const quantidade = parseInt(message.content.split(' ')[1]);

  if (isNaN(quantidade) || quantidade <= 0 || quantidade > 100) {
    return message.reply('Por favor, forneça um número válido de mensagens para limpar (entre 1 e 100).');
  }

  const quantidadeExclusao = Math.min(quantidade, 100);

  message.channel.bulkDelete(quantidadeExclusao, true)
    .then((messages) => {
      console.log(`Foram limpas ${messages.size} mensagens.`);
      message.channel.send(`Foram limpas ${messages.size} mensagens.`)
        .then(msg => msg.delete({ timeout: 3000 }));
    })
    .catch(error => {
      console.error('Erro ao limpar mensagens:', error);
      message.reply(`Houve um erro ao tentar limpar as mensagens. Erro: ${error.message}`);
    });
}


const token = 'SEU TOKEN VOCÊ COLOCA AQUI';

client.login(token);
