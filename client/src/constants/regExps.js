export const AUTHOR_AND_TITLE_REGEXP = new RegExp(/^(?!.{20,})(?:\w+\W+){0,1}(?:\w+)$/);
export const TAGS_REGEXP = new RegExp('^\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*)(\s*,\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*))*\s*$');
export const MESSAGE_REGEXP = new RegExp(/[A-Za-z0-9]{2,500}/);