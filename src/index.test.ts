import { describe, it, expect } from 'vitest';
import { isValidIBAN, isValidSpanishIBAN, format, normalize, parseSpanishIBAN } from './index';

// IBAN español de ejemplo (válido por checksum).
const ES = 'ES9121000418450200051332';

describe('isValidSpanishIBAN', () => {
  it('acepta uno válido (con y sin espacios)', () => {
    expect(isValidSpanishIBAN(ES)).toBe(true);
    expect(isValidSpanishIBAN('ES91 2100 0418 4502 0005 1332')).toBe(true);
  });
  it('rechaza checksum incorrecto', () => {
    expect(isValidSpanishIBAN('ES9921000418450200051332')).toBe(false);
  });
  it('rechaza longitud incorrecta o no-ES', () => {
    expect(isValidSpanishIBAN('ES911234')).toBe(false);
    expect(isValidSpanishIBAN('DE89370400440532013000')).toBe(false);
  });
});

describe('isValidIBAN (cualquier país)', () => {
  it('acepta IBAN alemán válido', () => {
    expect(isValidIBAN('DE89 3704 0044 0532 0130 00')).toBe(true);
  });
  it('acepta el español', () => {
    expect(isValidIBAN(ES)).toBe(true);
  });
  it('rechaza basura', () => {
    expect(isValidIBAN('hola')).toBe(false);
    expect(isValidIBAN('')).toBe(false);
  });
});

describe('format / normalize', () => {
  it('agrupa de 4 en 4', () => {
    expect(format(ES)).toBe('ES91 2100 0418 4502 0005 1332');
  });
  it('normaliza', () => {
    expect(normalize(' es91 2100 ')).toBe('ES912100');
  });
});

describe('parseSpanishIBAN', () => {
  it('desglosa las partes', () => {
    expect(parseSpanishIBAN(ES)).toEqual({
      country: 'ES', checkDigits: '91', bankCode: '2100',
      branchCode: '0418', accountControl: '45', accountNumber: '0200051332',
    });
  });
  it('null si no es válido', () => {
    expect(parseSpanishIBAN('ES00')).toBeNull();
  });
});
