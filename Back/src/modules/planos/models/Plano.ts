class Plano {
  id: number;
  name: string;
  price: number;
  duration: string;
  spots: number;
  constructor(
    id: number,
    name: string,
    price: number,
    duration: string,
    spots: number,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.spots = spots;
  }
}

export default Plano;
