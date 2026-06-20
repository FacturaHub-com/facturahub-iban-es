// facturahub-iban-es — Validar y formatear IBAN español (y cualquier IBAN). 0 dependencias.
// Validate and format Spanish IBANs using the standard mod-97 checksum.

/** Mayúsculas y sin espacios. */
export function normalize(iban: string): string {
  return (iban || '').toUpperCase().replace(/\s+/g, '');
}

/** Formatea en grupos de 4: ES91 2100 0418 4502 0005 1332. */
export function format(iban: string): string {
  return normalize(iban).replace(/(.{4})/g, '$1 ').trim();
}

/** Checksum mod-97 (ISO 13616). Válido si el resto es 1. */
function mod97(iban: string): number {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  // Proceso por bloques para evitar overflow de Number.
  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    remainder = parseInt(String(remainder) + numeric.slice(i, i + 7), 10) % 97;
  }
  return remainder;
}

/** Valida cualquier IBAN (formato + checksum mod-97). */
export function isValidIBAN(iban: string): boolean {
  const v = normalize(iban);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(v)) return false;
  return mod97(v) === 1;
}

/** Valida un IBAN español: empieza por ES, 24 caracteres y checksum correcto. */
export function isValidSpanishIBAN(iban: string): boolean {
  const v = normalize(iban);
  if (!/^ES\d{22}$/.test(v)) return false;
  return mod97(v) === 1;
}

export interface SpanishIBAN {
  country: string;
  checkDigits: string;
  /** Código de entidad (4 dígitos). */
  bankCode: string;
  /** Código de oficina/sucursal (4 dígitos). */
  branchCode: string;
  /** Dígitos de control de la cuenta (2 dígitos). */
  accountControl: string;
  /** Número de cuenta (10 dígitos). */
  accountNumber: string;
}

/** Desglosa un IBAN español en sus partes. Devuelve null si no es válido. */
export function parseSpanishIBAN(iban: string): SpanishIBAN | null {
  const v = normalize(iban);
  if (!isValidSpanishIBAN(v)) return null;
  return {
    country: v.slice(0, 2),
    checkDigits: v.slice(2, 4),
    bankCode: v.slice(4, 8),
    branchCode: v.slice(8, 12),
    accountControl: v.slice(12, 14),
    accountNumber: v.slice(14, 24),
  };
}
