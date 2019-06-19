export interface OrderInterface {
  id: number;
  total: number;
  paid: boolean;
  sent: boolean;
  createdAt: string;
  elements: number;
}
