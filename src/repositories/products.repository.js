import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  createProduct = async (title, description, userId) => {
    const createdProduct = await prisma.products.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return createdProduct;
  };

  findAllProducts = async () => {
    const products = await prisma.products.findMany();
    console.log('리파지토리');
    return products;
  };

  findOneProduct = async (productId) => {
    const product = await prisma.products.findUnique({
      where: { productId },
      include: {
        Users: {
          select: {
            userId: true,
            nickname: true, // 사용자의 닉네임만 선택적으로 가져오기
          },
        },
      },
    });
    return product;
  };

  authProduct = async (productId) => {
    const authProduct = await prisma.products.findUnique({
      where: { productId },
    });
    return authProduct;
  };

  putProduct = async (productId, title, description, status) => {
    const putProduct = await prisma.products.update({
      where: { productId },
      data: {
        title,
        description,
        status,
      },
    });
    return putProduct;
  };

  deleteProduct = async (productId) => {
    const deletedProduct = await prisma.products.delete({
      where: { productId },
    });
  };
}
