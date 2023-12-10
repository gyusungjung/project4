import { ProductsService } from '../services/products.service.js';

/**products의 컨트롤러 역할 클래스 */
export class ProductsController {
  productsService = new ProductsService();

  //상품 생성API
  createProduct = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const userId = res.locals.user.userId;
      console.log('컨트롤계층' + res.locals.user);
      const CreatedProduct = await this.productsService.createProduct(
        title,
        description,
        userId,
      );
      return res.status(201).json({ data: CreatedProduct });
    } catch (err) {
      next(err);
    }
  };

  //상품 조회API
  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();
      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };

  //상품 상세조회API
  getOneProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.findOneProduct(
        Number(productId),
      );

      return res.status(200).json({ data: product });
    } catch (err) {
      next(err);
    }
  };

  //상품 수정API
  putProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, description, status } = req.body;
      const { userId } = res.locals.user;

      const product = await this.productsService.putProduct(
        Number(productId),
        title,
        description,
        status,
        userId,
      );

      return res.status(200).json({ data: product });
    } catch (err) {
      next(err);
    }
  };

  //상품 삭제API
  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { userId } = res.locals.user;

      const product = await this.productsService.deleteProduct(
        Number(productId),
        userId,
      );

      return res
        .status(200)
        .json({ message: '상품이 삭제되었습니다', data: product });
    } catch (err) {
      next(err);
    }
  };
}
