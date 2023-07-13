export type IColorSchemaFields = {
  primary: string;
  secondary: string;
};

export type IColorSchemas = {
  default: IColorSchemaFields;
  version2: IColorSchemaFields;
};

export type IColorSchemaOptions = 'default' | 'version2';
