class Plano {
  id: number;
  name: string;
  price: number;
  duration: number;
  spots: number;

  constructor(
    id: number,
    name: string,
    price: number,
    duration: number,
    spots: number,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.spots = spots;
  }

  static FormData(data: any) {
    return new Plano(data.id, data.name, data.price, data.duration, data.spots);
  }
}

export default Plano;
