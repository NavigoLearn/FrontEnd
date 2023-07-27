import { atom } from 'nanostores';

export type IAttachmentPageStatus = {
  isEditing: boolean;
};

type IAttachmentPageStatusAtom = {
  status: IAttachmentPageStatus;
};

const attachmentPageStatus = atom({
  status: {
    isEditing: false,
  },
} as IAttachmentPageStatusAtom);

export default attachmentPageStatus;
