import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const router = express.Router();
const productsController = new ProductsController();

// 상품 생성 API
router.post(
  '/',
  authMiddleware,
  (req, res, next) => {
    console.log('Products GET route hit');
    next();
  },
  productsController.createProduct,
);

// 상품 조회 API
router.get('/', productsController.getAllProducts);

//상품 상세 조회API
router.get('/:productId', productsController.getOneProduct);

//상품 수정 API
router.put('/:productId', authMiddleware, productsController.putProduct);

//상품 삭제 API
router.delete('/:productId', authMiddleware, productsController.deleteProduct);
export default router;
