import React from 'react';
import AddTemplateButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/templates/AddTemplateButton';
import SearchTemplate from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/templates/SearchTemplate';
import Template from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/templates/Template';
import { getRoadmapTemplatesArray } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { mutateTemplateName } from '@src/typescript/roadmap_ref/node/templates-system/template-data-mutation';
import {
  getSearchQuery,
  triggerRerenderOperations,
} from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';
import { deleteTemplate } from '@src/typescript/roadmap_ref/roadmap-data/services/delete';

const TemplatesSystem = () => {
  const templates = getRoadmapTemplatesArray();
  const value = getSearchQuery();

  return (
    <div>
      <div className='flex gap-10 items-center'>
        <h1 className='text-secondary text-darkBlue font-normal text-lg   '>
          Templates
        </h1>
        <AddTemplateButton />
      </div>
      <div className='mt-6 '>
        <SearchTemplate />
      </div>
      <div className='flex flex-col pt-4'>
        {templates
          .filter((template) => {
            return template.name.toLowerCase().includes(value.toLowerCase());
          })
          .map(({ name, id }) => {
            return (
              <Template
                key={id}
                name={name}
                onNameChange={(newName: string) => {
                  mutateTemplateName(id, newName);
                  triggerRerenderOperations();
                }}
                onTemplateDelete={() => {
                  deleteTemplate(id);
                  triggerRerenderOperations();
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TemplatesSystem;
