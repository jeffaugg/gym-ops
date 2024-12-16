export class Pagamento {
  id: number;
  id_aluno: number;
  id_plano: number;
  status: boolean;
  payment: string;
  payment_date: Date;
  expiration_date: Date;

  constructor(
    id: number,
    id_aluno: number,
    id_plano: number,
    status: boolean,
    payment: string,
    payment_date: Date,
    expiration_date: Date,
  ) {
    this.id = id;
    this.id_aluno = id_aluno;
    this.id_plano = id_plano;
    this.status = status;
    this.payment = payment;
    this.payment_date = payment_date;
    this.expiration_date = expiration_date;
  }

  static fromDatabase(data: any): Pagamento {
    return new Pagamento(
      data.id,
      data.id_aluno,
      data.id_plano,
      data.status,
      data.payment,
      data.payment_date,
      data.expiration_date,
    );
  }
}
