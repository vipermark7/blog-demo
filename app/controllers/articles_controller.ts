import Article from '#models/article'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class ArticlesController {
  /**
   * Display a list of articles
   */
  async index({ view, response, logger }: HttpContext) {
    const articles = await Article.all()
    logger.info(response.json)
    return view.render('articles/index', { articles })
  }

  /**
   * Show form to create a new article
   */
  async create({ view }: HttpContext) {
    return view.render('posts/create')
  }

  /**
   * Show individual article
   */
  async show({ params, view, response }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      return view.render('posts/show', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index.edge').withFlash({
        error: 'Article not found'
      })
    }
  }

  /**
   * Show form to edit an article
   */
  async edit({ params, view, response }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      return view.render('posts/edit', { article })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('articles.index').withFlash({
        error: 'Article not found'
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'body'])

    try {
      await Article.create(data)
      return response.redirect().toRoute('posts.index')
    } catch (error) {
      logger.error(error.message)
      return response.redirect().back()
    }
  }

  /**
   * Update an existing article
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['title', 'body'])

    try {
      const article = await Article.findOrFail(params.id)
      article.merge(data)
      await article.save()

      return response.redirect().toRoute('posts.show', [article.id]).withFlash({
        success: 'Article updated successfully'
      })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().back().withFlash({
        error: 'Failed to update article',
        input: request.all()
      })
    }
  }

  /**
   * Delete an article
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      await article.delete()

      return response.redirect().toRoute('posts.index').withFlash({
        success: 'Article deleted successfully'
      })
    } catch (error) {
      logger.error(error.message)
      return response.redirect().toRoute('posts.index').withFlash({
        error: 'Failed to delete article'
      })
    }
  }
}