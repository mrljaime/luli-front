export interface OrderInterface {
  id: number;
  total: number;
  interest: number;
  paid: boolean;
  sent: boolean;
  closed: boolean;
  createdAt: string;
  elements: number;
}
