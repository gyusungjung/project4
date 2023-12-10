import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productRepository = new ProductsRepository();

  createProduct = async (title, description, userId) => {
    const createdProduct = await this.productRepository.createProduct(
      title,
      description,
      userId,
    );

    return {
      productId: createdProduct.productId,
      title: createdProduct.title,
      description: createdProduct.description,
      userId: createdProduct.userId,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };

  findAllProducts = async () => {
    const products = await this.productRepository.findAllProducts();
    console.log('서비스');
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return products.map((product) => {
      return {
        productId: product.productId,
        title: product.title,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  findOneProduct = async (productId) => {
    const product = await this.productRepository.findOneProduct(productId);

    //상품이 존재하지 않을때
    if (!product) throw new Error('상품을 찾을 수 없습니다');

    return {
      productId: product.productId,
      title: product.title,
      description: product.description,
      userNickname: product.Users.nickname,
      userId: product.Users.userId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  putProduct = async (productId, title, description, status, userId) => {
    const product = await this.productRepository.authProduct(productId);

    //상품이 존재하지 않을때
    if (!product) throw new Error('상품을 찾을 수 없습니다');

    //등록한 사용자와 일치하지 않을때
    if (product.userId !== userId) throw new Error('수정 권한이 없습니다.');

    const putProduct = await this.productRepository.putProduct(
      productId,
      title,
      description,
      status,
    );

    return putProduct;
  };

  deleteProduct = async (productId, userId) => {
    const product = await this.productRepository.findOneProduct(productId);

    if (!product) throw new Error('상품이 존재하지 않습니다');

    if (product.userId !== userId) throw new Error('삭제권한이 없습니다');

    await this.productRepository.deleteProduct(productId);
  };
}
