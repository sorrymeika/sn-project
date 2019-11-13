module.exports = app => {
    const { router, controller } = app;

    /** ********************************************************************
     * 后台接口
     ** ********************************************************************/

    // 系统类目
    router.post('/category/listCateByPid', controller.category.listCateByPid);
    router.post('/category/add', controller.category.addCate);
    router.post('/category/update', controller.category.updateCate);

    router.post('/category/listSpuPropDefinitions', controller.category.listSpuPropDefinitions);
    router.post('/category/addSpuPropDefinition', controller.category.addSpuPropDefinition);
    router.post('/category/updateSpuPropDefinition', controller.category.updateSpuPropDefinition);

    // 品牌
    router.post('/brand/query', controller.brand.queryBrands);
    router.post('/brand/getById', controller.brand.getBrandById);
    router.post('/brand/add', controller.brand.addBrand);
    router.post('/brand/update', controller.brand.updateBrand);

    // 商品
    router.post('/product/listSpuTypes', controller.product.listSpuTypes);
    router.post('/product/getSpusByIds', controller.product.getSpusByIds);
    router.post('/product/listSpu', controller.product.listSpu);

    router.post('/product/getSpuById', controller.product.getSpuById);
    router.post('/product/addSpu', controller.product.addSpu);
    router.post('/product/updateSpu', controller.product.updateSpu);

    router.post('/product/addSku', controller.product.addSku);
    router.post('/product/updateSku', controller.product.updateSku);

    // 选品规则
    router.post('/formula/list', controller.formula.listFormula);
    router.post('/formula/getById', controller.formula.getFormulaById);
    router.post('/formula/add', controller.formula.addFormula);
    router.post('/formula/update', controller.formula.updateFormula);

    // 订单管理
    router.post('/admin/order/queryOrders', controller.admin.order.queryOrders);
    router.post('/admin/order/getSellerOrderById', controller.admin.order.getSellerOrderById);
    router.post('/admin/order/batchSendOut', controller.admin.order.batchSendOut);

    // 仓库管理
    router.post('/admin/warehouse/queryWarehouses', controller.admin.warehouse.queryWarehouses);
    router.post('/admin/warehouse/add', controller.admin.warehouse.addWarehouse);
    router.post('/admin/warehouse/getById', controller.admin.warehouse.getWarehouseById);
    router.post('/admin/warehouse/update', controller.admin.warehouse.updateWarehouse);

    /** ********************************************************************
     * 公共接口
     ** ********************************************************************/

    // 商品
    router.post('/product/listAllSkusBySpuId', controller.product.listAllSkusBySpuId);

    // 搜索
    router.post('/search/searchByFormula', controller.search.searchByFormula);


    /** ********************************************************************
     * 前台接口
     ** ********************************************************************/

    // 商品
    router.post('/product/getProductById', controller.product.getProductById);
    router.post('/product/getDetailById', controller.product.getDetailById);

    // 购物车
    router.post('/cart/countCartTotalNum', controller.cart.countCartTotalNum);
    router.post('/cart/listUserCart', controller.cart.listUserCart);
    router.post('/cart/addSkuToCart', controller.cart.addSkuToCart);
    router.post('/cart/updateCartNum', controller.cart.updateCartNum);
    router.post('/cart/updateCartSelected', controller.cart.updateCartSelected);
    router.post('/cart/updateSelectedByCartIds', controller.cart.updateSelectedByCartIds);
    router.post('/cart/updateAllSelected', controller.cart.updateAllSelected);

    // 订单
    router.post('/order/getOrderBySkus', controller.order.getOrderBySkus);
    router.post('/order/listOrder', controller.order.listOrder);
    router.post('/order/getOrderById', controller.order.getOrderById);
    router.post('/order/getSellerOrderById', controller.order.getSellerOrderById);
    router.post('/order/createOrder', controller.order.createOrder);
    router.post('/order/cancelOrder', controller.order.cancelOrder);
    router.post('/order/simulatePay', controller.order.simulatePay);
};