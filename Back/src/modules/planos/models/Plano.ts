class Plano {
  id: number;
  name: string;
  price: number;
  duration: number;
  constructor(id: number, name: string, price: number, duration: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
  }

  static FormData(data: any) {
    return new Plano(data.id, data.name, data.price, data.duration);
  }
}

export default Plano;
