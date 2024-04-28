const Joi = require('Joi');

const userValidator = Joi.object({
    id: Joi.number().integer(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    vendor: Joi.number().integer().min(0).max(1).required(),
    phone: Joi.string().min(7).max(20),
    email: Joi.string().min(7).max(50),
    addres: Joi.string().min(5).max(100),
    passwordHash: Joi.string().required(),
    registeredAt: Joi.date()
})

const productValidator = Joi.object({
    id: Joi.number().integer(),
    userId: Joi.number().integer().required(),
    title: Joi.string().min(1).max(75).required(),
    metaTitle: Joi.string().min(1).max(100),
    slug: Joi.string().min(1).max(100).required(),
    summary: Joi.string(),
    type: Joi.number().integer().max(6).min(0).required(),
    price: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    discount: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    quantity: Joi.number().integer().min(0).required(),
    forSale: Joi.number().integer().min(0).max(1).required(),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    publishedAt: Joi.date(),
    saleStartsAt: Joi.date(),
    saleEndsAt: Joi.date(),
    context: Joi.string()
})

const productMetaValidator = Joi.object({
    id: Joi.number().integer(),
    productId: Joi.number().integer().required(),
    content: Joi.string()
})

const categoryValidator = Joi.object({
    id: Joi.number().integer(),
    parentId: Joi.number().integer(),
    title: Joi.string().min(1).max(75).required(),
    metaTitle: Joi.string().min(1).max(100),
    slug: Joi.string().min(1).max(75).required(),
    content: Joi.string()
})

const productCategoryValidator = Joi.object({
    id: Joi.number().integer(),
    productId: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required()
})

const ratingValidator = Joi.object({
    id: Joi.number().integer(),
    productId: Joi.number().integer().required(),
    parentId: Joi.number().integer(),
    title: Joi.string().min(1).max(75),
    ratingValue: Joi.number().integer().min(0).max(5),
    published: Joi.number().integer().min(0).max(1),
    createdTime: Joi.date(),
    publishedAt: Joi.date(),
    content: Joi.string()
})

const cartValidator = Joi.object({
    id: Joi.number().integer(),
    userId: Joi.number().integer().required(),
    sessionId: Joi.string().max(100),
    token: Joi.string().max(100),
    status: Joi.number().integer().min(0).max(5),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    content: Joi.string()
})

const cartItemValidator = Joi.object({
    id: Joi.number().integer(),
    productId: Joi.number().integer(),
    cartId: Joi.number().integer(),
    price: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    discount: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    quantity: Joi.number().integer().min(1),
    active: Joi.number().integer().min(0).max(1),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    content: Joi.string()

})

const orderValidator = Joi.object({
    id: Joi.number().integer(),
    userId: Joi.number().integer().required(),
    sessionId: Joi.string().max(100).required(),
    token: Joi.string().max(100).required(),
    status: Joi.number().integer().min(0).max(5).required(),
    subTotal: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    itemDiscount: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    tax: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    shipping: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    total: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    promo: Joi.string().min(1),
    discount: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    grandTotal: Joi.string().regex(/\d{1,2}[\,\.]{1}/),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    content: Joi.string()
})

const orderItemValidator = Joi.object({
    id: Joi.number().integer(),
    productId: Joi.number().integer().required(),
    orderId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    content: Joi.string()
})

const transactionValidator = Joi.object({
    id: Joi.number().integer(),
    userId: Joi.number().integer().required(),
    orderId: Joi.number().integer().required(),
    code: Joi.string().min(1).max(100).required(),
    type: Joi.number().integer().min(0).max(5).required(),
    mode: Joi.number().integer().min(0).max(5).required(),
    status: Joi.number().integer().min(0).max(5).required(),
    createdTime: Joi.date(),
    updatedTime: Joi.date(),
    content: Joi.string()
})

module.exports = {
    userValidator,
    productValidator,
    productMetaValidator,
    categoryValidator,
    productCategoryValidator,
    ratingValidator,
    cartValidator,
    cartItemValidator,
    orderValidator,
    orderItemValidator,
    transactionValidator
}