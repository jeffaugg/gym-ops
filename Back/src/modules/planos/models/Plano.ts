class Plano {
  id: number;
  name: string;
  price: number;
  duration: string;
  constructor(id: number, name: string, price: number, duration: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
  }
}

export default Plano;
