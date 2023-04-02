import { Order } from '../../../../domain/models/logistics/order';
export interface CheckProductAvailabilityRepository { 
  checkAvailability(data: Order[]): Promise<boolean>
}