# @facturahub/iban-es

**Parte del ecosistema [FacturaHub](https://facturahub.com?utm_source=github&utm_medium=referral&utm_campaign=iban-es)** — facturación en España, **Verifactu**, **IVA**, **Modelo 303** y automatización fiscal con IA.

> Valida y formatea **IBAN español** (checksum mod-97) — y cualquier IBAN. TypeScript · 0 dependencias · MIT.

## Instalación

```bash
npm i @facturahub/iban-es
```

## Uso

```ts
import { isValidSpanishIBAN, format, parseSpanishIBAN } from '@facturahub/iban-es';

isValidSpanishIBAN('ES91 2100 0418 4502 0005 1332'); // true
format('ES9121000418450200051332');                  // 'ES91 2100 0418 4502 0005 1332'

parseSpanishIBAN('ES9121000418450200051332');
// { country:'ES', checkDigits:'91', bankCode:'2100', branchCode:'0418',
//   accountControl:'45', accountNumber:'0200051332' }
```

## API

| Función | Qué hace |
|---|---|
| `isValidIBAN(iban)` | Valida cualquier IBAN (mod-97) |
| `isValidSpanishIBAN(iban)` | Valida IBAN español (ES + 24 chars + mod-97) |
| `format(iban)` | Agrupa en bloques de 4 |
| `normalize(iban)` | Mayúsculas, sin espacios |
| `parseSpanishIBAN(iban)` | Desglosa entidad/oficina/control/cuenta (o `null`) |

## Por qué existe

Antes de domiciliar un cobro o conciliar un pago necesitas un IBAN válido: un dígito mal escrito devuelve el recibo. Esta librería valida el checksum mod-97 (estándar ISO 13616) y desglosa el IBAN español, sin dependencias.

---

Hecho por [**FacturaHub**](https://facturahub.com?utm_source=npm&utm_medium=referral&utm_campaign=iban-es) — facturación con IA para autónomos en España: concilia tu banco, emite **Verifactu** y factura por WhatsApp. Gratis.

## Ecosistema FacturaHub
- 🌐 [FacturaHub](https://facturahub.com?utm_source=github&utm_medium=referral&utm_campaign=iban-es) — la app (gratis, Verifactu incluido)
- 🔌 [facturahub-api](https://github.com/FacturaHub-com/facturahub-api) — API REST + OpenAPI 3.1
- 🤖 [facturahub-mcp](https://github.com/FacturaHub-com/facturahub-mcp) — servidor MCP (Claude, Cursor, ChatGPT)
- 🧾 [facturahub-verifactu](https://github.com/FacturaHub-com/facturahub-verifactu) — Verifactu por API
- 🧮 Librerías: nif-validator · iva · iban-es · factura-number · verifactu-qr · verifactu-hash · modelo-303
- ⚙️ Automatización: facturahub-n8n · n8n-nodes-facturahub · facturahub-woocommerce · facturahub-shopify

Temas: Verifactu · Facturación electrónica · IVA · Modelo 303 · AEAT · NIF/CIF · Autónomos · MCP · IA · España
