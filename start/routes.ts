import router from '@adonisjs/core/services/router'

router.get('/articles', '#controllers/articles_controller.index').as('articles.index')
router.get('/articles/:id', '#controllers/articles_controller.show').as('articles.show')
router.post('/articles', '#controllers/articles_controller.create').as('articles.create')
router.put('/articles/:id', '#controllers/articles_controller.update').as('articles.update')
router.delete('/articles/:id', '#controllers/articles_controller.destroy').as('articles.destroy')