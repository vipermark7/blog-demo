import Article from '#models/article'
import { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  async index({ view, request, logger }: HttpContext) {
    logger.info(request.url(true))
    const articles = await Article.all()
    return view.render('posts/index', { articles })
  }

  async show({ params, view, request, response, logger }: HttpContext) {
    try {
      logger.info(request.url(true))
      const article = await Article.findOrFail(params.id)
      return view.render('posts/show', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  }
  /**
   * Render the form to edit an existing post by its id.
   */
  async edit({ params, view, request, response, logger }: HttpContext) {
    try {
      logger.info(request.url(true))
      const article = await Article.findOrFail(params.id)
      return view.render('posts/edit', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  }

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request, response, logger }: HttpContext) {
    const data = request.only(['title', 'body'])

    try {
      logger.info(request.url(true))
      const article = await Article.findOrFail(params.id)
      article.merge(data)
      await article.save()
      return response.redirect().toRoute('articles.index')
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  }

  async create({ view, request, response, logger }: HttpContext) {
    try {
      logger.info(request.url(true))
      return view.render('posts/create')
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index')
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, logger }: HttpContext) {
    logger.info(request.url(true))
    const data = request.only(['title', 'body'])

    try {
      await Article.create(data)
      return response.redirect().toRoute('posts.index')
    } catch (error) {
      logger.error(error.message)
      return response.redirect().back()
    }
  }

  async destroy({ params, request, response, logger }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      logger.info(request.url(true))
      await article.delete()
      return response.redirect().back()

    } catch (error) {
      logger.error(error.message)
      return error
    }
  }
}