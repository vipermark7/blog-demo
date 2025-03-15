import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(100),
    body: vine.string().trim().minLength(6).maxLength(10000)
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(100),
    body: vine.string().trim().minLength(6).maxLength(10000)
  })
)