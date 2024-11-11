/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operações relacionadas aos usuarios do sistema
 *
 * definitions:
 *   userModeloLogin:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       senha:
 *         type: string
 *
 *   userModelo:
 *     type: object
 *     properties:
 *       telefone:
 *         type: string
 *       email:
 *         type: string        
 *       senha:
 *         type: string
 * 
 *   tokenModelo:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       token:
 *         type: string
 *
 * /user/login:
 *   put:
 *     tags:
 *       - User
 *     summary: Logar como Usuario.
 *     description: Verifica se o Usuario está no banco de dados e devolve o token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserModeloLogin'
 *     responses:
 *       200:
 *         description: Usuario logado com sucesso(retorna o token).
 *       401:
 *         description: Senha incorreta.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /user/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Deslogar como usuario.
 *     description: Verifica se o usuario está logado e remove o token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/tokenModelo'
 *     responses:
 *       200:
 *         description: Token removido com sucesso.
 *       403:
 *         description: Token não encontrado, não autorizado.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Registra um novo usuario.
 *     description: Registra um novo usuario no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/userModelo'
 *     responses:
 *       200:
 *         description: Usuario cadastrado com sucesso.
 *       500:
 *         description: Erro ao cadastrar o usuário.
 */
