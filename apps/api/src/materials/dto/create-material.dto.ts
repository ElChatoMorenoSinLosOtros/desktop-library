export default class CreateMaterialDto {
  title?: string;

  author?: string;

  category?: string;

  isbn?: string;

  publicationYear?: number;

  pageCount?: number;

  quantity?: number;

  available?: boolean;

  type_material: string;
}
