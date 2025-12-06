export type FormState =
  | {
      title?: string;
      content?: string;
      errors?: {
        title?: string;
        content?: string;
        media?: string;
      };
    }
  | undefined;
