export interface IFotosRepository {
  create(url: string, avaliacao_id: number): Promise<string>;
  findByAvaliacaoId(avaliacao_id: number): Promise<string[]>;
  updatePhotos(avaliacao_id: number, fotos: string[]): Promise<string[]>;
}
