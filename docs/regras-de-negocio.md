# Regras de negocio

Base: relatório do segundo semestre, seção 2. Numeração original preservada. Classificação por inspeção estática do ZIP, não por teste de execução. Local = demonstrado no navegador; parcial = atendimento incompleto; futuro = não implementado; simulado = sem operação institucional.

| ID | Especificação original | Situação |
|---|---|---|
| RN01 | Apenas usuários autenticados poderão registrar e acompanhar denúncias vinculadas a uma conta. | Futuro |
| RN02 | Cada denúncia deverá possuir um identificador único. | Parcial |
| RN03 | Uma denúncia deverá conter, obrigatoriamente, categoria, descrição e localização da ocorrência. | Local |
| RN04 | Uma denúncia poderá conter um ou mais arquivos complementares, desde que estejam em formato e tamanho aceitos pelo sistema. | Parcial |
| RN05 | O status inicial de toda denúncia deverá ser “Recebida”. | Divergente |
| RN06 | Os status possíveis deverão seguir uma sequência controlada, como “Recebida”, “Em análise”, “Encaminhada”, “Em atendimento” e “Concluída”. | Divergente |
| RN07 | Somente usuários com perfil de fiscalização ou administração poderão alterar o status de uma denúncia. | Não atendida |
| RN08 | O usuário deverá ser informado quando houver alteração no status de uma denúncia vinculada à sua conta. | Futuro |
| RN09 | Uma denúncia concluída não poderá ter seu status alterado por um cidadão comum. | Não atendida |
| RN10 | Dados pessoais do denunciante não deverão ser exibidos publicamente sem autorização ou justificativa prevista na política da plataforma. | A validar |
| RN11 | O sistema deverá registrar o usuário, a data e o horário de cada alteração realizada em uma denúncia. | Futuro |
| RN12 | A denúncia deverá ser encaminhada conforme a categoria e a área de responsabilidade definida para a ocorrência. | Futuro |
