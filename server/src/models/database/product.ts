interface ProductDB {
  id: string;
  sku: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  photoURL: string;
}

const mockProducts: ProductDB[] = [
  {
    id: "1",
    name: "Nike Trainers",
    sku: "NIKE",
    price: 99.99,
    currency: "GBP",
    description:
      "These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    photoURL:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c24ddc33-6e38-4cc9-b548-dc48cd3528ea/alphafly-2-road-racing-shoes-fvDSdT.png",
  },
  {
    id: "2",
    name: "Adidas Trainers",
    sku: "ADIDAS",
    price: 89.99,
    currency: "GBP",
    description:
      "These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    photoURL:
      "https://data.sneakers76.com/images/galleries/6334/GY7437_1_FOOTWEAR_Photography_Side-Lateral-Center-View_white.jpg",
  },
  {
    id: "3",
    name: "New Balance Trainers",
    sku: "NB",
    price: 79.99,
    currency: "GBP",
    description:
      "These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    photoURL:
      "https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
  },
  {
    id: "4",
    name: "Asics Trainers",
    sku: "ASICS",
    price: 69.99,
    currency: "GBP",
    description:
      "These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    photoURL:
      "https://www.sportsdirect.com/images/marketing/asics/1012B047-402-sr-rt-glb.jpg",
  },
  {
    id: "5",
    name: "Brooks Trainers",
    sku: "BROOKS",
    price: 59.99,
    currency: "GBP",
    description:
      "These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    photoURL:
      "https://www.runnersneed.com/content/dam/runnersneed/brands/brooks/ss21/-BROOKS-BRAND-PAGE-SECONDARY-HERO-02-2048X600PX@2x.jpg/jcr:content/renditions/cq5dam.web.480.480@2x.jpeg",
  },
];

const insert = (productToInsert: Omit<ProductDB, "id">): ProductDB => {
  const product = {
    id: `${mockProducts.length + 1}`,
    ...productToInsert,
  };
  mockProducts.push(product);

  return product;
};

const findAll = () => mockProducts;

const findById = (productId: ProductDB["id"]) =>
  mockProducts.find((mockProduct) => mockProduct.id === productId);

export { ProductDB, findAll, findById, insert };
