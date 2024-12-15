export class Mensagem {
  id: number;
  id_adm: number;
  title: string;
  body: string;
  recipient_type: string;
  created_at: Date;

  constructor(
    id: number,
    id_adm: number,
    title: string,
    body: string,
    recipient_type: string,
    created_at: Date,
  ) {
    this.id = id;
    this.id_adm = id_adm;
    this.title = title;
    this.body = body;
    this.recipient_type = recipient_type;
    this.created_at = created_at;
  }

  static fromDatabase(data: any): Mensagem {
    return new Mensagem(
      data.id,
      data.id_adm,
      data.title,
      data.body,
      data.recipient_type,
      new Date(data.created_at),
    );
  }
}
