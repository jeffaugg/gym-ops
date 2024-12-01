class AppError extends Error{
  public message: string;

  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Definir o nome da classe como nome do erro
  }
}

export default AppError;
