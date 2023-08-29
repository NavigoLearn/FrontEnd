import { getTemplateById } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export const mutateTemplateName = (templateId: string, newName: string) => {
  const template = getTemplateById(templateId);
  template.name = newName;
};
