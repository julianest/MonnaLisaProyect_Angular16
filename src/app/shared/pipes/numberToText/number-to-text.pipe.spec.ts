import { NumberToTextPipe } from './number-to-text.pipe';

describe('NumberToTextPipe', () => {
  let pipe: NumberToTextPipe;

  beforeEach(() => {
    pipe = new NumberToTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert small numbers correctly', () => {
    expect(pipe.transform(1)).toBe('uno pesos');
    expect(pipe.transform(10)).toBe('diez pesos');
    expect(pipe.transform(15)).toBe('quince pesos');
    expect(pipe.transform(21)).toBe('veinte y uno pesos');
  });

  it('should convert numbers with decimals', () => {
    expect(pipe.transform(1.5)).toBe('uno pesos con 50/100');
    expect(pipe.transform(100.75)).toBe('cien pesos con 75/100');
  });

  it('should convert hundreds correctly', () => {
    expect(pipe.transform(100)).toBe('cien pesos');
    expect(pipe.transform(200)).toBe('doscientos pesos');
    expect(pipe.transform(999)).toBe('novecientos noventa y nueve pesos');
  });

  it('should convert thousands correctly', () => {
    expect(pipe.transform(1000)).toBe('mil pesos');
    expect(pipe.transform(2500)).toBe('dos mil quinientos pesos');
    expect(pipe.transform(999999)).toBe('novecientos noventa y nueve mil novecientos noventa y nueve pesos');
  });

  it('should convert millions correctly', () => {
    expect(pipe.transform(1_000_000)).toBe('un millón pesos');
    expect(pipe.transform(2_000_000)).toBe('dos millones pesos');
    expect(pipe.transform(5_400_120)).toBe('cinco millones, cuatrocientos mil ciento veinte pesos');
  });

  it('should convert strings with numbers', () => {
    expect(pipe.transform('3')).toBe('tres pesos');
    expect(pipe.transform('2.50')).toBe('dos pesos con 50/100');
    expect(pipe.transform('$1,000.99')).toBe('mil pesos con 99/100');
  });

  it('should return "Valor no válido" for invalid inputs', () => {
    expect(pipe.transform('abc')).toBe('Valor no válido');
    expect(pipe.transform('')).toBe('Valor no válido');
    expect(pipe.transform(NaN)).toBe('Valor no válido');
  });

  it('should handle negative numbers', () => {
    expect(pipe.transform(-5)).toBe('Valor no válido');
    expect(pipe.transform('-200')).toBe('Valor no válido');
  });
});