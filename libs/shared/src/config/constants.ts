export namespace constants {
  export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

  export const STATUTE = 'statute';
  export const GENDERS = ['male', 'female', 'other'];
  export const DEFAULT_ORDER_ASC = [['updatedAt', 'ASC']];
  export const SEQUENCE_ORDER_ASC = [['sequence', 'ASC']];
  export const SEQUENCE_ORDER_DESC = { order: { sequence: 'DESC' } };
  export const LAST_ITEMS_ATTRIBUTES = { include: ['sequence', 'createdAt'] };

  export const QUEUE_CREATE_COUNTRY= 'createCountry';
  export const CREATE_COUNTRY= 'create-Country';

  export const EXCHANGE_WORKER = 'worker';

}
