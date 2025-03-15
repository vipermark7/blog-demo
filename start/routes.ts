import router from '@adonisjs/core/services/router'

router.get('/articles', '#controllers/articles_controller.index').as('articles.index')
router.get('/articles/create', '#controllers/articles_controller.create').as('articles.create')
router.post('/articles', '#controllers/articles_controller.store').as('articles.store')
router.get('/articles/:id', '#controllers/articles_controller.show').as('articles.show')
router.get('/articles/:id/edit', '#controllers/articles_controller.edit').as('articles.edit')
router.put('/articles/:id', '#controllers/articles_controller.update').as('articles.update')
router.delete('/articles/:id', '#controllers/articles_controller.destroy').as('articles.destroy')