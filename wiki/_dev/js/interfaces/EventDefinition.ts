export type EventType = 'click'|'change'|'focus';

export interface EventDefinition {
  type: EventType;
  element: string;
  dynamic: string | null;
  methodName: any;
}