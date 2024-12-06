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
- [x] O usuário deve poder criar uma nova refeição;
- [x] O usuário deve poder listar todas as refeições que já cadastrou;
- [x] O usuário deve poder visualizar uma refeição única;
- [x] O usuário deve poder obter um resumo com grafico da sua dieta;
- [x] O usuário deve poder excluir do resumo uma refeição já cadastrada por ele;
- [x] O usuário deve poder obter um gráfico com a porcentagem de refeições saudáveis e não saudáveis consumidas;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário só pode ver as refeições que ele mesmo cadastrou;
- [x] O sistema deve calcular automaticamente a quantidade de refeições saudáveis e não saudáveis para o resumo;
- [x] O resumo da dieta deve ser atualizado em tempo real após a criação, edição ou exclusão de uma refeição;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;


docker compose up -d
docker compose stop
