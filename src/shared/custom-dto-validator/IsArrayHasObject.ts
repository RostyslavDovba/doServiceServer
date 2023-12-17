import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArrayHasObject(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayHasObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          return value.every(
            (item) => typeof item === 'object' && !Array.isArray(item),
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Each item in $property must be an object';
        },
      },
    });
  };
}
