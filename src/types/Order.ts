import { type Product } from "@prisma/client";

export type CreateOrderInput = Omit<Order, "createdAt" | "id" | "items" | "status" | "updatedAt"> & {
    items: CreateOrderItem[];
  };
export type CreateOrderItem = {
    productId: string;
    quantity: number;
  };;
export interface ExtendedOrderItem extends Omit<OrderItem, 'price'> {
  product: Product;
}
export interface Order {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  payment: string;
  comment?: null | string;
  locationId?: null | string;
  restaurantId?: null | string;
  status: string;
  items: OrderItem[];
};
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
}
export interface OrderWithExtendedItems extends Order {
  createdAt: Date;
  updatedAt: Date;
  items: ExtendedOrderItem[];
}
