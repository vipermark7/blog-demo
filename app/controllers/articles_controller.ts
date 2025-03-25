import Article from '#models/article'
import { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  async index({ view, response, logger }: HttpContext) {
    const articles = await Article.all()
    logger.info(response.json)
    return view.render('posts/index', { articles })
  }

  async show({ params, view, response, logger }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      return view.render('posts/show', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  }

  async edit({ params, view, response, logger }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      return view.render('posts/edit', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  } 
  async create({ view }: HttpContext) {
    return view.render('posts/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, logger }: HttpContext) {
    const data = request.only(['title', 'body'])

    try {
      const article = await Article.create(data)
      console.log(article)
      return response.redirect().toRoute('posts.index')
    } catch (error) {
      logger.error(error.message)
      return response.redirect().back()
    }
  }

  async update({ params, request, response, logger }: HttpContext) {
    const data = request.only(['title', 'body'])

    try {
      const article = await Article.findOrFail(params.id)
      article.merge(data)
      await article.save()
      logger.log("info", "articles.update")
      logger.info(response.json)
      return response.redirect().toRoute('posts.show', [article.id])
    } catch (error) {
      logger.error(error.message)
      return response.redirect().back()
    }
  }

  async destroy({ params, response, logger }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      logger.info(`ARTICLES_CONTROLLER_DESTROY`)
      logger.info(params.id)
      logger.info(article.toJSON)
      await article.delete()

      return response.redirect().toRoute('posts.index')

    } catch (error) {
      logger.error(error.message)
    }
  }
}