/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Operações relacionadas a administradores do sistema
 *
 * definitions:
 *   adminModelo:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       senha:
 *         type: string
 *       
 *
 *   tokenModelo:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       token:
 *         type: string
 *
 * /admin/login:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Logar como admin.
 *     description: Verifica se o admin está no banco de dados e devolve o token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/adminModelo'
 *     responses:
 *       200:
 *         description: Administrador logado com sucesso(retorna o token).
 *       401:
 *         description: Senha incorreta.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /admin/token:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Token de acesso.
 *     description: Verifica se token de acesso está correto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/tokenModelo'
 *     responses:
 *       200:
 *         description: Token correto.
 *       403:
 *         description: Token incorreto.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /admin/logout:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Deslogar como admin.
 *     description: Verifica se o admin está logado e remove o token.
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
 *  
 */
