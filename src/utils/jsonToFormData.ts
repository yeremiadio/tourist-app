import { buildFormData } from "./buildFormData";

export function jsonToFormData(data: any[]) {
  const formData = new FormData();
  buildFormData(formData, data, "");
  return formData;
}
