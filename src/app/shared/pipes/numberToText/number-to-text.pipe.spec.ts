import { NumberToTextPipe } from './number-to-text.pipe';

describe('NumberToTextPipe', () => {
  let pipe: NumberToTextPipe;

  beforeEach(() => {
    pipe = new NumberToTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert hundreds correctly', () => {
    expect(pipe.transform(100)).toBe('cien pesos');
    expect(pipe.transform(200)).toBe('doscientos pesos');
    expect(pipe.transform(999)).toBe('novecientos noventa y nueve pesos');
  });

  it('should return "Valor no válido" for invalid inputs', () => {
    expect(pipe.transform('abc')).toBe('Valor no válido');
    expect(pipe.transform('')).toBe('Valor no válido');
    expect(pipe.transform(NaN)).toBe('Valor no válido');
  });

});
