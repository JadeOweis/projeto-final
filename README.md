# projeto-final

## frontend
- **TypeScript**
- **ESLint**
- **prettier**
- **tailwindcss**
- **shadcn/ui**
- **react-router-dom**
- **react helmet**
- **react hook form**
- **zod**
- **sonner**
- **axios**
- **react query**

## backend
- **TypeScript** 
- **ESLint**
- **Fastify**
- **zod**
- **dotenv**
- **prisma**
- **bcryptjs**

## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] O usuário deve poder criar uma nova refeição;
- [] O usuário deve poder obter um resumo da sua dieta;
- [] O usuário deve poder listar todas as refeições que já cadastrou;
- [] O usuário deve poder visualizar uma refeição única;
- [] O usuário deve poder editar uma refeição já cadastrada por ele;
- [] O usuário deve poder excluir do resumo uma refeição já cadastrada por ele;
- [] O usuário deve poder filtrar as refeições por categorias (saudável, não saudável);
- [] O usuário deve poder buscar uma refeição por nome ou data;
- [] O usuário deve poder obter um gráfico com a porcentagem de refeições saudáveis e não saudáveis consumidas;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário só pode ver as refeições que ele mesmo cadastrou;
- [] O usuário só pode editar ou excluir as refeições que ele mesmo cadastrou;
- [] O sistema deve categorizar as refeições como "saudável" ou "não saudável" com base em critérios predefinidos;
- [] O sistema deve calcular automaticamente a quantidade de refeições saudáveis e não saudáveis para o resumo;
- [] A busca por refeições deve considerar apenas as refeições do usuário logado;
- [] O resumo da dieta deve ser atualizado em tempo real após a criação, edição ou exclusão de uma refeição;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [] O tempo de resposta ao listar as refeições deve ser inferior a X segundos (definir o tempo ideal);
- [] O sistema deve garantir a segurança dos dados alimentares cadastrados por cada usuário;
- [] O resumo e os gráficos devem ser gerados de forma otimizada, sem sobrecarregar o sistema;


docker compose up -d
docker compose stop
