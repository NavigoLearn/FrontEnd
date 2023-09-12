import { atom } from 'nanostores';

export type IEditorDisplayPageType =
  | 'components'
  | 'attachment'
  | 'operations'
  | 'properties'
  | 'nodes';

const editorDisplayManager = atom({
  // holds roadmap-data about the currently displayed page inside the editor
  page: 'components',
} as {
  page: IEditorDisplayPageType;
});

export default editorDisplayManager;
