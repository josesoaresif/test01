import { EventDefinition, EventType } from "../interfaces/EventDefinition";

export const Event = (type: EventType, selector: string, dynamic?: string): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (! Reflect.hasMetadata('events', target.constructor)) {
      Reflect.defineMetadata('events', [], target.constructor);
    }
    const events = Reflect.getMetadata('events', target.constructor) as Array<EventDefinition>;
    events.push({
      type: type,
      element: selector,
      methodName: propertyKey,
      dynamic: dynamic,
    });
    Reflect.defineMetadata('events', events, target.constructor);
  };
};
  
