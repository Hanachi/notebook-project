export const AUTHOR_AND_TITLE_REGEXP = new RegExp(/^(?!.{20,})(?:\w+\W+){0,1}(?:\w+)$/);
export const TAGS_REGEXP = new RegExp('^\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*)(\s*,\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*))*\s*$');
export const MESSAGE_REGEXP = new RegExp(/[A-Za-z0-9]{2,500}/);

export const FIRSTNAME_AND_LASTNAME_REGEXP = new RegExp(/^(?:\w+){2,20}$/);
export const EMAIL_REGEXP = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const PASSWORD_REGEXP = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
export const PHONENUMBER_REGEXP = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);